'use server'
// Styles
import styles from "./page.module.scss";
// Public & Assets
import HeroImg from "@/public/hero.png";
import IconPerformance from "@/components/svgs/services-benefits-icons/icon-performance.component";
import IconResponsiveness from "@/components/svgs/services-benefits-icons/icon-responsiveness.component";
import IconSeo from "@/components/svgs/services-benefits-icons/icon-seo.component";
import IconAuthenticity from "@/components/svgs/services-benefits-icons/icon-authenticity.component";
import Icon1 from "@/components/svgs/number-icons/icon-1.component";
import Icon2 from "@/components/svgs/number-icons/icon-2.component";
import Icon3 from "@/components/svgs/number-icons/icon-3.component";
import Icon4 from "@/components/svgs/number-icons/icon-4.component";
// React/Next Functions
import Image from "next/image";
import dynamic from 'next/dynamic'
import { useTranslations } from "next-intl";
// Context & Actions

// Componenets
// const LazyInteractiveChooser = dynamic(() => import("@/components/interactive-chooser/interactive-chooser.component"))
import InteractiveChooser from "@/components/interactive-chooser/interactive-chooser.component";
import { FlipCard } from "@/components/card/card.component";
import Btn from "@/components/btn/btn.component";

const ServicesPage = () => {
  const lang = useTranslations("servicesPage");
  return (
    <main className={styles.main}>
      <section className={`${styles.chooser}`}>
        <InteractiveChooser />
      </section>
      <section className={`${styles.process}`}>
        <div className={`${styles.titleContainer}`}>
          <span>{lang('processSection.subtitle')}</span>
          <h1>
            {lang('processSection.title.0')}<strong>{lang('processSection.title.1')}</strong>{lang('processSection.title.2')}
          </h1>
          <hr />
        </div>
        <ul>
          <li>
            <Icon1 />
            <div>
              <span>{lang('processSection.list.0.title')}</span>
              <hr />
              <p>
                {lang('processSection.list.0.text')}
              </p>
            </div>
          </li>
          <li>
            <Icon2 />
            <div>
              <span>{lang('processSection.list.1.title')}</span>
              <hr />
              <p>
                {lang('processSection.list.1.text')}
              </p>
            </div>
          </li>
          <li>
            <Icon3 />
            <div>
              <span>{lang('processSection.list.2.title')}</span>
              <hr />
              <p>
                {lang('processSection.list.2.text')}
              </p>
            </div>
          </li>
          <li>
            <Icon4 />
            <div>
              <span>{lang('processSection.list.3.title')}</span>
              <hr />
              <p>
                {lang('processSection.list.3.text')}
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section className={`${styles.benefits}`}>
        <div className={`${styles.titleContainer}`}>
          <span>{lang('benefitsSection.subtitle')}</span>
          <h1>
            {lang('benefitsSection.title.0')}<strong>{lang('benefitsSection.title.1')}</strong>{lang('benefitsSection.title.2')}
          </h1>
          <hr />
        </div>
        <div className={`${styles.contentContainer}`}>
          <FlipCard
            width="clamp(180px, 20vw, 200px)"
            height="clamp(180px, 20vw, 200px)"
            boxShadow=""
            borderSize="0"
            borderRadius="25px"
            bgColor="rgb(from var(--color-secondary) r g b / 0.3)"
            bgHoverColor="rgb(from var(--color-primary) r g b / 1)"
            flippedContent={
              <p className={`${styles.flipedContent}`}>
                {lang('benefitsSection.box.0.text')}
              </p>
            }
            hoverEffect="sticker"
          >
            <div className={`${styles.frontContent}`}>
              <IconPerformance/>
              <span className={`${styles.frontTitle}`}>{lang('benefitsSection.box.0.title')}</span>
            </div>
          </FlipCard>
          <FlipCard
            width="clamp(180px, 20vw, 200px)"
            height="clamp(180px, 20vw, 200px)"
            boxShadow=""
            borderSize="0"
            borderRadius="25px"
            bgColor="rgb(from var(--color-secondary) r g b / 0.3)"
            bgHoverColor="rgb(from var(--color-primary) r g b / 1)"
            flippedContent={
              <p className={`${styles.flipedContent}`}>
                {lang('benefitsSection.box.1.text')}
              </p>
            }
            hoverEffect="sticker"
          >
            <div className={`${styles.frontContent}`}>
              <IconResponsiveness/>
              <span className={`${styles.frontTitle}`}>{lang('benefitsSection.box.1.title')}</span>
            </div>
          </FlipCard>
          <FlipCard
            width="clamp(180px, 20vw, 200px)"
            height="clamp(180px, 20vw, 200px)"
            boxShadow=""
            borderSize="0"
            borderRadius="25px"
            bgColor="rgb(from var(--color-secondary) r g b / 0.3)"
            bgHoverColor="rgb(from var(--color-primary) r g b / 1)"
            flippedContent={
              <p className={`${styles.flipedContent}`}>
                {lang('benefitsSection.box.2.text')}
              </p>
            }
            hoverEffect="sticker"
          >
            <div className={`${styles.frontContent}`}>
              <IconSeo/>
              <span className={`${styles.frontTitle}`}>{lang('benefitsSection.box.2.title')}</span>
            </div>
          </FlipCard>
          <FlipCard
            width="clamp(180px, 20vw, 200px)"
            height="clamp(180px, 20vw, 200px)"
            boxShadow=""
            borderSize="0"
            borderRadius="25px"
            bgColor="rgb(from var(--color-secondary) r g b / 0.3)"
            bgHoverColor="rgb(from var(--color-primary) r g b / 1)"
            flippedContent={
              <p className={`${styles.flipedContent}`}>
                {lang('benefitsSection.box.3.text')}
              </p>
            }
            hoverEffect="sticker"
          >
            <div className={`${styles.frontContent}`}>
              <IconAuthenticity/>
              <span className={`${styles.frontTitle}`}>{lang('benefitsSection.box.3.title')}</span>
            </div>
          </FlipCard>
        </div>
      </section>
      <section className={`${styles.checkAlso}`}>
        <div className={`${styles.titleContainer}`}>
          <span>{lang('checkAlsoSection.subtitle')}</span>
          <h1>
            {lang('checkAlsoSection.title.0')}<strong>{lang('checkAlsoSection.title.1')}</strong>{lang('checkAlsoSection.title.2')}
          </h1>
          <hr />
        </div>
        <div className={`${styles.textContainer}`}>
          <p>
            {lang('checkAlsoSection.text')}
          </p>
        </div>
        <Btn
          href="/kontakt" // TODO ODKAZ NA WEB
          bgColor="var(--color-primary)"
          textColor="var(--color-text-reverse)"
          borderSize="none"
          hoverEffect="scaleForward"
          ariaLabel={lang('checkAlsoSection.btn.0.aria')}
        >
          {lang('checkAlsoSection.btn.0.content')}
        </Btn>
      </section>
    </main>
  );
};

export default ServicesPage;


      {/* <section className={`${styles.checkAlso}`}>
        <div className={`${styles.imgContainer}`}>
          <Image src={HeroImg} alt="portrait" />
        </div>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>SPOLUPRÁCE</span>
            <h1>
              Připraveni realizovat <strong>Váš</strong> projekt?
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>
              Pokud hledáte webového vývojáře, který Vám vytvoří autentický,
              moderní a výkonný web na míru, jste na správném místě. Společně
              vytvoříme řešení, které bude nejen funkční, ale také vynikat v
              konkurenci.
            </p>
          </div>
          <Btn
            href="/kontakt"
            bgColor="var(--color-primary)"
            textColor="var(--color-text-reverse)"
            borderSize="none"
            hoverEffect="scaleForward"
          >
            Kontaktujte mě
          </Btn>
        </div>
      </section> */}