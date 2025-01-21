"use client";
// Styles
import "./footer.styles.scss";
// Public & Assets
import IconEmail from "../../components/svgs/footer-icons/icon-email.component";
import IconFacebook from "../../components/svgs/footer-icons/icon-facebook.component";
import IconInstagram from "../../components/svgs/footer-icons/icon-instagram.component";
import IconLinkedin from "../../components/svgs/footer-icons/icon-linkedin.component";
import IconLocation from "../../components/svgs/footer-icons/icon-location.component";
import IconPhone from "../../components/svgs/footer-icons/icon-phone.component";
import IconTiktok from "../../components/svgs/footer-icons/icon-tiktok.component";
import IconX from "../../components/svgs/footer-icons/icon-x.component";
import IconGithub from "@/components/svgs/footer-icons/icon-github.component";
// React/Next Functions
import { Link } from "@/i18n/routing";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
// Context & Actions

// Components
import Popup from "../../components/popup/popup.component";

const Footer = () => {
  const lang = useTranslations("footer")
  const phoneNumber = "+42077780333073";
  const emailAddress = "ab@adam-bartusek.cz";
  const [popupPhone, setPopupPhone] = useState(false);
  const [popupEmail, setPopupEmail] = useState(false);
  const footerRef = useRef(null);

  const copyToClipboard = (toClipboard, popup) => {
    navigator.clipboard.writeText(toClipboard);
    switch (popup) {
      case "email":
        const mailtoLink = `mailto:${emailAddress}?subject=Hello%20there&body=Dear%20Adam%2C%0D%0A%0D%0AI'm%20interested%20in%20your%20services.%0D%0A%0D%0ABest%20regards%2C%0D%0A[Your%20Name]`;
        // Copy the email address to clipboard regardless of mailto success
        navigator.clipboard.writeText(emailAddress).then(
          () => {
            setPopupEmail(true);
            setPopupPhone(false);
          },
          () => {}
        );
        // Attempt to open the default mail client
        window.location.href = mailtoLink;
        break;
      case "phone":
        const userAgent = navigator.userAgent || window.opera;
        // Check, if device have phone functions
        if (/android|iphone|ipad|iPod/i.test(userAgent)) {
          window.location.href = `tel:${phoneNumber}`;
        } else {
          // If not (so desktop), just copy phone
          navigator.clipboard.writeText(phoneNumber).then(
            () => {
              setPopupPhone(true);
              setPopupEmail(false);
            },
            () => {}
          );
        }
        break;
    }
    setTimeout(() => {
      switch (popup) {
        case "email":
          setPopupEmail(false);
          break;
        case "phone":
          setPopupPhone(false);
          break;
      }
    }, 2500);
  };

  return (
    <footer id="article-footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-container-info">
          <div className="footer-nav">
            <span>{lang('nav.title')}</span>
            <ul>
              <li>
                <Link href="/" aria-label={lang('nav.list.0.aria')}>{lang('nav.list.0.content')}</Link>
              </li>
              <li>
                <Link href="/o-mne" aria-label={lang('nav.list.1.aria')}>{lang('nav.list.1.content')}</Link>
              </li>
              <li>
                <Link href="/sluzby" aria-label={lang('nav.list.2.aria')}>{lang('nav.list.2.content')}</Link>
              </li>
              <li>
                <Link href="/kontakt" aria-label={lang('nav.list.3.aria')}>{lang('nav.list.3.content')}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-contacts">
            <span>{lang('contacts.title')}</span>
            <div className="footer-icons">
              <span
                className="footer-phone"
                onClick={() => {
                  copyToClipboard(phoneNumber, "phone");
                }}
              >
                <IconPhone />
                <Popup state={popupPhone}>{lang('contacts.popup')}</Popup>
              </span>
              <span
                className="footer-email"
                onClick={() => {
                  copyToClipboard(emailAddress, "email");
                }}
              >
                <IconEmail />
                <Popup state={popupEmail}>{lang('contacts.popup')}</Popup>
              </span>
              <Link
                href="https://www.google.com/maps/place/Pardubice/@50.0342266,15.4292331,10z/data=!3m1!4b1!4m6!3m5!1s0x470dc94b239307b5:0x12d59894ccf624ae!8m2!3d50.0343092!4d15.7811994!16zL20vMGNoNTQ?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang('contacts.link.0.aria')}
              >
                <IconLocation />
              </Link>
              {/* <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang('contacts.link.1.aria')}
              >
                <IconFacebook />
              </Link> */}
              <Link
                href="https://www.instagram.com/_adaamb/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang('contacts.link.2.aria')}
              >
                <IconInstagram />
              </Link>
              {/* <Link
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang('contacts.link.3.aria')}
              >
                <IconTiktok />
              </Link> */}
              <Link
                href={`https://www.linkedin.com/in/adam-bart%C5%AF%C5%A1ek-251107286/?locale=cs_CZ`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang('contacts.link.4.aria')}
              >
                <IconLinkedin />
              </Link>
              {/* <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang('contacts.link.5.aria')}
              >
                <IconX />
              </Link> */}
              <Link
                href="https://github.com/adambprograming"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang('contacts.link.6.aria')}
              >
                <IconGithub />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-container-copyright">
          <p>{lang('copyright.0')}&copy;{lang('copyright.1')}</p>
          <p>
            <span>{lang('createdBy.0')}</span>
            <Link
              href="https://www.adam-bartusek.cz/"
              target="_blank"
              rel="noopener"
              aria-label={lang('link.0.aria')}
            >
              {lang('link.0.content')}
            </Link>
            <span>.</span>
            <span>{lang('createdBy.1')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
