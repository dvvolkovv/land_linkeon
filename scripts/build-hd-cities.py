#!/usr/bin/env python3
"""
Базы городов калькулятора Human Design: src/content/hd/cities.<код>.json —
база на каждый язык сайта (ru, en, es, de, fr, pt, zh).

Источник — GeoNames (CC BY 4.0): cities15000 (города от 15 000 жителей),
alternateNamesV2 (названия на языках сайта), countryInfo и admin1CodesASCII.
Город нужен только ради IANA-пояса — координаты в файл не попадают.

Ещё три входа сборки, только для названий:
- Unihan (Unicode, Unihan.zip → Unihan_Variants.txt, поле kSimplifiedVariant):
  китайские названия GeoNames часто записаны традиционными иероглифами —
  в базе zh они переводятся в упрощённые посимвольно. Результат зависит от
  версии Unihan (скачивается latest), как названия стран — от версии ICU.
- CLDR — названия стран для всех языков, кроме русского, берёт
  scripts/hd-country-names.mjs через Intl.DisplayNames, поэтому нужен node
  в PATH с полным ICU. Названия зависят от версии ICU в этом Node (печатается
  при сборке). Русские названия стран — из GeoNames, как были: русская база
  уже на проде и вычитана.
- scripts/hd-city-overrides.tsv — правки названий по вычитке носителями
  (язык, geonameid, вид, название, почему). Применяются последними, поверх
  GeoNames, CLDR и правил очистки. Правка, чей geonameid не встречается среди
  городов, регионов или стран нужного вида, роняет сборку: после обновления
  дампа устаревшие правки не должны тихо гнить. В zh правка с традиционным
  иероглифом тоже роняет сборку. Строка ru меняет русскую базу, которая уже
  на проде и вычитана, — только намеренно (сейчас одна: ДР Конго).

Все базы собираются за один прогон по одному дампу и с одной сортировкой:
строка N — один и тот же город во всех файлах (по номеру строки их сводит
инструмент Райи в spirits_back). Поэтому пересобирать — только все сразу.

Запускается вручную, на тестовой ноде (alternateNamesV2.zip — около 200 МБ);
сырые дампы — во временном каталоге, в репозиторий не кладутся. Готовые JSON
коммитятся. Только стандартная библиотека Python (и node для стран).

  python3 scripts/build-hd-cities.py --src ~/geonames --out-dir src/content/hd

Unihan.zip ищется в --src (или --unihan). На ноде — в каталог вне клона
(--out-dir /tmp/hd-cities), оттуда scp в воркдерево: новые файлы в клоне
мешают ему переключаться на другой коммит. --review-dir — таблицы для
вычитки: по языку review-<код>.tsv (500 крупнейших городов, их регионы, все
страны рядом с русским названием); не коммитятся.

Формат — интерфейс CityDb в src/lib/cities.ts:
  {"v":1,"zones":[…],"countries":{"RU":"Россия",…},"regions":[…],
   "cities":[[название, латиницей или "", страна, пояс, население в тыс., регион или -1], …]}
Названия стран, регионов и городов — на языке файла; нет названия на языке —
основное название GeoNames. Города — по убыванию населения: так подсказки
сами идут от крупных к мелким.
"""
import argparse
import csv
import gzip
import io
import json
import os
import subprocess
import zipfile

# Новые имена поясов, которых не знают старые браузеры (ICU до 72): берём
# прежнее имя — оно осталось в tzdata ссылкой и работает везде.
ZONE_ALIASES = {'Europe/Kyiv': 'Europe/Kiev'}

# Код сайта → коды языка в alternateNames по убыванию предпочтения.
LANGS = {
    'ru': ['ru'],
    'en': ['en'],
    'es': ['es'],
    'de': ['de'],
    'fr': ['fr'],
    'pt': ['pt-PT', 'pt'],
    'zh': ['zh-CN', 'zh-Hans', 'zh'],
}

# Обратно: код GeoNames → (язык сайта, место в списке предпочтений). Каждый
# код принадлежит ровно одному языку сайта.
GEONAMES_CODE = {g: (site, pos) for site, codes in LANGS.items() for pos, g in enumerate(codes)}
assert len(GEONAMES_CODE) == sum(len(codes) for codes in LANGS.values()), 'код GeoNames у двух языков'

# Код сайта → локаль CLDR для названий стран. Русского нет намеренно.
CLDR_LOCALES = {'en': 'en-GB', 'es': 'es', 'de': 'de', 'fr': 'fr', 'pt': 'pt-PT', 'zh': 'zh-Hans'}

# Иероглифы, которые Unihan упрощает, а в материковом Китае в названиях
# пишут как есть: 阪 → 坂 превращал Осаку (大阪) в 大坂. Найдено вычиткой,
# остальные ~250 замен в базе проверены глазами.
KEEP_AS_IS = {'阪'}

# Правки названий по вычитке — данные, а не код: их проверяют люди.
OVERRIDES_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'hd-city-overrides.tsv')
KINDS = ('city', 'region', 'country')

csv.field_size_limit(10**9)


def tsv(binary):
    return csv.reader(io.TextIOWrapper(binary, encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE)


def load_simplified(path):
    """Таблица для str.translate: традиционный иероглиф → упрощённый (Unihan).

    Несколько упрощённых вариантов — берём первый из основной плоскости
    Юникода; если среди вариантов есть сам иероглиф, он остаётся как есть.
    Варианты за её пределами (расширения B и дальше) не берём: шрифтов с ними
    почти нет, а обиходные упрощённые иероглифы все в основной плоскости —
    иначе «勒克瑙» (Лакхнау) стал бы «勒克» и квадратиком.
    """
    table = {}
    with zipfile.ZipFile(path) as z, z.open('Unihan_Variants.txt') as f:
        for line in io.TextIOWrapper(f, encoding='utf-8'):
            r = line.rstrip('\n').split('\t')
            if len(r) < 3 or r[1] != 'kSimplifiedVariant':
                continue
            char = chr(int(r[0][2:], 16))
            variants = [chr(int(v.split('<')[0][2:], 16)) for v in r[2].split()]
            common = [v for v in variants if ord(v) <= 0xFFFF]
            if common and char not in variants and char not in KEEP_AS_IS:
                table[ord(char)] = common[0]
    return table


def load_overrides(path):
    """{язык: {geonameid: (вид, название)}} из hd-city-overrides.tsv."""
    overrides = {code: {} for code in LANGS}
    with open(path, encoding='utf-8', newline='') as f:
        rows = csv.reader(f, delimiter='\t', quoting=csv.QUOTE_NONE)
        header = next(rows)
        assert header == ['lang', 'geonameid', 'kind', 'name', 'why'], f'{path}: шапка {header}'
        for n, r in enumerate(rows, start=2):
            assert len(r) == 5, f'{path}:{n}: {len(r)} колонок вместо 5'
            lang, gid, kind, name, _why = r
            assert lang in LANGS, f'{path}:{n}: язык {lang}'
            assert kind in KINDS, f'{path}:{n}: вид {kind}'
            assert name and name == name.strip(), f'{path}:{n}: название {name!r}'
            assert int(gid) not in overrides[lang], f'{path}:{n}: {lang} {gid} — второй раз'
            overrides[lang][int(gid)] = (kind, name)
    return overrides


def cldr_country_names(codes):
    """{язык: {код страны: название}} по CLDR — через Node, см. hd-country-names.mjs."""
    script = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'hd-country-names.mjs')
    payload = json.dumps({'locales': CLDR_LOCALES, 'codes': codes})
    done = subprocess.run(['node', script], input=payload, stdout=subprocess.PIPE, text=True, check=True)
    return json.loads(done.stdout)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--src', required=True, help='каталог со скачанными файлами GeoNames')
    parser.add_argument('--out-dir', required=True, help='куда положить cities.<код>.json')
    parser.add_argument('--unihan', help='Unihan.zip (по умолчанию — в --src)')
    parser.add_argument('--review-dir', help='куда положить review-<код>.tsv для вычитки')
    args = parser.parse_args()
    src = args.src

    cities = []
    with zipfile.ZipFile(f'{src}/cities15000.zip') as z, z.open('cities15000.txt') as f:
        for r in tsv(f):
            cities.append({'id': int(r[0]), 'name': r[1], 'ascii': r[2], 'cc': r[8], 'a1': r[10],
                           'pop': int(r[14] or 0), 'tz': ZONE_ALIASES.get(r[17], r[17])})

    countries = {}
    with open(f'{src}/countryInfo.txt', encoding='utf-8') as f:
        for line in f:
            if line.startswith('#'):
                continue
            r = line.rstrip('\n').split('\t')
            if r[16]:
                countries[r[0]] = {'name': r[4], 'id': int(r[16])}

    admin1 = {}
    with open(f'{src}/admin1CodesASCII.txt', encoding='utf-8') as f:
        for line in f:
            r = line.rstrip('\n').split('\t')
            admin1[r[0]] = {'name': r[1], 'ascii': r[2], 'id': int(r[3])}

    # Название на языке: сначала код, стоящий раньше в LANGS, затем
    # предпочтительное, иначе полное, иначе короткое; разговорные и
    # исторические («Питер», «Ленинград») — нет. Один проход по дампу на все языки.
    wanted = {c['id'] for c in cities} | {c['id'] for c in countries.values()} | {a['id'] for a in admin1.values()}
    names = {code: {} for code in LANGS}
    with zipfile.ZipFile(f'{src}/alternateNamesV2.zip') as z, z.open('alternateNamesV2.txt') as f:
        for r in tsv(f):
            hit = GEONAMES_CODE.get(r[2])
            if hit is None or r[6] == '1' or r[7] == '1':
                continue
            gid = int(r[1])
            if gid not in wanted:
                continue
            code, pos = hit
            rank = (pos, 0 if r[4] == '1' else 1, 1 if r[5] == '1' else 0)
            best = names[code]
            if gid not in best or rank < best[gid][0]:
                best[gid] = (rank, r[3])

    simplified = load_simplified(args.unihan or f'{src}/Unihan.zip')
    overrides = load_overrides(OVERRIDES_FILE)

    # Одна сортировка на все языки — на ней держится согласованность баз.
    cities.sort(key=lambda c: (-c['pop'], c['id']))
    zones = sorted({c['tz'] for c in cities})
    zone_index = {z: i for i, z in enumerate(zones)}
    used = sorted({c['cc'] for c in cities})
    cldr = cldr_country_names(used)

    # Правка должна попадать в город, регион или страну своего вида — иначе
    # она устарела (GeoNames сменил запись) или в ней опечатка.
    in_use = {
        'city': {c['id'] for c in cities},
        'region': {a['id'] for c in cities if (a := admin1.get(f"{c['cc']}.{c['a1']}"))},
        'country': {countries[cc]['id'] for cc in used if cc in countries},
    }
    problems = []
    for code, rows in overrides.items():
        for gid, (kind, name) in rows.items():
            if gid not in in_use[kind]:
                problems.append(f'{code} {gid} {kind} «{name}»: такого {kind} в базе нет')
            if code == 'zh' and name.translate(simplified) != name:
                problems.append(f'{code} {gid} {kind} «{name}»: традиционные иероглифы')
    if problems:
        raise SystemExit('hd-city-overrides.tsv:\n  ' + '\n  '.join(problems))
    print(f'{len(cities)} городов, поясов {len(zones)}, стран {len(used)}')

    def clean(code, name):
        """Правила для всех языков, кроме русского (русская база уже вычитана):
        «臺灣省 or 台灣省» — до « or »; мягкий знак в конце транслитерации
        (Kazan’, Tver’) — долой, внутри слова (L’Aquila) — нет; в zh —
        упрощённые иероглифы."""
        if code == 'ru':
            return name
        name = name.split(' or ')[0]
        name = name.rstrip('’ʹ') or name
        if code == 'zh':
            name = name.translate(simplified)
        return name

    def site_name(code, gid, fallback, preset=None):
        if gid in overrides[code]:
            return overrides[code][gid][1]
        if preset is None:
            best = names[code]
            preset = best[gid][1] if gid in best else fallback
        return clean(code, preset)

    def city_name(code, c):
        return site_name(code, c['id'], c['name'])

    def region_name(code, a):
        return site_name(code, a['id'], a['name'])

    def country_name(code, cc):
        country = countries.get(cc)
        preset = cldr.get(code, {}).get(cc)
        if not country:
            return clean(code, preset) if preset else cc
        return site_name(code, country['id'], country['name'], preset)

    for code in LANGS:
        regions, region_index, rows = [], {}, []
        for c in cities:
            name = city_name(code, c)
            latin = c['ascii'] if c['ascii'] and c['ascii'].lower() != name.lower() else ''
            ri = -1
            a = admin1.get(f"{c['cc']}.{c['a1']}")
            if a:
                region = region_name(code, a)
                if region not in region_index:
                    region_index[region] = len(regions)
                    regions.append(region)
                ri = region_index[region]
            rows.append([name, latin, c['cc'], zone_index[c['tz']], round(c['pop'] / 1000), ri])

        data = {
            'v': 1,
            'zones': zones,
            'countries': {cc: country_name(code, cc) for cc in used},
            'regions': regions,
            'cities': rows,
        }
        raw = json.dumps(data, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
        with open(f'{args.out_dir}/cities.{code}.json', 'wb') as f:
            f.write(raw)
        with_name = sum(1 for c in cities if c['id'] in names[code])
        with_cldr = sum(1 for cc in used if cc in cldr.get(code, {}))
        applied = len(overrides[code])
        print(f'{code}: {len(rows)} городов, с названием на языке {with_name}, регионов {len(regions)}, '
              f'стран по CLDR {with_cldr}, правок вычитки {applied}, размер {len(raw)} байт, gzip -9 {len(gzip.compress(raw, 9))} байт')

    if args.review_dir:
        os.makedirs(args.review_dir, exist_ok=True)
        top = cities[:500]
        top_regions = {}
        for c in top:
            a = admin1.get(f"{c['cc']}.{c['a1']}")
            if a:
                top_regions.setdefault(a['id'], (a, c['cc']))
        for code in LANGS:
            if code == 'ru':
                continue
            with open(f'{args.review_dir}/review-{code}.tsv', 'w', encoding='utf-8', newline='') as f:
                w = csv.writer(f, delimiter='\t', lineterminator='\n')
                w.writerow(['geonameid', 'kind', 'ru', code, 'latin', 'cc'])
                for c in top:
                    w.writerow([c['id'], 'city', city_name('ru', c), city_name(code, c), c['ascii'], c['cc']])
                for a, cc in top_regions.values():
                    w.writerow([a['id'], 'region', region_name('ru', a), region_name(code, a), a['ascii'], cc])
                for cc in used:
                    country = countries.get(cc)
                    w.writerow([country['id'] if country else '', 'country', country_name('ru', cc),
                                country_name(code, cc), country['name'] if country else cc, cc])
        print(f'таблицы для вычитки — {args.review_dir}')


if __name__ == '__main__':
    main()
