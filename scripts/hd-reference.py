#!/usr/bin/env python3
"""
Эталон для проверки расчёта Human Design: случайные рождения 1920–2025 в
разных часовых поясах, посчитанные Swiss Ephemeris по правилам Райи —
истинный узел (SE_TRUE_NODE), дизайн по 88° солнечной дуги, тропический
зодиак, видимые геоцентрические долготы.

Swiss Ephemeris только здесь — в продукт и в репозиторий не попадает ни
библиотека, ни файлы эфемерид. Запуск вручную, на тестовой ноде; как
поставить pyswisseph и где взять файлы — план
docs/superpowers/plans/2026-10-08-human-design-calculator.md, задача
«Эталон Swiss Ephemeris».

  python hd-reference.py --ephe /путь/к/ephe --count 300 --seed 20261008 \
      --out src/lib/human-design/__fixtures__/reference.json

Местное время берётся случайным (целые минуты), UTC — через zoneinfo с
tzdata из PyPI (PYTHONTZPATH="" — системная база не участвует). Время, которое
при переводе стрелок пропущено или повторено, пропускается: эталон проверяет
позиции, а вопрос «до или после» — тесты time.test.ts.
"""
import argparse
import json
import random
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

import swisseph as swe
import tzdata

# Пояса без перемен в tzdata за последние годы — чтобы эталон не зависел от
# свежести базы поясов у того, кто запускает тест.
ZONES = [
    'Europe/Moscow', 'Europe/Kaliningrad', 'Europe/Samara', 'Europe/Volgograd', 'Asia/Yekaterinburg',
    'Asia/Omsk', 'Asia/Novosibirsk', 'Asia/Krasnoyarsk', 'Asia/Irkutsk', 'Asia/Yakutsk',
    'Asia/Vladivostok', 'Asia/Magadan', 'Asia/Kamchatka', 'Europe/Minsk', 'Asia/Tbilisi',
    'Asia/Yerevan', 'Asia/Tashkent', 'Europe/Berlin', 'Europe/London', 'Europe/Paris',
    'Europe/Istanbul', 'America/New_York', 'America/Los_Angeles', 'America/Sao_Paulo',
    'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Asia/Dubai', 'Australia/Sydney', 'Asia/Jerusalem',
]

# Та же таблица, что в src/lib/human-design/wheel.ts, набранная заново: расхождение
# двух копий эталон поймает.
GATE_ORDER = [
    41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
    27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
    31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50,
    28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
]

# Порядок — как BODIES в src/lib/human-design/ephemeris.ts. None — точка напротив
# предыдущего тела (Земля напротив Солнца, южный узел напротив северного).
BODIES = [
    ('sun', swe.SUN), ('earth', None), ('northNode', swe.TRUE_NODE), ('southNode', None),
    ('moon', swe.MOON), ('mercury', swe.MERCURY), ('venus', swe.VENUS), ('mars', swe.MARS),
    ('jupiter', swe.JUPITER), ('saturn', swe.SATURN), ('uranus', swe.URANUS),
    ('neptune', swe.NEPTUNE), ('pluto', swe.PLUTO),
]
FLAGS = swe.FLG_SWIEPH


def gate_line(lon):
    offset = (lon - 302.0) % 360.0
    index = min(int(offset // 0.9375), 383)
    return f'{GATE_ORDER[index // 6]}.{index % 6 + 1}'


def longitudes(jd_ut):
    out = []
    for name, body in BODIES:
        if body is None:
            out.append((out[-1] + 180.0) % 360.0)
            continue
        xx, ret = swe.calc_ut(jd_ut, body, FLAGS)
        # Без файлов эфемерид Swiss Ephemeris молча берёт Moshier — эталон
        # другого качества. Узел считается из Луны, флаг у него свой.
        if body != swe.TRUE_NODE and not ret & swe.FLG_SWIEPH:
            raise SystemExit(f'{name}: нет файлов эфемерид (флаг {ret}) — проверьте --ephe')
        out.append(xx[0])
    return out


def jd_of(moment):
    hours = moment.hour + moment.minute / 60 + moment.second / 3600 + moment.microsecond / 3.6e9
    return swe.julday(moment.year, moment.month, moment.day, hours)


def utc_of(jd_ut):
    return datetime(1970, 1, 1, tzinfo=timezone.utc) + timedelta(days=jd_ut - 2440587.5)


def unique_utc(local, zone):
    """UTC для местного времени или None, если его не было или было дважды."""
    tz = ZoneInfo(zone)
    a = local.replace(tzinfo=tz, fold=0).astimezone(timezone.utc)
    b = local.replace(tzinfo=tz, fold=1).astimezone(timezone.utc)
    if a != b or a.astimezone(tz).replace(tzinfo=None) != local:
        return None
    return a


def iso(moment):
    return moment.strftime('%Y-%m-%dT%H:%M:%S.') + f'{moment.microsecond // 1000:03d}Z'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ephe', required=True)
    parser.add_argument('--count', type=int, default=300)
    parser.add_argument('--seed', type=int, default=20261008)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()

    swe.set_ephe_path(args.ephe)
    rng = random.Random(args.seed)
    first = datetime(1920, 1, 1)
    minutes = int((datetime(2026, 1, 1) - first).total_seconds() // 60)

    charts = []
    while len(charts) < args.count:
        zone = ZONES[len(charts) % len(ZONES)]
        local = first + timedelta(minutes=rng.randrange(minutes))
        utc = unique_utc(local, zone)
        if utc is None:
            continue
        jd = jd_of(utc)
        p = longitudes(jd)
        jd_design = swe.solcross_ut((p[0] - 88.0) % 360.0, jd - 100.0, FLAGS)
        d = longitudes(jd_design)
        charts.append({
            'zone': zone,
            'local': local.strftime('%Y-%m-%dT%H:%M'),
            'utc': iso(utc),
            'designUtc': iso(utc_of(jd_design)),
            'p': [round(x, 6) for x in p],
            'd': [round(x, 6) for x in d],
            'pg': [gate_line(x) for x in p],
            'dg': [gate_line(x) for x in d],
        })

    meta = {
        'generator': 'scripts/hd-reference.py',
        'swisseph': swe.version,
        'ephemeris': 'sepl_18.se1, semo_18.se1',
        'tzdata': tzdata.IANA_VERSION,
        'seed': args.seed,
        'count': args.count,
        'rules': 'SE_TRUE_NODE, design = Sun - 88°, tropical, apparent geocentric',
        'bodies': [name for name, _ in BODIES],
    }
    with open(args.out, 'w', encoding='utf-8') as f:
        json.dump({'meta': meta, 'charts': charts}, f, ensure_ascii=False, separators=(',', ':'))
        f.write('\n')
    print(f'{len(charts)} карт → {args.out}')


if __name__ == '__main__':
    main()
