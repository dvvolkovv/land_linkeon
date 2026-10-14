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
  версии Unicode, поэтому берётся закреплённая:
  https://www.unicode.org/Public/<версия>/ucd/Unihan.zip (сейчас 18.0.0).
- CLDR — названия стран для всех языков, кроме русского, берёт
  scripts/hd-country-names.mjs через Intl.DisplayNames, поэтому нужен node
  в PATH с полным ICU. Названия зависят от версии ICU в этом Node. Русские
  названия стран — из GeoNames, как были: русская база уже на проде и вычитана.
- scripts/hd-city-overrides.tsv — правки названий по вычитке носителями
  (язык, geonameid, вид, название, почему). Применяются последними, поверх
  GeoNames, CLDR и правил очистки. Правка, чей geonameid не встречается среди
  городов, регионов или стран нужного вида, роняет сборку: после обновления
  дампа устаревшие правки не должны тихо гнить. В zh правка с традиционным
  иероглифом тоже роняет сборку. Строка ru меняет русскую базу, которая уже
  на проде и вычитана, — только намеренно (сейчас одна: ДР Конго).

Версии всех входов сборка печатает первым делом — их пишут в сообщение
коммита с данными. GeoNames выкладывает только свежий дамп (обновляется
каждый день, архива нет), так что дата дампа — из печати сборки.

Правила очистки названий — для всех языков, кроме русского (он вычитан):
«臺灣省 or 台灣省» — до « or »; апостроф-мягкий знак в конце транслитерации
(Kazan’, Tver', Kamenʹ) — долой, внутри слова (L’Aquila) — нет, узбекское ‘
(Poytug‘) — не трогаем. В zh у городов и регионов ещё: хвост «，страна»,
«（штат）» в конце, «_» в конце и «X/X» → «X»; у стран скобки — часть названия
CLDR (刚果（金）/ 刚果（布）), их не трогаем.

Все базы собираются за один прогон по одному дампу и с одной сортировкой:
строка N — один и тот же город во всех файлах (по номеру строки их сводит
инструмент Райи в spirits_back). Поэтому пересобирать — только все сразу.

Запускается вручную, на тестовой ноде (alternateNamesV2.zip — около 200 МБ);
сырые дампы — во временном каталоге, в репозиторий не кладутся. Готовые JSON
коммитятся. Только стандартная библиотека Python (и node для стран).

  mkdir -p ~/geonames && cd ~/geonames
  for f in cities15000.zip alternateNamesV2.zip countryInfo.txt admin1CodesASCII.txt; do
    curl -fsSRO https://download.geonames.org/export/dump/$f
  done
  curl -fsSRO https://www.unicode.org/Public/18.0.0/ucd/Unihan.zip

  python3 scripts/build-hd-cities.py --src ~/geonames --out-dir /tmp/hd-cities

--out-dir создаётся, если его нет; все семь файлов пишутся в конце, когда
собраны. На ноде он — вне клона (новые файлы в клоне мешают ему переключаться
на другой коммит), оттуда файлы scp в src/content/hd/ воркдерева. Unihan.zip
ищется в --src (или --unihan). --review-dir — таблицы для вычитки: по языку
review-<код>.tsv (500 крупнейших городов, их регионы, все страны рядом с
русским названием); не коммитятся.

Формат — интерфейс CityDb в src/lib/cities.ts:
  {"v":1,"zones":[…],"countries":{"RU":"Россия",…},"regions":[…],
   "cities":[[название, латиницей или "", страна, пояс, население в тыс., регион или -1], …]}
Названия стран, регионов и городов — на языке файла; нет названия на языке —
основное название GeoNames. Города — по убыванию населения: так подсказки
сами идут от крупных к мелким.
"""
import argparse
import csv
import datetime
import gzip
import io
import json
import os
import re
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
HERE = os.path.dirname(os.path.abspath(__file__))
OVERRIDES_FILE = os.path.join(HERE, 'hd-city-overrides.tsv')
KINDS = ('city', 'region', 'country')

GEONAMES_FILES = ('cities15000.zip', 'alternateNamesV2.zip', 'countryInfo.txt', 'admin1CodesASCII.txt')

csv.field_size_limit(10**9)


def tsv(binary):
    return csv.reader(io.TextIOWrapper(binary, encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE)


def geonames_versions(src):
    """Строки «файл — размер, дата» для печати: у zip — дата файла внутри
    архива (её ставит GeoNames при выгрузке), у txt — дата файла на диске
    (curl -R сохраняет дату сервера)."""
    lines = []
    for name in GEONAMES_FILES:
        path = f'{src}/{name}'
        size = os.path.getsize(path)
        if name.endswith('.zip'):
            inner = name[:-4] + '.txt'
            with zipfile.ZipFile(path) as z:
                stamp = datetime.datetime(*z.getinfo(inner).date_time).strftime('%Y-%m-%d %H:%M')
            lines.append(f'GeoNames {name} — {size} байт, {inner} от {stamp}')
        else:
            stamp = datetime.datetime.fromtimestamp(os.path.getmtime(path), datetime.timezone.utc)
            lines.append(f'GeoNames {name} — {size} байт, от {stamp:%Y-%m-%d %H:%M} UTC')
    return lines


def load_simplified(path):
    """Таблица для str.translate: традиционный иероглиф → упрощённый (Unihan),
    и строка версии из шапки Unihan_Variants.txt.

    Несколько упрощённых вариантов — берём первый из основной плоскости
    Юникода; если среди вариантов есть сам иероглиф, он остаётся как есть.
    Варианты за её пределами (расширения B и дальше) не берём: шрифтов с ними
    почти нет, а обиходные упрощённые иероглифы все в основной плоскости —
    иначе «勒克瑙» (Лакхнау) стал бы «勒克» и квадратиком.
    """
    table, header = {}, {}
    with zipfile.ZipFile(path) as z, z.open('Unihan_Variants.txt') as f:
        for line in io.TextIOWrapper(f, encoding='utf-8'):
            if line.startswith('# Unicode Version') or line.startswith('# Date:'):
                key = 'version' if 'Version' in line else 'date'
                header.setdefault(key, line[2:].strip())
            r = line.rstrip('\n').split('\t')
            if len(r) < 3 or r[1] != 'kSimplifiedVariant':
                continue
            char = chr(int(r[0][2:], 16))
            variants = [chr(int(v.split('<')[0][2:], 16)) for v in r[2].split()]
            common = [v for v in variants if ord(v) <= 0xFFFF]
            if common and char not in variants and char not in KEEP_AS_IS:
                table[ord(char)] = common[0]
    version = f"Unihan {os.path.basename(path)} — {header.get('version', 'версия неизвестна')}, {header.get('date', 'дата неизвестна')}"
    return table, version


def load_overrides(path):
    """{язык: {(вид, geonameid): название}} из hd-city-overrides.tsv."""
    overrides = {code: {} for code in LANGS}
    with open(path, encoding='utf-8', newline='') as f:
        rows = csv.reader(f, delimiter='\t', quoting=csv.QUOTE_NONE)
        header = next(rows, None)
        if header != ['lang', 'geonameid', 'kind', 'name', 'why']:
            raise SystemExit(f'{path}:1: шапка {header}, нужна lang, geonameid, kind, name, why')
        for n, r in enumerate(rows, start=2):
            if len(r) != 5:
                raise SystemExit(f'{path}:{n}: {len(r)} колонок вместо 5')
            lang, gid, kind, name, _why = r
            if lang not in LANGS:
                raise SystemExit(f'{path}:{n}: язык {lang!r} — не из {", ".join(LANGS)}')
            if kind not in KINDS:
                raise SystemExit(f'{path}:{n}: вид {kind!r} — не из {", ".join(KINDS)}')
            if not gid.isdigit():
                raise SystemExit(f'{path}:{n}: geonameid {gid!r} — не число')
            if not name or name != name.strip():
                raise SystemExit(f'{path}:{n}: название {name!r} — пустое или с пробелами по краям')
            key = (kind, int(gid))
            if key in overrides[lang]:
                raise SystemExit(f'{path}:{n}: {lang} {kind} {gid} — второй раз')
            overrides[lang][key] = name
    return overrides


def cldr_country_names(codes):
    """({язык: {код страны: название}}, строка версий) по CLDR — через Node,
    см. hd-country-names.mjs."""
    script = os.path.join(HERE, 'hd-country-names.mjs')
    payload = json.dumps({'locales': CLDR_LOCALES, 'codes': codes})
    try:
        done = subprocess.run(['node', script], input=payload, stdout=subprocess.PIPE,
                              encoding='utf-8', check=True)
    except FileNotFoundError:
        raise SystemExit('нужен node в PATH (на ноде — source ~/.nvm/nvm.sh)')
    out = json.loads(done.stdout)
    v = out['versions']
    return out['names'], f"CLDR {v['cldr']}, ICU {v['icu']}, Node {v['node']}"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--src', required=True, help='каталог со скачанными файлами GeoNames')
    parser.add_argument('--out-dir', required=True, help='куда положить cities.<код>.json (создаётся)')
    parser.add_argument('--unihan', help='Unihan.zip (по умолчанию — в --src)')
    parser.add_argument('--review-dir', help='куда положить review-<код>.tsv для вычитки')
    args = parser.parse_args()
    src = args.src

    # Сначала всё быстрое, что может упасть (файлы, node, правки), — и только
    # потом долгий проход по alternateNamesV2.
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

    simplified, unihan_version = load_simplified(args.unihan or f'{src}/Unihan.zip')
    overrides = load_overrides(OVERRIDES_FILE)

    # Одна сортировка на все языки — на ней держится согласованность баз.
    cities.sort(key=lambda c: (-c['pop'], c['id']))
    zones = sorted({c['tz'] for c in cities})
    zone_index = {z: i for i, z in enumerate(zones)}
    used = sorted({c['cc'] for c in cities})
    cldr, cldr_version = cldr_country_names(used)

    def region_of(c):
        return admin1.get(f"{c['cc']}.{c['a1']}")

    # Правка должна попадать в город, регион или страну своего вида — иначе
    # она устарела (GeoNames сменил запись) или в ней опечатка.
    in_use = {
        'city': {c['id'] for c in cities},
        'region': {a['id'] for c in cities if (a := region_of(c))},
        'country': {countries[cc]['id'] for cc in used if cc in countries},
    }
    problems = []
    for code, rows in overrides.items():
        for (kind, gid), name in rows.items():
            if gid not in in_use[kind]:
                problems.append(f'{code} {kind} {gid} «{name}»: такого {kind} в базе нет')
            if code == 'zh' and name.translate(simplified) != name:
                problems.append(f'{code} {kind} {gid} «{name}»: традиционные иероглифы')
    if problems:
        raise SystemExit('hd-city-overrides.tsv:\n  ' + '\n  '.join(problems))

    print('входы сборки:')
    for line in [*geonames_versions(src), unihan_version, cldr_version]:
        print(f'  {line}')
    print(f'{len(cities)} городов, поясов {len(zones)}, стран {len(used)}')

    # Название на языке: сначала код, стоящий раньше в LANGS, затем
    # предпочтительное, иначе полное, иначе короткое; разговорные и
    # исторические («Питер», «Ленинград») — нет. Один проход по дампу на все языки.
    wanted = in_use['city'] | {c['id'] for c in countries.values()} | {a['id'] for a in admin1.values()}
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

    def clean(code, kind, name):
        """Правила очистки (см. шапку); русские названия — как есть."""
        if code == 'ru':
            return name
        name = name.split(' or ')[0]
        name = name.rstrip("'’ʹ") or name
        if code == 'zh':
            name = name.translate(simplified)
            if kind != 'country':
                name = name.split('，')[0].strip() or name
                name = re.sub(r'（[^（）]*）$', '', name).strip() or name
                name = name.rstrip('_') or name
                halves = {half.strip() for half in name.split('/')}
                if '/' in name and len(halves) == 1:
                    name = halves.pop()
        return name

    def site_name(code, kind, gid, fallback, cldr_name=None):
        if (kind, gid) in overrides[code]:
            return overrides[code][(kind, gid)]
        if cldr_name is None:
            best = names[code]
            cldr_name = best[gid][1] if gid in best else fallback
        return clean(code, kind, cldr_name)

    def city_name(code, c):
        return site_name(code, 'city', c['id'], c['name'])

    def region_name(code, a):
        return site_name(code, 'region', a['id'], a['name'])

    def country_name(code, cc):
        country = countries.get(cc)
        cldr_name = cldr.get(code, {}).get(cc)
        if not country:
            return clean(code, 'country', cldr_name) if cldr_name else cc
        return site_name(code, 'country', country['id'], country['name'], cldr_name)

    built = {}
    for code in LANGS:
        regions, region_index, rows = [], {}, []
        for c in cities:
            name = city_name(code, c)
            latin = c['ascii'] if c['ascii'] and c['ascii'].lower() != name.lower() else ''
            ri = -1
            a = region_of(c)
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
        with_name = sum(1 for c in cities if c['id'] in names[code])
        with_cldr = sum(1 for cc in used if cc in cldr.get(code, {}))
        built[code] = raw
        print(f'{code}: {len(rows)} городов, с названием на языке {with_name}, регионов {len(regions)}, '
              f'стран по CLDR {with_cldr}, правок вычитки {len(overrides[code])}, '
              f'размер {len(raw)} байт, gzip -9 {len(gzip.compress(raw, 9))} байт')

    # Пишем, только когда собраны все семь: полузаписанный набор баз
    # рассогласован по определению.
    os.makedirs(args.out_dir, exist_ok=True)
    for code, raw in built.items():
        with open(f'{args.out_dir}/cities.{code}.json', 'wb') as f:
            f.write(raw)
    print(f'базы — {args.out_dir}')

    if args.review_dir:
        os.makedirs(args.review_dir, exist_ok=True)
        top = cities[:500]
        top_regions = {}
        for c in top:
            a = region_of(c)
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
