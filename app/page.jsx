import styles from "./page.module.scss";
import Project1 from "@/public/projects/project1.avif";
import Project2 from "@/public/projects/project2.avif";
import Project3 from "@/public/portfolio/comarr.png";
import HeroImg from "@/public/hero.png";
import Image from "next/image";
import Link from "next/link";

import Btn from "@/components/btn/btn.component";

const references = [
  {
    title: "Beauty Studio Natali",
    image: Project1,
    url: "https://www.beautystudionatali.cz/",
    category: "Prezentační web",
  },
  {
    title: "Aurea Socials",
    image: Project2,
    url: "https://www.aurea-socials.cz/cs",
    category: "Firemní web",
  },
  {
    title: "ComArr",
    image: Project3,
    url: "https://www.comarr.cz/",
    category: "Webová aplikace",
  },
];

const problems = [
  {
    title: "Zastaralý první dojem",
    text: "Design i struktura často odpovídají webům starým 10+ let a snižují důvěru rodičů.",
  },
  {
    title: "Informace jsou schované",
    text: "Jídelna, kontakty, zápis nebo aktuality jsou složité na dohledání z mobilu i desktopu.",
  },
  {
    title: "Technický dluh",
    text: "Staré řešení bývá pomalé, hůř spravovatelné a není připravené na současné požadavky.",
  },
];

const processSteps = [
  {
    title: "Analýza školy",
    text: "Projdeme stávající web, cílové skupiny a konkrétní provozní potřeby školy.",
  },
  {
    title: "Návrh struktury a designu",
    text: "Navrhneme jasnou informační architekturu a čistý vizuální styl.",
  },
  {
    title: "Vývoj, spuštění, podpora",
    text: "Web naprogramujeme od nuly, nasadíme a předáme připravený k provozu.",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{"NEWAGEWEB PRO ZÁKLADNÍ ŠKOLY"}</p>
          <h1>
            {"Nový školní web, který "}
            <strong>{"šetří čas rodičům"}</strong>
            {" i vedení školy"}
          </h1>
          <p className={styles.lead}>
            {
              "Jsme dvoučlenný tým vývojářů, který staví nové weby pro školy od nuly. Bez šablon, s důrazem na přehlednost, výkon a dlouhodobě udržitelné řešení."
            }
          </p>
          {/* <div className={styles.heroChips}>
            <span>{"Přehledná struktura"}</span>
            <span>{"Vlastní vývoj"}</span>
            <span>{"Soulad s legislativou"}</span>
          </div> */}
          <div className={styles.heroCtas}>
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
          </div>
          {/* <ul className={styles.heroFacts}>
            <li>
              <strong>{"2"}</strong>
              <span>{"Vývojáři v týmu"}</span>
            </li>
            <li>
              <strong>{"100%"}</strong>
              <span>{"Vlastní psaní kódu"}</span>
            </li>
            <li>
              <strong>{"CZ"}</strong>
              <span>{"Zaměření na české školy"}</span>
            </li>
          </ul> */}
        </div>
        <div className={styles.heroVisual}>
          <Image
            src={HeroImg}
            alt={"Náhled moderního školního webu"}
            priority={true}
          />
          <div className={styles.floatingNote}>
            <p>{"Nový web místo úprav starého systému."}</p>
          </div>
        </div>
      </section>

      <section className={styles.problemSection}>
        <div className={styles.problemHeaderSection}>
          <div className={`${styles.problemHeader}`}>
            <p className={styles.sectionLabel}>{"PROBLÉM, KTERÝ ŘEŠÍME"}</p>
            <h2>{"Když je web školy zastaralý, ztrácí škola důvěru i čas."}</h2>
            <p className={styles.problemLead}>
              {
                "Nejčastější bariéry, které brzdí komunikaci školy směrem k rodičům a veřejnosti."
              }
            </p>
          </div>
          <aside className={styles.problemMeta}>
            <strong>{"30 s"}</strong>
            <span>{"tolik má mít rodič na nalezení klíčové informace."}</span>
          </aside>
        </div>
        <div className={styles.problemGrid}>
          {problems.map((item, i) => (
            <article key={item.title} className={styles.problemCard}>
              <span className={styles.problemIndex}>{`0${i + 1}`}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>


      <section className={styles.referencesSection}>
        <p className={styles.sectionLabel}>{"REFERENCE A ZKUŠENOSTI"}</p>
        <h2>{"Projekty, na kterých stojí náš standard kvality."}</h2>
        <div className={styles.referencesGrid}>
          {references.map((project) => (
            <Link
              href={project.url}
              key={project.title}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.referenceCard}
            >
              <Image src={project.image} alt={project.title} />
              <div>
                <p>{project.category}</p>
                <h3>{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.solutionSection}>
        <div className={styles.solutionIntro}>
          <p className={styles.sectionLabel}>{"CO DODÁVÁME"}</p>
          <h2>{"Kompletní nový web pro školu."}</h2>
          {/* <ul>
            <li>{"Přehledná struktura pro rodiče, žáky i zaměstnance."}</li>
            <li>{"Moderní frontend a rychlé načítání na mobilech."}</li>
            <li>{"Technický základ připravený na další růst školy."}</li>
          </ul> */}
        </div>
        <ol className={styles.steps}>
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <span>{`0${i + 1}`}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      {/* <section className={styles.ctaSection}>
        <h2>{"Chcete návrh nového webu pro vaši školu?"}</h2>
        <p>
          {
            "Pošlete nám odkaz na stávající web. Připravíme konkrétní návrh dalšího postupu."
          }
        </p>
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
      </section> */}
    </main>
  );
}
