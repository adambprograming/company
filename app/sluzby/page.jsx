import styles from "./page.module.scss";
import IconPerformance from "@/components/svgs/services-benefits-icons/icon-performance.component";
import IconResponsiveness from "@/components/svgs/services-benefits-icons/icon-responsiveness.component";
import IconSeo from "@/components/svgs/services-benefits-icons/icon-seo.component";
import IconAuthenticity from "@/components/svgs/services-benefits-icons/icon-authenticity.component";
import Btn from "@/components/btn/btn.component";

const pillars = [
  {
    title: "Strategie před grafikou",
    text: "Nejdřív skládáme obsah a priority školy, až potom navrhujeme vizuál. Díky tomu je web přehledný a funkční.",
  },
  {
    title: "Kód bez šablon",
    text: "Každý projekt programujeme na míru. Škola neplatí za zbytečnosti a získá řešení, které se dá rozvíjet.",
  },
  {
    title: "Dlouhodobě udržitelné řešení",
    text: "Web stavíme tak, aby byl rychlý, snadno upravitelný a připravený na další potřeby školy v čase.",
  },
];

const processSteps = [
  {
    phase: "01",
    title: "Analýza současného stavu",
    text: "Projdeme váš stávající web, cíle školy a obsah, který musí být snadno dohledatelný pro rodiče i veřejnost.",
    outcome: "Výstup: seznam priorit a slabých míst.",
  },
  {
    phase: "02",
    title: "Návrh struktury a designu",
    text: "Připravíme moderní informační architekturu a vizuální směr, který bude důvěryhodně reprezentovat školu.",
    outcome: "Výstup: struktura webu a návrh klíčových obrazovek.",
  },
  {
    phase: "03",
    title: "Vývoj a testování",
    text: "Web naprogramujeme od nuly, otestujeme na mobilech i desktopu a doladíme výkon i SEO základy.",
    outcome: "Výstup: funkční a odladěný web připravený ke spuštění.",
  },
  {
    phase: "04",
    title: "Spuštění a podpora",
    text: "Po nasazení webu vám pomůžeme s další správou a navazujícími úpravami podle potřeby školy.",
    outcome: "Výstup: stabilní provoz a plán dalšího rozvoje.",
  },
];

const standards = [
  {
    title: "Výkon",
    text: "Rychlé načítání i při vyšší návštěvnosti během náboru nebo důležitých oznámení.",
    Icon: IconPerformance,
  },
  {
    title: "Responsivita",
    text: "Bezchybná čitelnost na mobilu, tabletu i počítači pro rodiče i zaměstnance školy.",
    Icon: IconResponsiveness,
  },
  {
    title: "SEO základy",
    text: "Lepší dohledatelnost školy ve vyhledávání a jasná struktura pro obsah i aktuality.",
    Icon: IconSeo,
  },
  {
    title: "Vlastní řešení",
    text: "Žádné šablony, ale web postavený přesně podle potřeb vaší školy.",
    Icon: IconAuthenticity,
  },
];

const collaborationNeeds = [
  "kontaktní osoba za školu pro rychlé schvalování",
  "základní podklady (logo, fotografie, dokumenty)",
  "priorita obsahu, který rodiče nejčastěji hledají",
];

const ServicesPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.sectionLabel}>{"SLUŽBY NEWAGEWEB"}</p>
          <h1>
            {"Jak probíhá "}
            <strong>{"spolupráce"}</strong>
            {" se školou?"}
          </h1>
          <p className={styles.lead}>
            {
              "Navrhujeme a vyvíjíme nové školní weby od základů. Cílem je moderní prezentace školy, jednoduchá orientace a dlouhodobě udržitelné řešení."
            }
          </p>
          <div className={styles.heroActions}>
            <Btn
              href="/kontakt"
              bgColor="var(--color-primary)"
              textColor="var(--color-text-reverse)"
              borderSize="none"
              hoverEffect="scaleForward"
              ariaLabel={"Přejít na kontaktní formulář"}
            >
              {"Nezávazná konzultace"}
            </Btn>
            <Btn
              href="/objednavka"
              bgColor="transparent"
              textColor="var(--color-text)"
              borderSize="1px"
              borderColor="var(--color-primary)"
              hoverEffect="scaleForward"
              ariaLabel={"Přejít na stránku objednávky"}
            >
              {"Poptat nový web"}
            </Btn>
          </div>
          <ul className={styles.heroStats}>
            <li>
              <strong>{"4"}</strong>
              <span>{"kroky spolupráce"}</span>
            </li>
            <li>
              <strong>{"100 %"}</strong>
              <span>{"vlastní vývoj"}</span>
            </li>
            <li>
              <strong>{"CZ"}</strong>
              <span>{"zaměření na školy"}</span>
            </li>
          </ul>
        </div>
        <div className={styles.heroVisual}>
          <article className={styles.visualCard}>
            <p>{"Co na novém webu řešíme jako první"}</p>
            <h3>{"Rodič musí najít důležité informace rychle a bez tápání."}</h3>
            <ul>
              <li>{"přehledná struktura a logická navigace"}</li>
              <li>{"čitelné rozvržení pro mobil i desktop"}</li>
              <li>{"obsah, který reprezentuje školu důvěryhodně"}</li>
            </ul>
            <div className={styles.visualFoot}>
              <strong>{"4–6 týdnů"}</strong>
              <span>{"typická realizace podle rozsahu projektu"}</span>
            </div>
          </article>
          <p className={styles.visualNote}>{"Nový web místo oprav zastaralého systému."}</p>
        </div>
      </section>

      <section className={styles.pillars}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>{"NÁŠ PŘÍSTUP"}</p>
          <h2>{"Kombinujeme kvalitu vývoje, jasný proces a férovou komunikaci."}</h2>
        </header>
        <div className={styles.pillarGrid}>
          {pillars.map((pillar) => (
            <article className={styles.pillarCard} key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>{"POSTUP SPOLUPRÁCE"}</p>
          <h2>{"Krok za krokem od analýzy po spuštění."}</h2>
        </header>
        <div className={styles.processLayout}>
          <ol className={styles.processTrack}>
            {processSteps.map((step) => (
              <li className={styles.stepCard} key={step.title}>
                <span className={styles.stepIndex}>{step.phase}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <small>{step.outcome}</small>
              </li>
            ))}
          </ol>
          <aside className={styles.processAside}>
            <h3>{"Co potřebujeme od školy pro hladký průběh"}</h3>
            <ul>
              {collaborationNeeds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.benefits}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>{"TECHNICKÝ STANDARD"}</p>
          <h2>{"Co získá každá škola v každém projektu."}</h2>
        </header>
        <div className={styles.benefitGrid}>
          <article className={styles.benefitIntro}>
            <h3>{"Minimum, které bereme jako standard"}</h3>
            <p>
              {
                "Nejde jen o hezký design. Každý web stavíme jako funkční nástroj pro komunikaci školy s rodiči a veřejností."
              }
            </p>
          </article>
          {standards.map(({ title, text, Icon }, i) => (
            <article
              key={title}
              className={`${styles.benefitCard} ${
                i === 0 ? styles.featured : ""
              } ${i === 3 ? styles.accented : ""}`}
            >
              <div className={styles.iconWrap}>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>{"Chcete projít váš aktuální web a navrhnout nový směr?"}</h2>
        <p>
          {
            "Pošlete nám odkaz na stávající web školy. Připravíme konkrétní návrh dalšího postupu."
          }
        </p>
        <ul className={styles.ctaFacts}>
          <li>{"jasný rozsah a očekávání před startem"}</li>
          <li>{"transparentní komunikace během celé realizace"}</li>
          <li>{"web připravený na dlouhodobý provoz"}</li>
        </ul>
        <div className={styles.ctaActions}>
          <Btn
            href="/kontakt"
            bgColor="var(--color-primary)"
            textColor="var(--color-text-reverse)"
            borderSize="none"
            hoverEffect="scaleForward"
            ariaLabel={"Přejít na kontaktní formulář"}
          >
            {"Napsat poptávku"}
          </Btn>
          <Btn
            href="/objednavka"
            bgColor="transparent"
            textColor="var(--color-text)"
            borderSize="1px"
            borderColor="var(--color-primary)"
            hoverEffect="scaleForward"
            ariaLabel={"Přejít na stránku objednávky"}
          >
            {"Přejít na objednávku"}
          </Btn>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
