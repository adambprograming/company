// Fonts
import { Inter, Work_Sans } from "next/font/google";
// Styles
import "./globals.scss";
// Public & Assets

// React/Next Functions
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
// Context

// Components
import Header from "@/containers/header/header.container.jsx";
import Footer from "@/containers/footer/footer.container.jsx";

const fontPrimary = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-1",
});
const fontSecondary = Work_Sans({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-2",
});

export async function generateMetadata({ params }) {
  // Fetch locale from URL params (e.g., en, cs)
  const { locale } = params;

  // Ensure locale is valid, otherwise fallback to default
  const currentLocale = routing.locales.includes(locale) ? locale : routing.defaultLocale;

  // Metadata for different languages
  const metadata = {
    cs: {
      title: "Adam Bartůšek - webový vývojář",
      description: "Profesionální webový vývojář specializující se na tvorbu webových stránek a aplikací.",
      keywords: "webové stránky, e-shop, web, tvorba webu, aplikace, tvorba e-shopu, vývoj webových aplikací",
      openGraph: {
        title: "Adam Bartůšek - webový vývojář",
        description: "Webový vývojář s odborností v Next.js, SEO, a responzivním designu.",
        url: "https://www.adam-bartusek.cz",
        siteName: "Adam Bartůšek",
        images: [
          {
            url: "https://www.adam-bartusek.cz/hero.png",
            width: 1200,
            height: 630,
            alt: "Profesionální webový vývojář Adam Bartůšek",
          },
        ],
        locale: "cs_CZ", // Language and locale
        type: "website",
      },
    },
    en: {
      title: "Adam Bartůšek - Web Developer",
      description: "Professional web developer specializing in the creation of websites and applications.",
      keywords: "websites, e-shop, web, web development, applications, e-shop creation, web app development",
      openGraph: {
        title: "Adam Bartůšek - Web Developer",
        description: "Web developer with expertise in Next.js, SEO, and responsive design.",
        url: "https://www.adam-bartusek.cz",
        siteName: "Adam Bartůšek",
        images: [
          {
            url: "https://www.adam-bartusek.cz/hero.png",
            width: 1200,
            height: 630,
            alt: "Professional web developer Adam Bartůšek",
          },
        ],
        locale: "en_US", // Language and locale
        type: "website",
      },
    },
  };

  // Return metadata based on current locale
  return metadata[currentLocale];
}
export default async function RootLayout({ children, params: { locale } }) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  
  return (
    <html lang="cs">
      <body
        className={`${fontPrimary.variable} ${fontSecondary.variable}`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <Header variant="leftsettings-centerlogo-rightmenu" />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
