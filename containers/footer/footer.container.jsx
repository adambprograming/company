"use client";
// Styles
import "./footer.styles.scss";
// Public & Assets
import IconEmail from "../../components/svgs/footer-icons/icon-email.component";
import IconInstagram from "../../components/svgs/footer-icons/icon-instagram.component";
import IconLinkedin from "../../components/svgs/footer-icons/icon-linkedin.component";
import IconLocation from "../../components/svgs/footer-icons/icon-location.component";
import IconPhone from "../../components/svgs/footer-icons/icon-phone.component";
import IconGithub from "@/components/svgs/footer-icons/icon-github.component";
// React/Next Functions
import Link from "next/link";
import { useState } from "react";
// Context & Actions

// Components
import Popup from "../../components/popup/popup.component";

const Footer = () => {
    const phoneNumber = "+420778033073";
  const emailAddress = "ab@adam-bartusek.cz";
  const [popupPhone, setPopupPhone] = useState(false);
  const [popupEmail, setPopupEmail] = useState(false);

  const copyToClipboard = (toClipboard, popup) => {
    navigator.clipboard.writeText(toClipboard);
    switch (popup) {
      case "email":
        const mailtoLink = `mailto:${emailAddress}?subject=Nez%C3%A1vazn%C3%A1%20popt%C3%A1vka%20nov%C3%A9ho%20webu%20pro%20%C5%A1kolu&body=Dobr%C3%BD%20den%2C%0D%0A%0D%0Am%C3%A1m%20z%C3%A1jem%20o%20nov%C3%BD%20web%20pro%20%C5%A1kolu.%0D%0A%0D%0AS%20pozdravem%2C%0D%0A[Va%C5%A1e%20jm%C3%A9no]`;
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
    <footer id="article-footer">
      <div className="footer-container">
        <div className="footer-container-info">
          <div className="footer-nav">
            <span>{"Menu"}</span>
            <ul>
              <li>
                <Link href="#proces" aria-label={"Navigovat do sekce služby"}>
                  {"Proces spolupráce"}
                </Link>
              </li>
              <li>
                <Link href="#kontakt" aria-label={"Navigovat do sekce kontakt"}>
                  {"Kontakt"}
                </Link>
              </li>
              <li>
                <Link href="/pravni" aria-label={"Navigovat na stránku právních informací"}>
                  {"Právní informace"}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-contacts">
            <span>{"Kontakty"}</span>
            <div className="footer-icons">
              <span
                className="footer-phone"
                onClick={() => {
                  copyToClipboard(phoneNumber, "phone");
                }}
              >
                <IconPhone />
                <Popup state={popupPhone}>{"Zkopírováno!"}</Popup>
              </span>
              <span
                className="footer-email"
                onClick={() => {
                  copyToClipboard(emailAddress, "email");
                }}
              >
                <IconEmail />
                <Popup state={popupEmail}>{"Zkopírováno!"}</Popup>
              </span>
            </div>
          </div>
        </div>
        <div className="footer-container-copyright">
          <p>
            {"NewAgeWeb "}&copy;{" 2026."}
          </p>
          <p>
            <span>{"Všechna práva vyhrazena."}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
