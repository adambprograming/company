"use client";
// Styles
import styles from "./page.module.scss";
// Public & Assets

// React/Next Functions
import { useState } from "react";
// Context & Actions

// Componenets
import Btn from "@/components/btn/btn.component";

const Page = () => {
  const [perYear, setPerYear] = useState(false);
  const togglePrices = () => {
    setPerYear((prev) => !prev);
  };
  return (
    <main className={styles.main}>
      <section className={styles.price}>
        <h1>Přibližné balíčky</h1>

        <div className={styles.list}>
          <div className={styles.card}>
            <h3>Jednoduchý web</h3>
            <p className={styles.desc}>
              Ideální pro osobní prezentaci nebo jednoduché firemní stránky.
            </p>
            <p className={styles.amount}>od 10.000 Kč</p>
            <ul>
              <li>5 sekcí v jedné stránce</li>
              <li>Responzivní design</li>
              <li>Základní SEO</li>
              <li>Vlastní doména a e-mail</li>
            </ul>
          </div>

          <div className={`${styles.card} ${styles.highlight}`}>
            <h3>Komplexní web</h3>
            <p className={styles.desc}>
              Vhodné pro firmy s více podstránkami a obsahem.
            </p>
            <p className={styles.amount}>od 25.000 Kč</p>
            <ul>
              <li>Až 15 sekcí rozdělených do až 5 podstránek</li>
              <li>Vícejazyčnost (základní)</li>
              <li>Systém úpravy obsahu</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Profesionální web</h3>
            <p className={styles.desc}>
              Rozsáhlé, interaktivní řešení s vlastními komponentami.
            </p>
            <p className={styles.amount}>od 55.000 Kč</p>
            <ul>
              <li>Až 25 sekcí rozdělených do až 7 podstránek</li>
              <li>Interaktivní prvky a komponenty</li>
              <li>CMS, vícejazyčnost, režim den/noc</li>
              <li>Optimalizace výkonu</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.details}>
        <h1>Z čeho se skládá cena</h1>

        <p className={styles.intro}>
          Výsledná cena se odvíjí od konkrétních požadavků. Níže najdete
          orientační přehled částí, které cenu ovlivňují.
        </p>
        <p>Práce zahrnuje vlastní design, kódování a testování.</p>

        <div className={styles.container}>
          <div className={styles.item}>
            <h4>Základy a funkce</h4>
            <ul>
              <li>
                Úvodní konzultace <strong>zdarma</strong>
              </li>
              <li>
                Každá sekce <strong>~ 1.000 Kč</strong>
              </li>
              <li>
                Responzivita + SEO <strong>~ 2.000 Kč</strong>
              </li>
              <li>
                CMS (úprava obsahu) <strong>+ 5.000 Kč</strong>
              </li>
              <span>
                * Odvíjí se od množství editovatelných položek
              </span>
              <li>
                Vícejazyčnost <strong>+ 4.000 Kč / jazyk</strong>
              </li>
              <li>
                Denní / noční režim <strong>+ 3.500 Kč</strong>
              </li>
              <li>
                Nafocení fotografií <strong>individuálně</strong>
              </li>
              <span>
                * Můžu zajistit nafocení potřebných fotografií pro web
              </span>
            </ul>
          </div>
          <div className={styles.item}>
            <h4>Správa & hosting</h4>
            <button onClick={togglePrices} className={styles.toggleBtn}>
              Přepnout na ceny za {perYear ? "měsíc" : "rok"}
            </button>
            <ul>
              <li>
                Pravidelné aktualizace knihoven{" "}
                <strong>{perYear ? "1980 Kč / rok" : "160 Kč / měsíc"}</strong>
              </li>
              <span>* Udržení webu na aktuálních verzích technologií</span>
              <li>
                Měsíční přehled návštěvnosti{" "}
                <strong>{perYear ? "1980 Kč / rok" : "160 Kč / měsíc"}</strong>
              </li>
              <span>* Každý měsíc Vám budu zasílat zprávu o návštěvnosti</span>
              <li>
                Webhosting{" "}
                <strong>
                  {perYear
                    ? "od 540 do + 2520 Kč / rok"
                    : "od 45 do + 210 Kč / měsíc"}
                </strong>
              </li>
              <span>
                * Odvíjí se od funkcí na webu a předpokládané návštěvnosti webu
              </span>
              <li>
                Doména <strong>~ 290 Kč / rok</strong>
              </li>
              <span>* Odvíjí se podle aktuální nabídky u prodejců domén</span>
              <li>
                E-mail na vlastní doméně <strong>zdarma</strong>
              </li>
              <li>
                Monitoring výpadků{" "}
                <strong>{perYear ? "1200 Kč / rok" : "100 Kč / měsíc"}</strong>
              </li>
              <span>
                * V případě výpadku vám dám okamžitě vědět (nestane se, že web
                bude mimo týden a nezjistíte to)
              </span>
              <li>
                Prioritní technická podpora{" "}
                <strong>{perYear ? "6000 Kč / rok" : "500 Kč / měsíc"}</strong>
              </li>
              <span>
                * V případě potřeby se Vám budu věnovat prioritně i o víkendech
                (max. 2 klienti s prioritním přístupem)
              </span>
            </ul>
          </div>
        </div>
        <p className={`${styles.note}`}>Poslední změna ceníku k 15. 11. 2024</p>
        <p className={styles.postLaunch}>
          <strong>Úpravy a servis po spuštění:</strong> Úpravy a budoucí změny
          na webu (např. úprava údajů, přidání obrázků) budou naceněny hodinovou
          sazbou (~ 500 Kč / hod) a fakturovány 1× za čtvrtletí (součtem času za období), nebo se můžeme
          domluvit podle potřeby na nějaké měsíční částce, která bude zahrnovat
          drobné rychlé opravy a úpravy.
        </p>
      </section>
    </main>
  );
};

export default Page;
