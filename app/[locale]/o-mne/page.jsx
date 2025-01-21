// Styles
import styles from "./page.module.scss";
// Public & Assets
import HeroImg from "@/public/hero.png";
import IconHtml from "@/public/techstack/html.svg";
import IconCss from "@/public/techstack/css.svg";
import IconSass from "@/public/techstack/scss.svg";
import IconJs from "@/public/techstack/js.svg";
import IconReact from "@/public/techstack/react.svg";
import IconNextjs from "@/public/techstack/nextjs.svg";
import IconGit from "@/public/techstack/git.svg";
import IconGithub from "@/public/techstack/github.svg";
import IconPython from "@/public/techstack/python.svg";
import IconFigma from "@/public/techstack/figma.svg";
// React/Next Functions
import Image from "next/image";
import { useTranslations } from "next-intl";
// Context & Actions

// Componenets
import Btn from "@/components/btn/btn.component";
import {
  Showcase,
  ShowcaseItem,
} from "@/components/showcase/showcase.component";

const Page = () => {
  const lang = useTranslations("aboutPage");
  const showcaseLang = useTranslations("components.showcase");
  return (
    <main className={styles.main}>
      <section className={`${styles.introduction}`}>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={HeroImg}
            alt={lang("introductionSection.img.0.alt")}
            aria-label={lang("introductionSection.img.0.aria")}
            priority
          />
        </div>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{lang("introductionSection.subtitle")}</span>
            <h1>
              {lang("introductionSection.title.0")}
              <br />
              {lang("introductionSection.title.1")}
              <strong>{lang("introductionSection.title.2")}</strong>
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{lang("introductionSection.text.0")}</p>
            <br />
            <p>{lang("introductionSection.text.1")}</p>
          </div>
        </div>
      </section>
      <section className={`${styles.showcase}`}>
        <Showcase>
          <ShowcaseItem>
            <Image
              src={IconHtml}
              alt={showcaseLang("img.0.alt")}
              aria-label={showcaseLang("img.0.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconCss}
              alt={showcaseLang("img.1.alt")}
              aria-label={showcaseLang("img.1.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconSass}
              alt={showcaseLang("img.2.alt")}
              aria-label={showcaseLang("img.2.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconJs}
              alt={showcaseLang("img.3.alt")}
              aria-label={showcaseLang("img.3.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconReact}
              alt={showcaseLang("img.4.alt")}
              aria-label={showcaseLang("img.4.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconNextjs}
              alt={showcaseLang("img.5.alt")}
              aria-label={showcaseLang("img.5.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconGit}
              alt={showcaseLang("img.6.alt")}
              aria-label={showcaseLang("img.6.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconGithub}
              alt={showcaseLang("img.7.alt")}
              aria-label={showcaseLang("img.7.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconPython}
              alt={showcaseLang("img.8.alt")}
              aria-label={showcaseLang("img.8.aria")}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconFigma}
              alt={showcaseLang("img.9.alt")}
              aria-label={showcaseLang("img.9.aria")}
            />
          </ShowcaseItem>
        </Showcase>
      </section>
      <section className={`${styles.experience}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{lang("experienceSection.subtitle")}</span>
            <h1>
              {lang("experienceSection.title.0")}
              <strong>{lang("experienceSection.title.1")}</strong>
              {lang("experienceSection.title.2")}
            </h1>
            <hr />
          </div>
        </div>
        <div className={`${styles.boxContainer}`}>
          <div className={`${styles.box}`}>
            <h6>{lang("experienceSection.box.0.date")}</h6>
            <hr />
            <p>{lang("experienceSection.box.0.text")}</p>
          </div>
          <div className={`${styles.box}`}>
            <h6>{lang("experienceSection.box.1.date")}</h6>
            <hr />
            <p>{lang("experienceSection.box.1.text")}</p>
          </div>
          <div className={`${styles.box}`}>
            <h6>{lang("experienceSection.box.2.date")}</h6>
            <hr />
            <p>{lang("experienceSection.box.2.text")}</p>
          </div>
        </div>
      </section>
      <section className={`${styles.specialization}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{lang("specializationSection.subtitle")}</span>
            <h1>
              {lang("specializationSection.title.0")}
              <strong>{lang("specializationSection.title.1")}</strong>
              {lang("specializationSection.title.2")}
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{lang("specializationSection.text.0")}</p>
            <br />
            <p>{lang("specializationSection.text.1")}</p>
          </div>
        </div>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={HeroImg}
            alt={lang("specializationSection.img.0.alt")}
            aria-label={lang("specializationSection.img.0.aria")}
          />
        </div>
      </section>
      <section className={`${styles.cta}`}>
        <div className={`${styles.titleContainer}`}>
          <span>{lang('ctaSection.subtitle')}</span>
          <h1>
            {lang('ctaSection.title.0')}<strong>{lang('ctaSection.title.1')}</strong>{lang('ctaSection.title.2')}
          </h1>
          <hr />
        </div>
        <div className={`${styles.textContainer}`}>
          <p>
            {lang('ctaSection.text')}
          </p>
        </div>
        <Btn
          href="/kontakt"
          bgColor="var(--color-primary)"
          textColor="var(--color-text-reverse)"
          borderSize="none"
          hoverEffect="scaleForward"
          ariaLabel={lang('ctaSection.btn.0.aria')}
        >
          {lang('ctaSection.btn.0.content')}
        </Btn>
      </section>
    </main>
  );
};

export default Page;
