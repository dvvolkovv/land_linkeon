#!/usr/bin/env python3
"""
Базы городов калькулятора Human Design: src/content/hd/cities.<код>.json —
база на каждый язык сайта (ru, en, es, de, fr, pt, zh).

Источник — GeoNames (CC BY 4.0): cities15000 (города от 15 000 жителей),
alternateNamesV2 (названия на языках сайта), countryInfo и admin1CodesASCII.
Город нужен только ради IANA-пояса — координаты в файл не попадают.

Все базы собираются за один прогон по одному дампу и с одной сортировкой:
строка N — один и тот же город во всех файлах (по номеру строки их сводит
инструмент Райи в spirits_back). Поэтому пересобирать — только все сразу.

Запускается вручную, на тестовой ноде (alternateNamesV2.zip — около 200 МБ);
сырые дампы — во временном каталоге, в репозиторий не кладутся. Готовые JSON
коммитятся. Только стандартная библиотека Python.

  python3 scripts/build-hd-cities.py --src ~/geonames --out-dir src/content/hd

На ноде — в каталог вне клона (--out-dir /tmp/hd-cities), оттуда scp в
воркдерево: новые файлы в клоне мешают ему переключаться на другой коммит.

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

csv.field_size_limit(10**9)


def tsv(binary):
    return csv.reader(io.TextIOWrapper(binary, encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--src', required=True, help='каталог со скачанными файлами GeoNames')
    parser.add_argument('--out-dir', required=True, help='куда положить cities.<код>.json')
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
            admin1[r[0]] = {'name': r[1], 'id': int(r[3])}

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

    def local_name(code, gid, fallback):
        best = names[code]
        return best[gid][1] if gid in best else fallback

    # Одна сортировка на все языки — на ней держится согласованность баз.
    cities.sort(key=lambda c: (-c['pop'], c['id']))
    zones = sorted({c['tz'] for c in cities})
    zone_index = {z: i for i, z in enumerate(zones)}
    used = sorted({c['cc'] for c in cities})
    print(f'{len(cities)} городов, поясов {len(zones)}, стран {len(used)}')

    for code in LANGS:
        regions, region_index, rows = [], {}, []
        for c in cities:
            name = local_name(code, c['id'], c['name'])
            latin = c['ascii'] if c['ascii'] and c['ascii'].lower() != name.lower() else ''
            ri = -1
            a = admin1.get(f"{c['cc']}.{c['a1']}")
            if a:
                region = local_name(code, a['id'], a['name'])
                if region not in region_index:
                    region_index[region] = len(regions)
                    regions.append(region)
                ri = region_index[region]
            rows.append([name, latin, c['cc'], zone_index[c['tz']], round(c['pop'] / 1000), ri])

        data = {
            'v': 1,
            'zones': zones,
            'countries': {cc: local_name(code, countries[cc]['id'], countries[cc]['name']) if cc in countries else cc
                          for cc in used},
            'regions': regions,
            'cities': rows,
        }
        raw = json.dumps(data, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
        with open(f'{args.out_dir}/cities.{code}.json', 'wb') as f:
            f.write(raw)
        with_name = sum(1 for c in cities if c['id'] in names[code])
        print(f'{code}: {len(rows)} городов, с названием на языке {with_name}, регионов {len(regions)}, '
              f'размер {len(raw)} байт, gzip -9 {len(gzip.compress(raw, 9))} байт')


if __name__ == '__main__':
    main()
