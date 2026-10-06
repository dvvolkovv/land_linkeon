export interface Pkg {
  id: 'starter' | 'extended' | 'professional' | 'business' | 'maximum';
  tokens: number;
  price: number;
  savings?: string;
  popular?: boolean;
}

/**
 * Рублёвый прайс. Продублирован из приложения (spirits_front,
 * src/config/tokenPackages.ts): лендинг — отдельный репозиторий, общего
 * модуля у них нет. При изменении цен править оба места, иначе витрина
 * обещает не то, что покажет касса.
 *
 * Отдельным модулем, а не внутри Pricing.tsx: отсюда же секция «Сайты и
 * боты» считает рубли месячной аренды (src/content/products.ts).
 *
 * Проценты экономии — ярлыки, округлённые вниз до пятёрки, как и в приложении.
 */
export const PACKAGES: Pkg[] = [
  { id: 'starter', tokens: 50000, price: 149 },
  { id: 'extended', tokens: 200000, price: 499, savings: '15%' },
  { id: 'professional', tokens: 1000000, price: 1990, savings: '30%', popular: true },
  { id: 'business', tokens: 3000000, price: 4990, savings: '40%' },
  { id: 'maximum', tokens: 7000000, price: 9990, savings: '50%' },
];
