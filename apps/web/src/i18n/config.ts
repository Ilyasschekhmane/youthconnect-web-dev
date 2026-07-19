export type Locale = 'en' | 'fr' | 'ar';

export const locales = ['ar', 'fr', 'en'] as const;
export const defaultLocale: Locale = 'ar';
