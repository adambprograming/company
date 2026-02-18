import { Inter, Work_Sans } from "next/font/google";
import "./globals.scss";

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

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.newageweb.cz";
  const image = `${baseUrl}/hero.png`;

  return {
    title: "NewAgeWeb | Moderní weby pro základní školy",
    description:
      "Tvoříme nové weby pro základní školy v Česku. Vlastní vývoj bez šablon, důraz na přehlednost, výkon a dlouhodobou správu.",
    keywords:
      "web pro školy, webové stránky pro základní školy, tvorba školního webu, moderní školní web, Next.js vývoj",
    metadataBase: new URL(baseUrl),
    applicationName: "NewAgeWeb",
    generator: "Next.js",
    themeColor: "#ffffff",
    authors: [{ name: "NewAgeWeb" }],
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
    },
    openGraph: {
      title: "NewAgeWeb | Moderní weby pro základní školy",
      description:
        "Navrhujeme a vyvíjíme nové školní weby od nuly. Bez šablon, s důrazem na výkon, přehlednost a kvalitu.",
      url: baseUrl,
      siteName: "NewAgeWeb",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "NewAgeWeb - moderní weby pro základní školy",
        },
      ],
      locale: "cs_CZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "NewAgeWeb | Weby pro základní školy",
      description:
        "Stavíme nové weby pro školy v Česku. Vlastní vývoj, férová cena, vysoká kvalita.",
      images: [image],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body className={`${fontPrimary.variable} ${fontSecondary.variable}`}>
        <Header variant="leftsettings-centerlogo-rightmenu" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
