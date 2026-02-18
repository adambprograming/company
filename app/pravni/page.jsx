import styles from "./page.module.scss";

const LegalPage = () => {
  
  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <div className={styles.header}>
          <span>{"PRÁVNÍ INFORMACE"}</span>
          <h1>{"Povinné informace webu NewAgeWeb"}</h1>
          <p>{"Níže je připravený základ pro povinné právní sekce. Finální znění doporučujeme před spuštěním zkontrolovat právníkem."}</p>
        </div>

        <article className={styles.card}>
          <h2>{"Zásady zpracování osobních údajů (GDPR)"}</h2>
          <p>{"Popište, jaké osobní údaje sbíráte (např. kontaktní formulář), za jakým účelem, na jakém právním základě a jak dlouho je uchováváte. Doplňte také kontakt na správce údajů."}</p>
        </article>

        <article className={styles.card}>
          <h2>{"Cookies"}</h2>
          <p>{"Uveďte, jaké typy cookies používáte (nezbytné, analytické, marketingové), kdo je nastavuje a jak může uživatel souhlas změnit nebo odvolat."}</p>
        </article>

        <article className={styles.card}>
          <h2>{"Obchodní podmínky"}</h2>
          <p>{"Definujte podmínky spolupráce: rozsah služeb, cenu, platební podmínky, termíny, odpovědnost, reklamační postup a způsob ukončení spolupráce."}</p>
        </article>
      </section>
    </main>
  );
};

export default LegalPage;
