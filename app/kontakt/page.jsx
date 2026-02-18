"use client";
// Styles
import styles from "./page.module.scss";
// Public & Assets
import IconPhone from "@/components/svgs/footer-icons/icon-phone.component";
import IconEmail from "@/components/svgs/footer-icons/icon-email.component";
import IconLocation from "@/components/svgs/footer-icons/icon-location.component";
import IconInstagram from "@/components/svgs/footer-icons/icon-instagram.component";
import IconLinkedin from "@/components/svgs/footer-icons/icon-linkedin.component";
import IconGithub from "@/components/svgs/footer-icons/icon-github.component";
import IconInvoice from "@/components/svgs/footer-icons/icon-invoice.component";
import MeImg from "@/public/me/business_cards.avif";
// React/Next Functions
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
// Context & Actions
import { sendEmail } from "@/actions/nodemailer";
// Componenets
// import Btn from "@/components/btn/btn.component";
const Btn = dynamic(() => import("@/components/btn/btn.component"), {
  ssr: false,
});
import LoaderForResponse from "@/components/loader-for-response/loader-for-response.component";

import {
  Form,
  FormRow,
  FormBtnSubmit,
  FormInput,
  FormTextarea,
  FormPicker,
  FormPickerOption,
} from "@/components/form/form.component";

function getInitialValuesFromSessionStorage() {
  const initialValues = sessionStorage.getItem("initialFormValues");
  if (initialValues) {
    return JSON.parse(initialValues);
  } else {
    return null;
  }
}

const Page = () => {
    const [phoneNumberCopied, setPhoneNumberCopied] = useState(false);
  const [emailAddressCopied, setEmailAddressCopied] = useState(false);
  const [icoCopied, setIcoCopied] = useState(false);
  const phoneNumber = "+420 778 033 073";
  const emailAddress = "ab@adam-bartusek.cz";
  const ico = `10700561`;
  // 0 is No, 1 is Yes
  const [choosedOptionForm, setChoosedOptionForm] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [loaderProps, setLoaderProps] = useState({
    isLoading: false,
    status: null,
    message: "",
  });

  useEffect(() => {
    const initialValuesFromSessionStorage =
      getInitialValuesFromSessionStorage();
    if (initialValuesFromSessionStorage) {
      setChoosedOptionForm(1);
      setInitialValues(initialValuesFromSessionStorage);
    }
  }, []);

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
        () => {}
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
      () => {}
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
      () => {}
    );
  };

  const handleSubmit = async (formData) => {
    setLoaderProps({ isLoading: true, status: null, message: "" });
    var message;
    try {
      if (choosedOptionForm === 0) {
        message = `${formData["general-specs"]}`;
      } else if (choosedOptionForm === 1) {
        message = `\nRozsah: ${formData["scope"]}\nFunkce: ${formData["functions"]}\nVzorový web: ${formData["exemple-url"]}\nRozpočet: ${formData["price"]}\nDatum dodání: ${formData["deadline"]}\nOstatní specifikace: ${formData["other-specs"]}`;
      }
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
        message: `${error.message}` === "0" ? "Povinná pole musí být vyplněna" : "Odeslání se nepovedlo",
      });
    } finally {
      setTimeout(
        () => setLoaderProps({ isLoading: false, status: null, message: "" }),
        15000
      ); // Reset after 5s
    }
  };

  return (
    <main className={styles.main}>
      <section className={`${styles.contacts}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <span>{"KONTAKT"}</span>
            <h1>
              {"Pojďme probrat "}
              <strong>{"nový web školy"}</strong>
            </h1>
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
                  {phoneNumberCopied && (
                    <span>{"Zkopírováno!"}</span>
                  )}
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
                  {emailAddressCopied && (
                    <span>{"Zkopírováno!"}</span>
                  )}
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
                <span className={`${styles.contactTitle}`}>
                  {"Město"}
                </span>
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
          <hr style={{ width: "100%" }} />
          <h2>{"Sledujte nás"}</h2>
          <div className={`${styles.additionalContacts}`}>
            <Btn
              href="https://www.instagram.com/_adaamb/"
              borderSize="none"
              paddingOfBtn="0"
              hoverEffect="scaleForward"
              ariaLabel={"Navigovat na Instagram"}
            >
              <div className={`${styles.iconContainer}`}>
                <IconInstagram />
              </div>
            </Btn>
            <Btn
              href="https://github.com/adambprograming"
              borderSize="none"
              paddingOfBtn="0"
              hoverEffect="scaleForward"
              ariaLabel={"Navigovat na GitHub"}
            >
              <div className={`${styles.iconContainer}`}>
                <IconGithub />
              </div>
            </Btn>
            <Btn
              href={`https://www.linkedin.com/in/adam-bart%C5%AF%C5%A1ek-251107286/?locale=cs_CZ`}
              borderSize="none"
              paddingOfBtn="0"
              hoverEffect="scaleForward"
              ariaLabel={"Navigovat na LinkedIn"}
            >
              <div className={`${styles.iconContainer}`}>
                <IconLinkedin />
              </div>
            </Btn>
          </div>
        </div>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={MeImg}
            alt={"Obrázek"}
            aria-label={"Obrázek této sekce"}
            priority
          />
        </div>
      </section>
      <section className={`${styles.form}`} id="form">
        <div className={`${styles.titleContainer}`}>
          <span>{"FORMULÁŘ"}</span>
          <h1>
            <strong>{"Nezávazná"}</strong>
            {" poptávka"}
          </h1>
          <hr />
        </div>
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
        >
          <FormRow>
            <FormInput
              tag="name"
              label={"Jméno:"}
              placeholder={"Uveďte vaše jméno"}
              validationPattern={
                /^[a-zA-ZěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ\s'-]{2,30}$/
              }
              maxLength={30}
              hintText={"Jméno musí obsahovat 2 až 30 znaků a může obsahovat pouze písmena, mezery a pomlčky."}
              isRequired={true}
            />
            <FormInput
              tag="surname"
              label={"Příjmení:"}
              placeholder={"Uveďte vaše příjmení"}
              validationPattern={
                /^[a-zA-ZěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ\s'-]{2,35}$/
              }
              maxLength={35}
              hintText={"Příjmení musí obsahovat 2 až 35 znaků a může obsahovat pouze písmena, mezery a pomlčky."}
              isRequired={true}
            />
          </FormRow>
          <FormRow>
            <FormInput
              tag="phone"
              label={"Telefonní číslo:"}
              placeholder={"Uveďte Vaše telefonní číslo"}
              validationPattern={/^\+?[0-9]{7,15}$/}
              maxLength={15}
              hintText={"Telefonní číslo musí obsahovat 7 až 15 číslic."}
              isRequired={true}
            />
            <FormInput
              tag="email"
              label={"E-mail:"}
              placeholder={"Uveďte Váš e-mail"}
              validationPattern={
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,320}$/
              }
              maxLength={320}
              hintText={"Zadejte platnou e-mailovou adresu ve formátu např. uzivatel@email.com."}
              isRequired={true}
            />
          </FormRow>
          <FormPicker
            fontWeightOfBtns="500"
            label={"Máte představu o rozsahu nového webu?"}
          >
            <FormPickerOption
              functionOnClick={() => {
                setChoosedOptionForm(0);
              }}
              picked={choosedOptionForm === 0}
            >
              {"Ne"}
            </FormPickerOption>
            <FormPickerOption
              functionOnClick={() => {
                setChoosedOptionForm(1);
              }}
              picked={choosedOptionForm === 1}
            >
              {"Ano"}
            </FormPickerOption>
          </FormPicker>
          {choosedOptionForm === 1 && (
            <FormTextarea
              tag="scope"
              label={"Rozsah zakázky:"}
              placeholder={"Uveďte, na jaké podstránky chcete mít zakázku rozdělenou, případně i strukturu zakázky."}
              maxLength={500}
              rows={4}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormTextarea
              tag="functions"
              label={"Funkce zakázky:"}
              placeholder={"Uveďte funkce, které chcete mít v zakázce. (Např. vícejazyčnost, tmavý/světlý režim, platební bránu, databázi, nebo cokoliv co Vás napadne)."}
              maxLength={500}
              rows={4}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormInput
              tag="exemple-url"
              label={"Web, který se Vám líbí:"}
              placeholder={"Uveďte odkaz na web v případě, že znáte web ,který se Vám graficky líbí."}
              maxLength={60}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormInput
              tag="price"
              label={"Váš rozpočet:"}
              placeholder={"Uveďte Vaši představu o ceně zakázky."}
              maxLength={50}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormInput
              tag="deadline"
              label={"Ideální datum dodání:"}
              placeholder={"Uveďte v případě, že na zakázku opravdu spěcháte."}
              maxLength={50}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormTextarea
              tag="other-specs"
              label={"Ostatní specifikace:"}
              placeholder={"Uveďte dodatečné informace, či požadavky, k zakázce."}
              maxLength={1000}
              rows={4}
            />
          )}
          {choosedOptionForm === 0 && (
            <FormTextarea
              tag="general-specs"
              label={"Popište vaši poptávku:"}
              placeholder={"Popište, co potřebujete, jak to jen půjde. Ideálně zaklikněte možnost 'Ano' výše a pokuste se vyplnit konkrétní formulář."}
              maxLength={1000}
              rows={6}
            />
          )}
          <FormBtnSubmit
            ariaLabel={"Odeslání formuláře"}
            textHoverColor="var(--color-text-reverse)"
          >
            {"Odeslat"}
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
