// Fonts
import { Inter, Work_Sans } from "next/font/google";
// Styles
import "./globals.scss";
// Public & Assets

// React/Next Functions
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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
  const currentLocale = routing.locales.includes(locale)
    ? locale
    : routing.defaultLocale;

  const baseUrl = "https://www.adam-bartusek.cz";
  const image = `${baseUrl}/hero.png`;

  // Metadata for different languages
  const localeMeta = {
    cs: {
      title: "Adam Bartůšek - webový vývojář",
      description:
        "Profesionální webový vývojář specializující se na tvorbu webových stránek a aplikací.",
      keywords:
        "webové stránky, e-shop, web, tvorba webu, aplikace, tvorba e-shopu, vývoj webových aplikací",
      openGraph: {
        title: "Adam Bartůšek - webový vývojář",
        description:
          "Webový vývojář s odborností v Next.js, SEO, a responzivním designu.",
        locale: "cs_CZ",
        type: "website",
      },
      twitter: {
        title: "Adam Bartůšek – webový vývojář",
        description:
          "Moderní weby, aplikace a SEO strategie od specialisty v Next.js.",
      },
    },
    en: {
      title: "Adam Bartůšek - Web Developer",
      description:
        "Professional web developer specializing in the creation of websites and applications.",
      keywords:
        "websites, e-shop, web, web development, applications, e-shop creation, web app development",
      openGraph: {
        title: "Adam Bartůšek - Web Developer",
        description:
          "Web developer with expertise in Next.js, SEO, and responsive design.",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        title: "Adam Bartůšek – Web Developer",
        description:
          "Web development, applications and SEO strategies by a Next.js expert.",
      },
    },
  };

  const meta = localeMeta[currentLocale];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(baseUrl),
    applicationName: meta.title,
    generator: "Next.js",
    themeColor: "#ffffff",
    author: "Adam Bartůšek",
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        maxVideoPreview: -1,
        maxImagePreview: "large",
        maxSnippet: -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        cs: "/cs",
        en: "/en",
      },
    },
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: baseUrl,
      siteName: "Adam Bartůšek",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: meta.openGraph.alt,
        },
      ],
      locale: meta.openGraph.locale,
      type: "website",
    },
  };
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
