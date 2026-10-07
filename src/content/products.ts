import { PACKAGES } from './tokenPackages';
import { formattingLocale } from '../i18n/languages';

/**
 * Месячная аренда продукта Linkeon (сайта или телеграм-бота) в токенах.
 *
 * Зеркало RENT_TOKENS из spirits_back/src/products/rent.service.ts; второе
 * зеркало — spirits_front/src/components/products/rent.ts. Бэкенд это число
 * наружу не отдаёт, поэтому копии. Ссылки между ними не во все стороны —
 * бэкенд о копиях не знает: поменяли аренду, ищите RENT_TOKENS во всех
 * трёх репозиториях.
 *
 * Потолок «до двух продуктов на аккаунт» (DEFAULT_MAX_PRODUCTS в
 * spirits_back/src/products/limits.service.ts) числом не подставляется: он
 * написан словом в ответе FAQ о цене на семи языках. Поменяли потолок —
 * правьте эти семь строк.
 */
export const RENT_TOKENS = 50_000;

/**
 * Аренда в рублях по цене стартового пакета. Формула, а не число в тексте:
 * фраза «это N ₽ по стартовому пакету» остаётся верной при любой аренде и
 * любом прайсе.
 */
export function rentRubles(): number {
  const starter = PACKAGES.find((p) => p.id === 'starter');
  if (!starter) throw new Error('В прайсе нет стартового пакета — нечем считать аренду в рублях');
  return Math.round((RENT_TOKENS * starter.price) / starter.tokens);
}

/**
 * Переменные для текстов об аренде ({{tokens}}, {{price}}) — в формате
 * языка страницы. price — рубли: подставлять только в русский текст, на
 * других языках витрина валютная.
 */
export function rentInterpolation(language: string): { tokens: string; price: string } {
  const locale = formattingLocale(language);
  return {
    tokens: RENT_TOKENS.toLocaleString(locale),
    price: rentRubles().toLocaleString(locale),
  };
}
