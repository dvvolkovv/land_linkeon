export declare const SITE: string;
export declare const LEGAL_SLUGS: string[];
export declare function urlFor(code: string, defaultLanguage: string): string;
export declare function legalUrlFor(code: string, slug: string, defaultLanguage: string): string;
export declare function deleteUrlFor(code: string, defaultLanguage: string): string;
export declare function sitemapUrls(publishedCodes: string[], defaultLanguage: string): string[];
