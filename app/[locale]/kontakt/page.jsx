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
import HeroImg from "@/public/hero.png";
// React/Next Functions
import { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
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
  const lang = useTranslations("contactPage");
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
    const initialValuesFromSessionStorage = getInitialValuesFromSessionStorage();
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
    const mailtoLink = `mailto:${emailAddress}?subject=Hello%20there&body=Dear%20Adam%2C%0D%0A%0D%0AI'm%20interested%20in%20your%20services.%0D%0A%0D%0ABest%20regards%2C%0D%0A[Your%20Name]`;
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
    console.log(formData);

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
        message: `${lang(`formSection.error.${error.message}`)}`,
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
            <span>{lang("contactsSection.subtitle")}</span>
            <h1>
              {lang("contactsSection.title.0")}
              <strong>{lang("contactsSection.title.1")}</strong>
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
                  {lang("contactsSection.btn.0.content")}
                  {phoneNumberCopied && (
                    <span>{lang("contactsSection.popup")}</span>
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
                  {lang("contactsSection.btn.1.content")}
                  {emailAddressCopied && (
                    <span>{lang("contactsSection.popup")}</span>
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
              aria-label={lang("contactsSection.btn.2.aria")}
            >
              <div className={`${styles.iconContainer}`}>
                <IconLocation />
              </div>
              <div className={`${styles.specContainer}`}>
                <span className={`${styles.contactTitle}`}>
                  {lang("contactsSection.btn.2.content")}
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
                  {lang("contactsSection.btn.3.content")}
                  {icoCopied && <span>{lang("contactsSection.popup")}</span>}
                </span>
                <span className={`${styles.contactValue}`}>
                  {ico}
                  {`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}
                </span>
              </div>
            </div>
          </div>
          <hr style={{ width: "100%" }} />
          <h2>{lang("contactsSection.text")}</h2>
          <div className={`${styles.additionalContacts}`}>
            <Btn
              href="https://www.instagram.com/_adaamb/"
              borderSize="none"
              paddingOfBtn="0"
              hoverEffect="scaleForward"
              ariaLabel={lang("contactsSection.btn.4.aria")}
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
              ariaLabel={lang("contactsSection.btn.5.aria")}
            >
              <div className={`${styles.iconContainer}`}>
                <IconLinkedin />
              </div>
            </Btn>
            <Btn
              href={`https://www.linkedin.com/in/adam-bart%C5%AF%C5%A1ek-251107286/?locale=cs_CZ`}
              borderSize="none"
              paddingOfBtn="0"
              hoverEffect="scaleForward"
              ariaLabel={lang("contactsSection.btn.6.aria")}
            >
              <div className={`${styles.iconContainer}`}>
                <IconGithub />
              </div>
            </Btn>
          </div>
        </div>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={HeroImg}
            alt={lang("contactsSection.img.0.alt")}
            aria-label={lang("contactsSection.img.0.aria")}
            priority
          />
        </div>
      </section>
      <section className={`${styles.form}`} id="form">
        <div className={`${styles.titleContainer}`}>
          <span>{lang("formSection.subtitle")}</span>
          <h1>
            <strong>{lang("formSection.title.0")}</strong>
            {lang("formSection.title.1")}
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
          fontWeightOfLabelsForm="500"
          borderRadius="15px"
          bgColorOfLabelsForm="transparent"
        >
          <FormRow>
            <FormInput
              tag="name"
              label={lang("formSection.field.0.label")}
              placeholder={lang("formSection.field.0.placeholder")}
              validationPattern={
                /^[a-zA-ZěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ\s'-]{2,30}$/
              }
              maxLength={30}
              hintText={lang("formSection.field.0.hintText")}
              isRequired={true}
            />
            <FormInput
              tag="surname"
              label={lang("formSection.field.1.label")}
              placeholder={lang("formSection.field.1.placeholder")}
              validationPattern={
                /^[a-zA-ZěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ\s'-]{2,35}$/
              }
              maxLength={35}
              hintText={lang("formSection.field.1.hintText")}
              isRequired={true}
            />
          </FormRow>
          <FormRow>
            <FormInput
              tag="phone"
              label={lang("formSection.field.2.label")}
              placeholder={lang("formSection.field.2.placeholder")}
              validationPattern={/^\+?[0-9]{7,15}$/}
              maxLength={15}
              hintText={lang("formSection.field.2.hintText")}
              isRequired={true}
            />
            <FormInput
              tag="email"
              label={lang("formSection.field.3.label")}
              placeholder={lang("formSection.field.3.placeholder")}
              validationPattern={
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,320}$/
              }
              maxLength={320}
              hintText={lang("formSection.field.3.hintText")}
              isRequired={true}
            />
          </FormRow>
          <FormPicker
            fontWeightInput="500"
            label={lang("formSection.field.4.label")}
          >
            <FormPickerOption
              functionOnClick={() => {
                setChoosedOptionForm(0);
              }}
              selected={choosedOptionForm === 0}
            >
              {lang("formSection.field.4.option.0")}
            </FormPickerOption>
            <FormPickerOption
              functionOnClick={() => {
                setChoosedOptionForm(1);
              }}
              selected={choosedOptionForm === 1}
            >
              {lang("formSection.field.4.option.1")}
            </FormPickerOption>
          </FormPicker>
          {choosedOptionForm === 1 && (
            <FormTextarea
              tag="scope"
              label={lang("formSection.field.5.label")}
              placeholder={lang("formSection.field.5.placeholder")}
              maxLength={500}
              rows={4}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormTextarea
              tag="functions"
              label={lang("formSection.field.6.label")}
              placeholder={lang("formSection.field.6.placeholder")}
              maxLength={500}
              rows={4}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormInput
              tag="exemple-url"
              label={lang("formSection.field.7.label")}
              placeholder={lang("formSection.field.7.placeholder")}
              maxLength={60}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormInput
              tag="price"
              label={lang("formSection.field.8.label")}
              placeholder={lang("formSection.field.8.placeholder")}
              maxLength={50}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormInput
              tag="deadline"
              label={lang("formSection.field.9.label")}
              placeholder={lang("formSection.field.9.placeholder")}
              maxLength={50}
            />
          )}
          {choosedOptionForm === 1 && (
            <FormTextarea
              tag="other-specs"
              label={lang("formSection.field.10.label")}
              placeholder={lang("formSection.field.10.placeholder")}
              maxLength={1000}
              rows={4}
            />
          )}
          {choosedOptionForm === 0 && (
            <FormTextarea
              tag="general-specs"
              label={lang("formSection.field.11.label")}
              placeholder={lang("formSection.field.11.placeholder")}
              maxLength={1000}
              rows={6}
            />
          )}
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
