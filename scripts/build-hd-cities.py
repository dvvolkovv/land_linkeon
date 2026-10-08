#!/usr/bin/env python3
"""
База городов калькулятора Human Design: src/content/hd/cities.ru.json.

Источник — GeoNames (CC BY 4.0): cities15000 (города от 15 000 жителей),
alternateNamesV2 (русские названия), countryInfo и admin1CodesASCII. Город
нужен только ради IANA-пояса — координаты в файл не попадают.

Запускается вручную, на тестовой ноде (alternateNamesV2.zip — около 200 МБ);
сырые дампы — во временном каталоге, в репозиторий не кладутся. Готовый JSON
коммитится. Только стандартная библиотека Python.

  python3 scripts/build-hd-cities.py --src /tmp/geonames --out src/content/hd/cities.ru.json

Формат — интерфейс CityDb в src/lib/cities.ts:
  {"v":1,"zones":[…],"countries":{"RU":"Россия",…},"regions":[…],
   "cities":[[название, латиницей или "", страна, пояс, население в тыс., регион или -1], …]}
Города — по убыванию населения: так подсказки сами идут от крупных к мелким.
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

csv.field_size_limit(10**9)


def tsv(binary):
    return csv.reader(io.TextIOWrapper(binary, encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--src', required=True, help='каталог со скачанными файлами GeoNames')
    parser.add_argument('--out', required=True)
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

    # Русское название: предпочтительное, иначе полное, иначе короткое;
    # разговорные и исторические («Питер», «Ленинград») — нет.
    wanted = {c['id'] for c in cities} | {c['id'] for c in countries.values()} | {a['id'] for a in admin1.values()}
    ru = {}
    with zipfile.ZipFile(f'{src}/alternateNamesV2.zip') as z, z.open('alternateNamesV2.txt') as f:
        for r in tsv(f):
            if r[2] != 'ru' or int(r[1]) not in wanted or r[6] == '1' or r[7] == '1':
                continue
            rank = (0 if r[4] == '1' else 1, 1 if r[5] == '1' else 0)
            gid = int(r[1])
            if gid not in ru or rank < ru[gid][0]:
                ru[gid] = (rank, r[3])

    def ru_name(gid, fallback):
        return ru[gid][1] if gid in ru else fallback

    cities.sort(key=lambda c: (-c['pop'], c['id']))
    zones = sorted({c['tz'] for c in cities})
    zone_index = {z: i for i, z in enumerate(zones)}
    regions, region_index, rows = [], {}, []
    for c in cities:
        name = ru_name(c['id'], c['name'])
        latin = c['ascii'] if c['ascii'] and c['ascii'].lower() != name.lower() else ''
        ri = -1
        a = admin1.get(f"{c['cc']}.{c['a1']}")
        if a:
            region = ru_name(a['id'], a['name'])
            if region not in region_index:
                region_index[region] = len(regions)
                regions.append(region)
            ri = region_index[region]
        rows.append([name, latin, c['cc'], zone_index[c['tz']], round(c['pop'] / 1000), ri])

    used = sorted({c['cc'] for c in cities})
    data = {
        'v': 1,
        'zones': zones,
        'countries': {cc: ru_name(countries[cc]['id'], countries[cc]['name']) if cc in countries else cc for cc in used},
        'regions': regions,
        'cities': rows,
    }
    raw = json.dumps(data, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
    with open(args.out, 'wb') as f:
        f.write(raw)
    with_ru = sum(1 for c in cities if c['id'] in ru)
    print(f'{len(rows)} городов, с русским названием {with_ru}, поясов {len(zones)}, регионов {len(regions)}')
    print(f'размер {len(raw)} байт, gzip -9 {len(gzip.compress(raw, 9))} байт')


if __name__ == '__main__':
    main()
