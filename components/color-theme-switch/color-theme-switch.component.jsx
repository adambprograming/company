"use client";
// Styles
import styles from "./color-theme-switch.module.scss";
// Public & Assets
import LightThemeIcon from "../svgs/theme-icons/light.component";
import DarkThemeIcon from "../svgs/theme-icons/dark.component";
// Next Functions

// React Functions
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
// Context

// Create btn that will change color theme of website
const ColorThemeSwitch = ({ variant = "first" }) => {
  const lang = useTranslations("colorSwitch");
  // Use local storage for theme persistence
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  useEffect(() => {
    // Retrieve initial theme from local storage, defaulting to 'light'
    let storedTheme;
    try {
      storedTheme = localStorage.getItem("theme");
    } catch (error) {}
    if (storedTheme) {
      setIsDarkTheme(storedTheme === "dark");
    } else {
      let prefersDarkTheme;
      try {
        prefersDarkTheme =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      } catch (error) {}
      setIsDarkTheme(prefersDarkTheme);
    }
  }, []);
  useEffect(() => {
    if (isDarkTheme !== null) {
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
      if (isDarkTheme) {
        document.documentElement.classList.add("dark-theme");
      } else {
        document.documentElement.classList.remove("dark-theme");
      }
    }
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  if (isDarkTheme === null) {
    // Prevent mismatched initial render by not rendering the button until the theme is determined
    return null;
  }
  return (
    <button
      id={`${styles.themeSwitch}`}
      className={`${isDarkTheme ? styles.dark : styles.light} ${
        variant === "first"
          ? styles.firstVariant
          : variant === "second"
          ? styles.secondVariant
          : variant === "third"
          ? styles.thirdVariant
          : ""
      }`}
      aria-label={lang('aria')}
      onClick={toggleTheme}
    >
      {(variant === "second" || variant === "third") && (
        <span className={`${styles.slider}`}></span>
      )}
      <LightThemeIcon className={styles.lightIcon} />
      <DarkThemeIcon className={styles.darkIcon} />
    </button>
  );
};

export default ColorThemeSwitch;
