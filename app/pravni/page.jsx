import styles from "./page.module.scss";

const legalSections = [
  {
    id: "gdpr",
    title: "Zásady zpracování osobních údajů (GDPR)",
    description:
      "Na tomto webu nesbíráme, nezpracováváme ani neukládáme žádné osobní údaje návštěvníků.",
    points: [
      {
        label: "Bez formulářů a registrace",
        text: "Web neobsahuje uživatelské účty ani databázi osobních údajů návštěvníků.",
      },
      {
        label: "Bez analytického sledování",
        text: "Nesledujeme chování uživatelů prostřednictvím nástrojů pro analytiku třetích stran.",
      },
      {
        label: "Rozsah zpracování",
        text: "Osobní údaje návštěvníků nejsou na webu systematicky shromažďovány ani archivovány.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies a souhlasy",
    description:
      "Tento web nepoužívá cookies pro analytiku, marketing ani personalizaci obsahu.",
    points: [
      {
        label: "Žádné marketingové cookies",
        text: "Nepoužíváme cookies třetích stran pro reklamu nebo remarketing.",
      },
      {
        label: "Žádné analytické cookies",
        text: "Neshromažďujeme statistiky návštěvnosti pomocí cookie nástrojů.",
      },
      {
        label: "Bez cookie lišty",
        text: "Protože web cookies nepoužívá, není zde potřeba aktivní správa souhlasu.",
      },
    ],
  },
  {
    id: "terms",
    title: "Obchodní podmínky",
    description:
      "TODO",
    points: [
      {
        label: "Rozsah služby",
        text: "Co je součástí dodávky a co už je nad rámec.",
      },
      {
        label: "Platební podmínky",
        text: "Fakturace, splatnost, záloha a případné sankce za prodlení.",
      },
      {
        label: "Reklamace a odpovědnost",
        text: "Postup řešení vad, lhůty a limity odpovědnosti.",
      },
    ],
  },
  {
    id: "provider",
    title: "Identifikační a kontaktní údaje",
    points: [
      {
        label: "Povinné údaje",
        text: "TODO Název, IČO, sídlo, e-mail, telefon a případně zápis v rejstříku.",
      },
    ],
  },
];

const LegalPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.sectionLabel}>{"PRÁVNÍ INFORMACE"}</p>
        <h1>{"Právní rámec webu NewAgeWeb"}</h1>
      </section>

      <section className={styles.wrapper}>

        <div className={styles.cards}>
          {legalSections.map((section, i) => (
            <article key={section.id} id={section.id} className={styles.card}>
              <div className={`${styles.cardHeader}`}>
                <p className={styles.cardIndex}>{`0${i + 1}`}</p>
                <h2>{section.title}</h2>
              </div>
              <p className={styles.cardLead}>{section.description}</p>
              <ul>
                {section.points.map((point) => (
                  <li key={point.label}>
                    <strong>{point.label}</strong>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LegalPage;
