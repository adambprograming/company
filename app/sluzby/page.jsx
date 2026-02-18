// Styles
import styles from "./page.module.scss";
// Public & Assets
import IconPerformance from "@/components/svgs/services-benefits-icons/icon-performance.component";
import IconResponsiveness from "@/components/svgs/services-benefits-icons/icon-responsiveness.component";
import IconSeo from "@/components/svgs/services-benefits-icons/icon-seo.component";
import IconAuthenticity from "@/components/svgs/services-benefits-icons/icon-authenticity.component";
import Icon1 from "@/components/svgs/number-icons/icon-1.component";
import Icon2 from "@/components/svgs/number-icons/icon-2.component";
import Icon3 from "@/components/svgs/number-icons/icon-3.component";
import Icon4 from "@/components/svgs/number-icons/icon-4.component";
// React/Next Functions
// Context & Actions

// Componenets
import { FlipCard } from "@/components/card/card.component";

const ServicesPage = () => {
    return (
    <main className={`${styles.main}`}>
      <section className={`${styles.process}`}>
        <div className={styles.titleContainer}>
          <span>{"POSTUP"}</span>
          <h1>
            {"Jak probíhá "}
            <strong>{"spolupráce"}</strong>
            {" se školou?"}
          </h1>
          <hr />
        </div>
        <ul>
          <li>
            <Icon1 />
            <div>
              <span>{"Analýza současného stavu"}</span>
              <hr />
              <p>{"Projdeme váš stávající web, cíle školy a obsah, který musí být snadno dohledatelný pro rodiče i veřejnost."}</p>
            </div>
          </li>
          <li>
            <Icon2 />
            <div>
              <span>{"Návrh struktury a designu"}</span>
              <hr />
              <p>{"Připravíme moderní informační architekturu a vizuální směr, který bude důvěryhodně reprezentovat školu."}</p>
            </div>
          </li>
          <li>
            <Icon3 />
            <div>
              <span>{"Vývoj a testování"}</span>
              <hr />
              <p>{"Web naprogramujeme od nuly, otestujeme na mobilech i desktopu a doladíme výkon i SEO základy."}</p>
            </div>
          </li>
          <li>
            <Icon4 />
            <div>
              <span>{"Spuštění a podpora"}</span>
              <hr />
              <p>{"Po nasazení webu vám pomůžeme s další správou a navazujícími úpravami podle potřeby školy."}</p>
            </div>
          </li>
        </ul>
      </section>
      <section className={`${styles.benefits}`}>
        <div className={styles.titleContainer}>
          <span>{"STANDARD"}</span>
          <h1>
            {"Co získá "}
            <strong>{"každá"}</strong>
            {" škola?"}
          </h1>
          <hr />
        </div>
        <div className={styles.contentContainer}>
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
                {"Rychlé načítání i při vyšší návštěvnosti během náboru nebo důležitých oznámení."}
              </p>
            }
            hoverEffect="sticker"
          >
            <div className={`${styles.frontContent}`}>
              <IconPerformance />
              <span className={styles.frontTitle}>
                {"Výkon"}
              </span>
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
                {"Bezchybná čitelnost na mobilu, tabletu i počítači pro rodiče i zaměstnance školy."}
              </p>
            }
            hoverEffect="sticker"
          >
            <div className={`${styles.frontContent}`}>
              <IconResponsiveness />
              <span className={styles.frontTitle}>
                {"Responsivita"}
              </span>
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
                {"Lepší dohledatelnost školy ve vyhledávání a jasná struktura pro obsah i aktuality."}
              </p>
            }
            hoverEffect="sticker"
          >
            <div className={`${styles.frontContent}`}>
              <IconSeo />
              <span className={styles.frontTitle}>
                {"SEO základy"}
              </span>
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
                {"Žádné šablony, ale web postavený přesně podle potřeb vaší školy."}
              </p>
            }
            hoverEffect="sticker"
          >
            <div className={`${styles.frontContent}`}>
              <IconAuthenticity />
              <span className={styles.frontTitle}>
                {"Vlastní řešení"}
              </span>
            </div>
          </FlipCard>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
