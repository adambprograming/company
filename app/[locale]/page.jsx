// Styles
import styles from "./page.module.scss";
// Public & Assets
import HeroImg from "@/public/hero.png";
// React/Next Functions
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
// Context

// Componenets
const LazyPortfolioRotatedGrid = dynamic(
  () =>
    import(
      "@/components/portfolio-rotated-grid/portfolio-rotated-grid.component"
    ),
  { ssr: false }
);
import Btn from "@/components/btn/btn.component";

export default function Home() {
  const lang = useTranslations("homePage");
  return (
    <main className={`${styles.main}`}>
      <section className={`${styles.hero}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <h1>
              {lang("heroSection.title.0")}
              <strong>{lang("heroSection.title.1")}</strong>
              {lang("heroSection.title.2")}
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{lang("heroSection.text")}</p>
          </div>
          <div className={`${styles.btnsContainer}`}>
            <Btn
              href="/kontakt"
              bgColor="var(--color-primary)"
              textColor="var(--color-text-reverse)"
              borderSize="none"
              hoverEffect="scaleForward"
              ariaLabel={lang('heroSection.btn.0.aria')}
            >
              {lang("heroSection.btn.0.content")}
            </Btn>
          </div>
        </div>
        <div className={`${styles.imgContainer}`}>
          <Image src={HeroImg} alt={lang('heroSection.img.0.alt')} aria-label={lang('heroSection.img.0.alt')} priority={true} />
        </div>
      </section>
      <section className={`${styles.services}`}>
        <div className={`${styles.imgContainer}`}>
          <Image src={HeroImg} alt={lang('servicesSection.img.0.alt')} aria-label={lang('servicesSection.img.0.alt')} />
        </div>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{lang("servicesSection.subtitle")}</span>
            <h1>
              {lang("servicesSection.title.0")}
              <strong>{lang("servicesSection.title.1")}</strong>
              {lang("servicesSection.title.2")}
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{lang("servicesSection.text")}</p>
            <ul className={`${styles.servicesList}`}>
              <li>{lang("servicesSection.list.0")}</li>
              <li>{lang("servicesSection.list.1")}</li>
              <li>{lang("servicesSection.list.2")}</li>
            </ul>
          </div>
          <Btn
            href="/sluzby"
            bgColor="var(--color-primary)"
            textColor="var(--color-text-reverse)"
            borderSize="none"
            hoverEffect="scaleForward"
            ariaLabel={lang('servicesSection.btn.0.aria')}
          >
            {lang("servicesSection.btn.0.content")}
          </Btn>
        </div>
      </section>
      <section className={`${styles.portfolio}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{lang("portfolioSection.subtitle")}</span>
            <h1>
              {lang("portfolioSection.title.0")}
              <strong>{lang("portfolioSection.title.1")}</strong>
              {lang("portfolioSection.title.2")}
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{lang("portfolioSection.text")}</p>
          </div>
        </div>
        <LazyPortfolioRotatedGrid />
      </section>
      <section className={`${styles.testimonials}`}>
        {/* TODO TESTIMONIALS */}
      </section>
    </main>
  );
}
