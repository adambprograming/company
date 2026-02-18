// Styles
import styles from "./page.module.scss";
// Public & Assets
import MeImg from "@/public/me/about.avif";
import VisionImg from "@/public/vision.png";
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
// Context & Actions

// Componenets
import Btn from "@/components/btn/btn.component";
import {
  Showcase,
  ShowcaseItem,
} from "@/components/showcase/showcase.component";

const Page = () => {
      return (
    <main className={styles.main}>
      <section className={`${styles.introduction}`}>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={MeImg}
            alt={"Obrázek"}
            aria-label={"Obrázek této sekce"}
            priority
          />
        </div>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{"O NÁS"}</span>
            <h1>
              {"Jsme"}
              <br />
              {" tým "}
              <strong>{"NewAgeWeb"}</strong>
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{"Tvoříme moderní weby vlastním kódem v Next.js. Zaměřujeme se na školy, které potřebují důvěryhodný a aktuální web odpovídající dnešním očekáváním rodičů."}</p>
            <br />
            <p>{"Jsme mladý tým s citem pro současný design a uživatelskou orientaci. Kombinujeme rychlou komunikaci, férovou cenu a technickou kvalitu bez kompromisů."}</p>
          </div>
        </div>
      </section>
      <section className={`${styles.showcase}`}>
        <Showcase>
          <ShowcaseItem>
            <Image
              src={IconHtml}
              alt={"HTML"}
              aria-label={"Ikonka HTML"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconCss}
              alt={"CSS"}
              aria-label={"Ikonka CSS"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconSass}
              alt={"Sass"}
              aria-label={"Ikonka Sass"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconJs}
              alt={"JS"}
              aria-label={"Ikonka JS"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconReact}
              alt={"React"}
              aria-label={"Ikonka React"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconNextjs}
              alt={"NextJs"}
              aria-label={"Ikonka NextJs"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconGit}
              alt={"Git"}
              aria-label={"Ikonka Git"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconGithub}
              alt={"GitHub"}
              aria-label={"Ikonka GitHub"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconPython}
              alt={"Python"}
              aria-label={"Ikonka Python"}
            />
          </ShowcaseItem>
          <ShowcaseItem>
            <Image
              src={IconFigma}
              alt={"Figma"}
              aria-label={"Ikonka Figma"}
            />
          </ShowcaseItem>
        </Showcase>
      </section>
      <section className={`${styles.experience}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{"PRAXE"}</span>
            <h1>
              {"Máme zkušenosti z "}
              <strong>{"reálných"}</strong>
              {" projektů"}
            </h1>
            <hr />
          </div>
        </div>
        <div className={`${styles.boxContainer}`}>
          <div className={`${styles.box}`}>
            <h6>{"2022"}</h6>
            <hr />
            <p>{"Začali jsme profesionálně vyvíjet webové projekty a budovat vlastní vývojový přístup bez šablon."}</p>
          </div>
          <div className={`${styles.box}`}>
            <h6>{"2024"}</h6>
            <hr />
            <p>{"Dodali jsme weby pro lokální firmy, například kosmetický salon a social media agenturu."}</p>
          </div>
          <div className={`${styles.box}`}>
            <h6>{"2026"}</h6>
            <hr />
            <p>{"Rozšiřujeme zaměření na základní školy v Česku a stavíme jim nové weby připravené na současné požadavky."}</p>
          </div>
        </div>
      </section>
      <section className={`${styles.specialization}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{"PROČ MY"}</span>
            <h1>
              {"Dáváme školám "}
              <strong>{"silnou"}</strong>
              {" online prezentaci"}
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{"Naším cílem je, aby web školy působil profesionálně, byl rychlý, přehledný a přístupný na všech zařízeních. Každý projekt navrhujeme podle reálných potřeb vedení školy i rodičů."}</p>
            <br />
            <p>{"Odlišení stavíme na třech pilířích: vlastní vývoj bez šablon, vysoký důraz na kvalitu a výkon, a cenově dostupné řešení pro školský rozpočet."}</p>
          </div>
        </div>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={VisionImg}
            alt={"Obrázek"}
            aria-label={"Obrázek této sekce"}
          />
        </div>
      </section>
      <section className={`${styles.cta}`}>
        <div className={`${styles.titleContainer}`}>
          <span>{"SPOLUPRÁCE"}</span>
          <h1>
            {"Chcete nový web "}
            <strong>{"pro"}</strong>
            {" vaši školu?"}
          </h1>
          <hr />
        </div>
        <div className={`${styles.textContainer}`}>
          <p>{"Napište nám a připravíme návrh řešení i orientační rozsah realizace. Úvodní konzultace je nezávazná a zdarma."}</p>
        </div>
        <Btn
          href="/kontakt"
          bgColor="var(--color-primary)"
          textColor="var(--color-text-reverse)"
          borderSize="none"
          hoverEffect="scaleForward"
          ariaLabel={"Navigovat do sekce kontakt"}
        >
          {"Poptat web"}
        </Btn>
      </section>
    </main>
  );
};

export default Page;
