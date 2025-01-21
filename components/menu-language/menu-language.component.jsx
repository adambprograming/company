"use client";
import styles from "./menu-language.module.scss";
import FlagOfCs from "../../public/flags/Flag_of_the_Czech_Republic.png";
import FlagOfSk from "../../public/flags/Flag_of_Slovakia.png";
import FlagOfUk from "../../public/flags/Flag_of_the_United_Kingdom.png";
import FlagOfDe from "../../public/flags/Flag_of_Germany.png";
import FlagOfPl from "../../public/flags/Flag_of_Poland.png";
import FlagOfHu from "../../public/flags/Flag_of_Hungary.png";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from "next-intl";

const flags = {
  cs: FlagOfCs,
  sk: FlagOfSk,
  en: FlagOfUk,
  de: FlagOfDe,
  pl: FlagOfPl,
  hu: FlagOfHu,
};

const languageNames = {
  cs: "Česky",
  sk: "Slovensky",
  en: "English",
  de: "Deutsch",
  pl: "Polski",
  hu: "Magyar",
};

const MenuLanguage = ({
  iconOnly = false,
  variant = "first",
  languages = ["cs", "sk", "en", "de", "pl", "hu"],
  fontSize = "14px",
  fontFamily = "var(--font-secondary)",
  paddingOfBtn,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const langMenuRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLanguageChange = (language) => {
    setDropdownOpen(false);
    router.replace(`${pathname}`, {locale: `${language}`});
  };

  const handleClickOutside = (event) => {
    if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      id={`${styles.menuLanguage}`}
      className={`${
        variant === "first"
          ? styles.firstVariant
          : variant === "second"
          ? styles.secondVariant
          : variant === "third"
          ? styles.thirdVariant
          : styles.firstVariant
      }`}
      ref={langMenuRef}
    >
      <button
        onClick={toggleDropdown}
        className={`${styles.menuToggle}`}
        style={{
          padding: `${paddingOfBtn}`,
        }}
      >
        <Image src={flags[locale]} alt={`Flag of ${languageNames[locale]}`} />
        {!iconOnly && (
          <span
            style={{
              fontSize: `${fontSize}`,
              fontFamily: `${fontFamily}`,
            }}
          >
            {languageNames[locale]}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className={`${styles.menuDropdown}`}>
          {languages
            .filter((language) => language !== locale)
            .map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                style={{ padding: `${paddingOfBtn}` }}
              >
                <Image
                  src={flags[language]}
                  alt={`Flag of ${languageNames[language]}`}
                />
                {!iconOnly && (
                  <span
                    style={{
                      fontSize: `${fontSize}`,
                      fontFamily: `${fontFamily}`,
                    }}
                  >
                    {languageNames[language]}
                  </span>
                )}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuLanguage;
