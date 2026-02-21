"use client";
import styles from "./page.module.scss";
import Project1 from "@/public/projects/project1.avif";
import Project2 from "@/public/projects/project2.avif";
import Project3 from "@/public/portfolio/comarr.png";
import HeroImg from "@/public/hero.png";
import Image from "next/image";
import Link from "next/link";
import IconPhone from "@/components/svgs/footer-icons/icon-phone.component";
import IconEmail from "@/components/svgs/footer-icons/icon-email.component";
import IconLocation from "@/components/svgs/footer-icons/icon-location.component";
import IconInvoice from "@/components/svgs/footer-icons/icon-invoice.component";
import { useState, useEffect } from "react";
import Btn from "@/components/btn/btn.component";
import ScrollToTopBtn from "@/components/scroll-to-top-btn/scroll-to-top-btn.component";


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
  {
    title: "Legislativa a přístupnost",
    text: "Nový web je v souladu s platnou legislativou a zajišťuje přístupnost pro všechny uživatele.",
  },
  {
    title: "Udržitelnost a podpora",
    text: "Web nemá být jednorázový projekt. Myslíme na udržitelnost, snadnou správu a stabilní podporu.",
  },
  {
    title: "Cena a přidaná hodnota",
    text: "Naše řešení je cenově dostupné pro všechny školy a přináší skutečnou přidanou hodnotu.",
  },
];
const processSteps = [
  {
    title: "Úvodní konzultace",
    text: "Vyjasníme cíle vedení školy, očekávání a rozsah projektu. Domluvíme harmonogram a odpovědnosti obou stran.",
  },
  {
    title: "Analýza současného stavu",
    text: "Projdeme stávající web, obsah, technické řešení i slabá místa z pohledu rodičů a veřejnosti.",
  },
  {
    title: "Informační architektura",
    text: "Navrhneme přehlednou strukturu tak, aby klíčové informace byly dostupné během několika kliknutí i z mobilu.",
  },
  {
    title: "Design na míru",
    text: "Vytvoříme moderní a důvěryhodný vizuální styl odpovídající charakteru školy a současným standardům přístupnosti.",
  },
  {
    title: "Vývoj a technická příprava",
    text: "Web naprogramujeme od nuly, optimalizujeme rychlost, responzivitu a základní SEO parametry.",
  },
  {
    title: "Testování a převod obsahu",
    text: "Zapracujeme připomínky, otestujeme funkčnost a zajistíme převod textů, dokumentů i archivů ze stávajícího webu.",
  },
  {
    title: "Spuštění a dlouhodobá péče",
    text: "Web nasadíme na doménu školy, zaškolíme administraci a zůstáváme k dispozici pro další rozvoj a technickou podporu.",
  },
];
// const processSteps = [
//   {
//     title: "Úvodní konzultace",
//     text: "Vyjasníme cíle, potřeby vedení školy a hlavní uživatelské skupiny. Definujeme rozsah projektu a harmonogram.",
//   },
//   {
//     title: "Analýza a zadání",
//     text: "Projdeme stávající web, identifikujeme slabá místa a připravíme konkrétní zadání pro novou strukturu.",
//   },
//   {
//     title: "Informační architektura",
//     text: "Navrhneme přehlednou strukturu tak, aby rodiče i zaměstnanci rychle našli klíčové informace.",
//   },
//   {
//     title: "Design na míru",
//     text: "Připravíme grafický návrh odpovídající charakteru školy a současným standardům důvěryhodnosti a přístupnosti.",
//   },
//   {
//     title: "Vývoj a testování",
//     text: "Web naprogramujeme, optimalizujeme pro všechna zařízení a zpřístupníme k připomínkám na testovací adrese.",
//   },
//   {
//     title: "Převod obsahu a spuštění",
//     text: "Zajistíme převod obsahu, stabilní hosting, nasazení na doménu školy a finální kontrolu funkčnosti.",
//   },
//   {
//     title: "Zaškolení a dlouhodobá péče",
//     text: "Předáme praktický návod k administraci a zůstáváme k dispozici pro další rozvoj a technickou podporu.",
//   },
// ];

export default function Home() {
  const [phoneNumberCopied, setPhoneNumberCopied] = useState(false);
  const [emailAddressCopied, setEmailAddressCopied] = useState(false);
  const [icoCopied, setIcoCopied] = useState(false);
  const phoneNumber = "+420 778 033 073";
  const emailAddress = "ab@adam-bartusek.cz";
  const ico = `10700561`;

  useEffect(() => {
    if (phoneNumberCopied) {
      if (emailAddressCopied) {
        setEmailAddressCopied(false);
      }
      if (icoCopied) {
        setIcoCopied(false);
      }
      setTimeout(() => {
        setPhoneNumberCopied(false);
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumberCopied]);

  useEffect(() => {
    if (emailAddressCopied) {
      if (phoneNumberCopied) {
        setPhoneNumberCopied(false);
      }
      if (icoCopied) {
        setIcoCopied(false);
      }
      setTimeout(() => {
        setEmailAddressCopied(false);
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailAddressCopied]);

  useEffect(() => {
    if (icoCopied) {
      if (phoneNumberCopied) {
        setPhoneNumberCopied(false);
      }
      if (emailAddressCopied) {
        setEmailAddressCopied(false);
      }
      setTimeout(() => {
        setIcoCopied(false);
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icoCopied]);

  const handleCallOrCopyNumber = () => {
    const userAgent = navigator.userAgent || window.opera;
    // Check, if device have phone functions
    if (/android|iphone|ipad|iPod/i.test(userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // If not (so desktop), just copy phone
      navigator.clipboard.writeText(phoneNumber).then(
        () => {
          setPhoneNumberCopied(true);
        },
        () => {},
      );
    }
  };

  const handleEmailOrCopy = () => {
    const mailtoLink = `mailto:${emailAddress}?subject=Nez%C3%A1vazn%C3%A1%20popt%C3%A1vka%20nov%C3%A9ho%20webu%20pro%20%C5%A1kolu&body=Dobr%C3%BD%20den%2C%0D%0A%0D%0Am%C3%A1m%20z%C3%A1jem%20o%20nov%C3%BD%20web%20pro%20%C5%A1kolu.%0D%0A%0D%0AS%20pozdravem%2C%0D%0A[Va%C5%A1e%20jm%C3%A9no]`;
    // Copy the email address to clipboard regardless of mailto success
    navigator.clipboard.writeText(emailAddress).then(
      () => {
        setEmailAddressCopied(true);
      },
      () => {},
    );
    // Attempt to open the default mail client
    window.location.href = mailtoLink;
  };

  const handleIcoCopy = () => {
    // Copy the ico to clipboard
    navigator.clipboard.writeText(ico).then(
      () => {
        setIcoCopied(true);
      },
      () => {},
    );
  };
  return (
    <main className={styles.main}>
      <ScrollToTopBtn />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.sectionLabel}>{"PRO ZÁKLADNÍ ŠKOLY"}</p>
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
                "Nejčastější problémy stávajících školních webů, které řešíme jako první, jsou:"
              }
            </p>
          </div>
          <aside className={styles.problemMeta}>
            <strong>{"20 s"}</strong>
            <span>{"tolik má mít rodič na nalezení klíčové informace"}</span>
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

      <section id="proces" className={styles.solutionSection}>
        <div className={styles.solutionIntro}>
          <p className={styles.sectionLabel}>{"CO DODÁVÁME"}</p>
          <h2>{"Kompletní nový web pro školu."}</h2>
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

      <section id="kontakt" className={`${styles.contacts}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <p className={styles.sectionLabel}>{"KONTAKT"}</p>
            <h2>
              {"Pojďme probrat "}
              <strong>{"nový web školy"}</strong>
            </h2>
            <p className={styles.contactLead}>
              {
                "Napište nám. Navrhneme konkrétní řešení a další kroky. Ozveme se Vám do 24 hodin všedních dní."
              }
            </p>
            <hr />
          </div>
          <div className={`${styles.mainContacts}`}>
            <div onClick={handleCallOrCopyNumber} className={`${styles.phone}`}>
              <div className={`${styles.iconContainer}`}>
                <IconPhone />
              </div>
              <div className={`${styles.specContainer}`}>
                <span className={`${styles.contactTitle}`}>
                  {"Telefon"}
                  {phoneNumberCopied && <span>{"Zkopírováno!"}</span>}
                </span>
                <span className={`${styles.contactValue}`}>{phoneNumber}</span>
              </div>
            </div>
            <div onClick={handleEmailOrCopy} className={`${styles.email}`}>
              <div className={`${styles.iconContainer}`}>
                <IconEmail />
              </div>
              <div className={`${styles.specContainer}`}>
                <span className={`${styles.contactTitle}`}>
                  {"E-mail"}
                  {emailAddressCopied && <span>{"Zkopírováno!"}</span>}
                </span>
                <span className={`${styles.contactValue}`}>{emailAddress}</span>
              </div>
            </div>
            <Link
              href="https://www.google.com/maps/place/Pardubice/@50.0342266,15.4292331,10z/data=!3m1!4b1!4m6!3m5!1s0x470dc94b239307b5:0x12d59894ccf624ae!8m2!3d50.0343092!4d15.7811994!16zL20vMGNoNTQ?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.address}`}
              aria-label={"Navigovat na mapu lokace"}
            >
              <div className={`${styles.iconContainer}`}>
                <IconLocation />
              </div>
              <div className={`${styles.specContainer}`}>
                <span className={`${styles.contactTitle}`}>{"Město"}</span>
                <span className={`${styles.contactValue}`}>Pardubice (CZ)</span>
              </div>
            </Link>
            <div onClick={handleIcoCopy} className={`${styles.ico}`}>
              <div className={`${styles.iconContainer}`}>
                <IconInvoice />
              </div>
              <div className={`${styles.specContainer}`}>
                <span className={`${styles.contactTitle}`}>
                  {"IČO"}
                  {icoCopied && <span>{"Zkopírováno!"}</span>}
                </span>
                <span className={`${styles.contactValue}`}>
                  {ico}
                  {`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={HeroImg}
            alt={"Obrázek"}
            aria-label={"Obrázek této sekce"}
            priority
          />
          <div className={styles.contactNote}>
            <p>{"Odpověď do 24 hodin"}</p>
          </div>
        </div>
      </section>

      <section id="o-nas" className={`${styles.aboutus}`}>
        <div className={styles.aboutLayout}>
          <div className={styles.aboutCore}>
            <div className={styles.aboutHeader}>
              <p className={styles.sectionLabel}>{"O NÁS"}</p>
              <h2>
                {"Jsme dva podnikatelé "}
                <strong>{"ve webovém vývoji"}</strong>
              </h2>
            </div>
            <div className={`${styles.aboutBody}`}>
              <p>
                {
                  "Od začátku nás přirozeně táhlo vytváření věcí, které dávají smysl a fungují. Ne jen hezky vypadají, ale skutečně slouží. K webovému vývoji jsme se dostali samostatně – z vlastní iniciativy, z potřeby pochopit, jak věci fungují do hloubky. Postupně se z toho stal náš obor."
                }
              </p>
              <p>
                {
                  "Dnes oba působíme v oblasti webového vývoje a denně pracujeme na reálných projektech. Programujeme, navrhujeme strukturu, řešíme výkon, přístupnost i dlouhodobou udržitelnost řešení. Současně studujeme IT management, což nám dává širší pohled na technologii jako nástroj řízení a rozvoje, ne jen jako technickou disciplínu."
                }
              </p>
              <p>
                {
                  "Web pro nás není vizitka. Je to infrastruktura, která musí být přehledná, spolehlivá a připravená na další roky provozu."
                }
              </p>
            </div>
          </div>
          <div className={styles.aboutVisual}>
            <ul className={styles.aboutHighlights}>
              <li>{"self-learned background v programování"}</li>
              <li>{"studium IT managementu"}</li>
              <li>{"praxe v IT"}</li>
              <li>{"podnikání ve web developmentu"}</li>
              <li>{"tisíce lidí používají weby, na kterých jsme pracovali"}</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="reference" className={styles.referencesSection}>
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
    </main>
  );
}
