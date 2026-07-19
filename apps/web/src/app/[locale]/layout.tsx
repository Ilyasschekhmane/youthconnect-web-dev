import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
const supportedLocales = ['en', 'fr', 'ar'] as const;

type Locale = (typeof supportedLocales)[number];

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export const metadata: Metadata = {
  title: 'YouthConnect',
  description: 'GovTech SaaS platform for youth entrepreneurship centers, applications, and operations.',
};

function getDirection(locale: string) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Dynamically load the locale messages from src/i18n/{locale}.json
  let messages;
  try {
  // path relative to this file: ../../i18n/{locale}.json
  messages = (await import(`../../i18n/${locale}.json`)).default;
  } catch (e) {
    messages = {};
  }

  return (
    <html lang={locale} dir={getDirection(locale)}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
