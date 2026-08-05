export interface LanguageDef {
  /** Корень BCP-47: ru, en, es, de, fr, zh */
  code: string;
  /** Название языка на нём самом — так его ищут в списке */
  nativeName: string;
  flag: string;
  /** Значение для og:locale / og:locale:alternate */
  ogLocale: string;
}

export declare const SUPPORTED_LANGUAGES: LanguageDef[];
export declare const DEFAULT_LANGUAGE: string;
export declare const SUPPORTED_CODES: string[];
