"use client";
// Styles
import styles from "./page.module.scss";
// Public & Assets

// React/Next Functions
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
// Context & Actions
import { sendEmail } from "@/actions/nodemailer";
// Componenets
import {
  Form,
  FormBtnSubmit,
  FormInput,
  FormRow,
  FormTitle,
  FormTextarea,
  FormPicker,
  FormPickerOption,
  FormMultiCheckbox,
  FormSpan,
} from "@/components/form/form.component";
import LoaderForResponse from "@/components/loader-for-response/loader-for-response.component";

const Page = () => {
  const lang = useTranslations("orderPage");
  // 0 is No, 1 is Yes
  const [choosedOptionFormInspiration, setChoosedOptionFormInspiration] =
    useState(0);
  const [choosedOptionFormEditable, setChoosedOptionFormEditable] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [loaderProps, setLoaderProps] = useState({
    isLoading: false,
    status: null,
    message: "",
  });

  useEffect(() => {
    // set initia values from params url
    const urlParams = new URLSearchParams(window.location.search);
    setInitialValues({
      name: urlParams.get("name") || "",
      surname: urlParams.get("surname") || "",
      phone: urlParams.get("phone") || "",
      email: urlParams.get("email") || "",
    });
  }, []);

  const handleSubmit = async (formData) => {
    setLoaderProps({ isLoading: true, status: null, message: "" });
    const message = `\n\nAktuální web:\u00A0${formData["currentWebsite"]}\n\n+Struktura stránky:\n\n\u00A0Počet podstránek:\n\u00A0\u00A0${formData["pagesCount"]}\n\n\u00A0Vybrané podstránky:\n\u00A0\u00A0${formData["pagesTypes"]}\n\n+Technické požadavky:\n\n\u00A0Vybrané funkce:\n\u00A0\u00A0${formData["features"]}\n\n\u00A0Vybrané doplňkové služby:\n\u00A0\u00A0${formData["features"]}\n\n\u00A0CMS:\n\u00A0\u00A0${choosedOptionFormEditable === 0 ? "Ne" : "Ano"}${formData["editable"] ? `\n\n\u00A0Obsah k editaci:\n\u00A0\u00A0${formData["editable"]}` : ""}\n\n\u00A0Propojení s externími systémy:\n\u00A0\u00A0${formData["integrations"]}\n\n+Inspirace pro web:\n\n\u00A0Je online identita:\n\u00A0\u00A0${choosedOptionFormInspiration === 0 ? "Ne" : "Ano"}${formData["brandingLink"] ? `\n\n\u00A0Odkaz na online identitu:\n\u00A0\u00A0${formData["brandingLink"]}` : ""}\n\n\u00A0Inspirace pro web:\n\u00A0\u00A0${formData["inspiration"]}\n\n+Závěrečné informace:\n\n\u00A0Datum dodání:\n\u00A0\u00A0${formData["deadline"]}\n\n\u00A0Rozpočet:\n\u00A0\u00A0${formData["budget"]}\n\n\u00A0Poznámka:\n\u00A0\u00A0${formData["note"]}`;
    try {
      const response = await sendEmail({
        name: `${formData["name"]}`,
        surname: `${formData["surname"]}`,
        email: `${formData["email"]}`,
        phoneNumber: `${formData["phone"]}`,
        message: `${message}`,
      });
      if (response && response.success) {
        setLoaderProps({
          isLoading: false,
          status: "success",
        });
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      setLoaderProps({
        isLoading: false,
        status: "error",
        message: `${lang(`formSection.error.${error.message}`)}`,
      });
    } finally {
      setTimeout(
        () => setLoaderProps({ isLoading: false, status: null, message: "" }),
        10000
      ); // Reset after 5s
    }
  };

  return (
    <main className={styles.main}>
      <section className={`${styles.form}`}>
        <h1 className={`${styles.sectionTitle}`}>
          Objednávka webových stránek
        </h1>
        <Form
          onSubmit={handleSubmit}
          styleOfLabels="above"
          initialValues={initialValues}
          width="calc(100% - (2 * clamp(8px, 2vw, 32px)))"
          padding="clamp(8px, 2vw, 32px)"
          bgColor="var(--shadow-5)"
          fontWeightOfLabels="500"
          borderRadius="15px"
          bgColorOfLabels="transparent"
          fontSizeOfInputsAndBtnsForm="var(--fontsize-p)"
          fontSizeOfLabels="var(--fontsize-small)"
          paddingOfLabels="5px 10px"
          paddingOfInputsAndBtnsForm="10px 20px"
        >
          <FormTitle css={{ padding: "1.5rem 0" }}>Obecné informace</FormTitle>
          <FormRow>
            <FormInput
              minWidth="230px"
              tag="name"
              label={lang("formSection.field.0.label")}
              placeholder={lang("formSection.field.0.placeholder")}
              validationPattern={
                /^[a-zA-ZěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ\s'-]{2,30}$/
              }
              maxLength={30}
              hintText={lang("formSection.field.0.hintText")}
              isRequired={true}
              hintVisibleOnlyOnInvalid={true}
            />
            <FormInput
              minWidth="230px"
              tag="surname"
              label={lang("formSection.field.1.label")}
              placeholder={lang("formSection.field.1.placeholder")}
              validationPattern={
                /^[a-zA-ZěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ\s'-]{2,35}$/
              }
              maxLength={35}
              hintText={lang("formSection.field.1.hintText")}
              isRequired={true}
              hintVisibleOnlyOnInvalid={true}
            />
          </FormRow>
          <FormRow>
            <FormInput
              minWidth="230px"
              tag="phone"
              label={lang("formSection.field.2.label")}
              placeholder={lang("formSection.field.2.placeholder")}
              validationPattern={/^\+?[0-9]{7,15}$/}
              maxLength={15}
              hintText={lang("formSection.field.2.hintText")}
              isRequired={true}
              hintVisibleOnlyOnInvalid={true}
            />
            <FormInput
              minWidth="230px"
              tag="email"
              label={lang("formSection.field.3.label")}
              placeholder={lang("formSection.field.3.placeholder")}
              validationPattern={
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,320}$/
              }
              maxLength={320}
              hintText={lang("formSection.field.3.hintText")}
              isRequired={true}
              hintVisibleOnlyOnInvalid={true}
            />
          </FormRow>
          <FormRow>
            <FormInput
              tag="currentWebsite"
              label={"Máte již webovou stránku?"}
              placeholder={"Uveďte odkaz na Váš současný web, pokud ho máte"}
              maxLength={100}
            />
          </FormRow>
          <FormTitle css={{ padding: "1.5rem 0" }}>
            Specifikace objednávky
          </FormTitle>
          <FormSpan
            css={{
              marginTop: "-10px",
              color: "var(--shadow-100)",
            }}
          >
            Čím více a detailnější informace vyplníte, tím lepší bude naše
            spolupráce.
          </FormSpan>
          {/* Struktura stranky */}
          <FormTitle
            css={{ padding: "1rem 0", fontSize: "var(--fontsize-h5)" }}
          >
            Struktura stránky
          </FormTitle>
          <FormRow>
            <FormInput
              tag="pagesCount"
              label="Do kolika podstránek potřebujete rozdělit web?"
              placeholder="Např. 5"
              hintText="Nevyplňujte v případě, že chcete jednostránkový web."
              hintVisibleOnlyOnInvalid={false}
            />
          </FormRow>
          <FormRow>
            <FormMultiCheckbox
              tag="pagesTypes"
              label="Jaké podstránky budete potřebovat?"
              options={[
                "Domovská stránka",
                "O nás / O mně",
                "Portfolio / Reference",
                "Kontakt",
                "Služby",
                "Blog",
                "Galerie",
                "Produktové stránky",
                "Ceník",
                "FAQ",
                "Jiné (uveďte o políčko výše)",
              ]}
              hintText="Nevyplňujte v případě, že chcete jednostránkový web."
            />
          </FormRow>
          {/* Technické požadavky */}
          <FormTitle
            css={{ padding: "1rem 0", fontSize: "var(--fontsize-h5)" }}
          >
            Technické požadavky
          </FormTitle>
          <FormRow>
            <FormMultiCheckbox
              tag="features"
              label="Funkce, které chcete mít na webu"
              options={[
                "Vícejazyčný",
                "Světlý/Tmavý režim",
                "Kontaktní formulář",
                "Uživatelské rozhraní",
                "E-shop (Produkty a platební brána)",
                "Jiné (Vyplňte do poznámky na konci formuláře)",
              ]}
              hintText={`Vícejazyčný - uzpůsobené pro více jazyků (en/cs/de/pl).\n\nUživatelské rozhraní - Možnost pro Vaše uživatele založit si na webu účet a vidět jejich vlastní obsah (Např. pro historii objednávek v e-shopu).`}
            />
          </FormRow>
          <FormRow>
            <FormMultiCheckbox
              tag="additionalServices"
              label="Vyberte doplňkové služby, které budete chtít k webu zařídit:"
              options={[
                "Doména",
                "Hosting",
                "Logo",
                "Copywriting (texty)",
                "Fotky/Videa k prezentaci",
                "Sociální sítě",
              ]}
              hintText="Doplňkové služby (Doména, hosting, logo, copywriting, fotky/videa) budou potřeba dodat z Vaší strany v případě, že o ně nebudete mít zájem."
            />
          </FormRow>
          <FormPicker label={"Budete potřebovat spravovat obsah na webu?"}>
            <FormPickerOption
              functionOnClick={() => {
                setChoosedOptionFormEditable(0);
              }}
              picked={choosedOptionFormEditable === 0}
            >
              Ne
            </FormPickerOption>
            <FormPickerOption
              functionOnClick={() => {
                setChoosedOptionFormEditable(1);
              }}
              picked={choosedOptionFormEditable === 1}
            >
              Ano
            </FormPickerOption>
          </FormPicker>
          {choosedOptionFormEditable === 1 && (
            <FormRow>
              <FormTextarea
                tag="editable"
                label="Jaký obsah a jak často ho budete potřebovat spravovat?"
                placeholder={`Jde o jakýkoliv obsah, který plánujete měnit, např.:\n\n   Týdenní menu pro resturaci - 1x týdně\n   Galerii obrázků - cca 1x měsíčně\n   Zaměstnance - Podle potřeby`}
                maxLength={1500}
                rows={6}
              />
            </FormRow>
          )}
          <FormRow>
            <FormInput
              tag="integrations"
              label="Propojení s externími systémy"
              placeholder="Např. CRM, e-mail marketing, rezervační systémy..."
              hintText="Externími systémy jsou myšleny systémy, které potřebují dostavát data z webu, nebo je na web odesílat."
            />
          </FormRow>
          {/* INSPIRATION */}
          <FormTitle
            css={{ padding: "1rem 0", fontSize: "var(--fontsize-h5)" }}
          >
            Inspirace pro web
          </FormTitle>
          <FormPicker
            label={
              "Máte již někde online identitu (např. Instagram) a chcete mít web v podobném stylu?"
            }
          >
            <FormPickerOption
              functionOnClick={() => {
                setChoosedOptionFormInspiration(0);
              }}
              picked={choosedOptionFormInspiration === 0}
            >
              Ne
            </FormPickerOption>
            <FormPickerOption
              functionOnClick={() => {
                setChoosedOptionFormInspiration(1);
              }}
              picked={choosedOptionFormInspiration === 1}
            >
              Ano
            </FormPickerOption>
          </FormPicker>
          {choosedOptionFormInspiration === 1 && (
            <FormRow>
              <FormInput
                tag="brandingLink"
                label="Odkaz na Vaši online identitu"
                placeholder="Uveďte odkaz na Vaši online identitu (např. Instagram)"
                hintText="Pokud již máte nějakou online identitu, a chcete aby byl web v podobném stylu (Fonty, barvy, apod.)"
              />
            </FormRow>
          )}
          <FormRow>
            <FormTextarea
              tag="inspiration"
              label="Inspirace pro web:"
              placeholder="V případě, že znáte weby, které se Vám líbí, uveďte odkaz, případně co se Vám líbí (Jaké prvky či styly)"
              maxLength={1000}
              rows={4}
            />
          </FormRow>
          {/* FINAL - PRICE & DATE & NOTE */}
          <FormTitle
            css={{ padding: "1rem 0", fontSize: "var(--fontsize-h5)" }}
          >
            Závěrečné informace
          </FormTitle>
          <FormRow>
            <FormInput
              minWidth="230px"
              tag="deadline"
              label="Ideální termín dokončení"
              placeholder="Vyberte datum, pokud na web spěcháte"
              hintText="Vyplňte v případě, že na web spěcháte, nebo máte datum do kdy byste potřebovali mít web online"
            />
            <FormInput
              minWidth="230px"
              tag="budget"
              label="Rozpočet na web"
              placeholder="Např. 15 000 Kč"
              hintText="Uveďte přibližný rozpočet v Kč, který na web máte"
              isRequired={true}
            />
          </FormRow>
          <FormRow>
            <FormTextarea
              tag="note"
              label="Poznámky a specifické požadavky"
              placeholder="Uveďte podrobnosti k projektu, zvláštní požadavky nebo vaše očekávání."
              maxLength={1000}
              rows={4}
            />
          </FormRow>
          <FormBtnSubmit
            ariaLabel={lang("formSection.btn.0.aria")}
            textHoverColor="var(--color-text-reverse)"
          >
            {lang("formSection.btn.0.content")}
          </FormBtnSubmit>
          <LoaderForResponse
            isLoading={loaderProps.isLoading}
            status={loaderProps.status}
            message={loaderProps.message}
            onClose={() =>
              setLoaderProps({ isLoading: false, status: null, message: "" })
            }
          />
        </Form>
      </section>
    </main>
  );
};

export default Page;
