// Styles
import styles from "./page.module.scss";
// Public & Assets
import MeImg from "@/public/me/homepage.avif";
import Project1 from "@/public/projects/project1.avif";
import Project2 from "@/public/projects/project2.avif";
import Project3 from "@/public/portfolio/comarr.png";
import HeroImg from "@/public/hero.png";
// React/Next Functions
import Image from "next/image";
import Link from "next/link";
// Context

import Btn from "@/components/btn/btn.component";

const projects = [
  {
    title: "Beauty Studio Natali",
    image: Project1,
    url: "https://www.beautystudionatali.cz/",
  },
  {
    title: "Aurea Socials",
    image: Project2,
    url: "https://www.aurea-socials.cz/cs",
  },
  {
    title: "ComArr",
    image: Project3,
    url: "https://www.comarr.cz/",
  },
];

export default function Home() {
    return (
    <main className={`${styles.main}`}>
      <section className={`${styles.hero}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <h1>
              {"Tvoříme "}
              <strong>{"moderní weby"}</strong>
              {" pro základní školy"}
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{"Jsme NewAgeWeb, dvoučlenný tým vývojářů. Pro školy se zastaralým webem navrhujeme a programujeme nové stránky od nuly, bez šablon, s důrazem na přehlednost, rychlost a legislativní požadavky v Česku."}</p>
          </div>
          <div className={`${styles.btnsContainer}`}>
            <Btn
              href="/kontakt"
              bgColor="var(--color-primary)"
              textColor="var(--color-text-reverse)"
              borderSize="none"
              hoverEffect="scaleForward"
              ariaLabel={"Navigovat do sekce kontakt"}
            >
              {"Nezávazná konzultace"}
            </Btn>
          </div>
        </div>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={MeImg}
            alt={"Obrázek"}
            aria-label={"Obrázek"}
            priority={true}
          />
        </div>
      </section>
      <section className={`${styles.services}`}>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={HeroImg}
            alt={"Obrázek"}
            aria-label={"Obrázek"}
          />
        </div>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{"PRO ŠKOLY"}</span>
            <h1>
              {"Navrhujeme "}
              <strong>{"nové"}</strong>
              {" školní weby na míru"}
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{"Nevylepšujeme staré šablony. Stavíme nové školní weby, které pomáhají rodičům rychle najít důležité informace a škole zlepšit online prezentaci."}</p>
            <ul className={`${styles.servicesList}`}>
              <li>{"• Kompletní návrh a vývoj webu od nuly"}</li>
              <li>{"• Přehledná struktura pro rodiče, žáky i zaměstnance"}</li>
              <li>{"• Technický základ pro dlouhodobou správu a rozvoj"}</li>
            </ul>
          </div>
          <Btn
            href="/sluzby"
            bgColor="var(--color-primary)"
            textColor="var(--color-text-reverse)"
            borderSize="none"
            hoverEffect="scaleForward"
            ariaLabel={"Navigovat do sekce služby"}
          >
            {"Jak spolupracujeme"}
          </Btn>
        </div>
      </section>
      <section className={`${styles.portfolio}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{"REFERENCE"}</span>
            <h1>
              {"Podívejte se na "}
              <strong>{"naše"}</strong>
              {" reference"}
            </h1>
            <hr />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{"Ukázky projektů z různých oborů, na kterých jsme si ověřili kvalitní vývoj, výkon a srozumitelnou prezentaci značky."}</p>
          </div>
        </div>
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <Link
              href={project.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.project}>
                <Image
                  src={project.image}
                  alt={project.title || "Project preview"}
                  className={styles.image}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* <section className={`${styles.testimonials}`}>
        TODO TESTIMONIALS
      </section> */}
    </main>
  );
}
