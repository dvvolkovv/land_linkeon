import type { LegalType } from '../../components/layout/LegalModal';

import * as ru from './ru';
import * as en from './en';
import * as de from './de';
import * as es from './es';
import * as fr from './fr';
import * as zh from './zh';

/**
 * Юридические документы по языкам.
 *
 * Раньше выбор был двоичным — `lng === 'ru' ? ru : en`, — и немец, испанец,
 * француз и китаец получали английский текст под своим `<html lang>`. Для
 * App Store это отдельная претензия: там ссылка на политику указывается
 * на КАЖДУЮ локаль витрины, и вести все четыре на английский документ
 * значит не выполнить требование, а сымитировать его.
 *
 * Юридическую силу имеет русская редакция — это сказано в самих документах.
 * Остальные языки переведены с неё и служат для понимания.
 */
export interface LegalPack {
  titles: Record<LegalType, string>;
  renderLegal: (type: LegalType) => React.ReactNode;
}

const PACKS: Record<string, LegalPack> = { ru, en, de, es, fr, zh };

/**
 * Пакет для языка. Незнакомый язык уводится в английский, а не в русский:
 * английский поймёт больше людей.
 */
export function legalFor(language: string): LegalPack {
  const base = (language || '').split('-')[0].toLowerCase();
  return PACKS[base] ?? PACKS.en;
}
