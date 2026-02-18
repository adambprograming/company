"use client";
// Styles
import "./header.styles.scss";
// Public & Assets
import Logo from "@/components/svgs/logo.component.jsx";
// React/Next Functions
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
// Context & Actions

// Components
import { Menu, MenuItem } from "@/components/menu/menu.component.jsx";

/*
INSTRUCTIONS
  variant           variant of menu (default is leftsettings-centerlogo-rightmenu)
                    others: 
                      leftlogo-rightmenu-rightsettings
                      leftmenu-centerlogo-rightsettings
  headerOption      define if and how header will act
                      0: header will be position static
                      1: header will be fixed and on scroll down dissapear
                      2: header will be fixed
  bgColor           color of background // MUST BE TRANSPARENT IF BACKDROPFILTER
  backdropFilter    backdropfilter apply to btnBg as var
  stylesForHeader   additional styles apply to header container
*/
const Header = ({
  variant = "leftsettings-centerlogo-rightmenu",
  headerOption = 0,
  bgColor = "rgb(from var(--color-background) r g b / 0.5)",
  backdropFilter = "blur(4px)",
  stylesForHeader = {},
}) => {
    const headerRef = useRef();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuRef = useRef();

  useEffect(() => {
    if ([1, 2].includes(headerOption)) {
      const heightOfHeader = headerRef.current.offsetHeight;
      document.body.style.paddingTop = `${heightOfHeader}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (headerOption !== 1) return; // Only apply logic for option 1

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerOption]);

  const renderMenu = (location) => {
    return (
      <Menu
        location={location}
        menuOption={2}
        headerOption={headerOption}
        paddingOfEachLinkBlock="10px 20px"
        headerOriginalBgColor={bgColor}
        ref={menuRef}
      >
        {/* <MenuItem content="‎ TEST ‎">
          <MenuItem content="TEST" hr"/MenuItem>
          <MenuItem content="TEST" href="/test"></MenuItem>
          <MenuItem content="TEST" href="/test"></MenuItem>
        </MenuItem> */}
        {/* <MenuItem content="Portfolio" href="/portfolio" /> */}
        <MenuItem content={"O nás"} href="/o-mne" />
        <MenuItem content={"Služby"} href="/sluzby" />
        <MenuItem content={"Kontakt"} href="/kontakt" />
      </Menu>
    );
  };

  const renderLogo = () => {
    return (
      <Link
        href="/"
        aria-label={"Navigovat na domovskou stránku"}
        onClick={() => {
          menuRef.current?.handleLogoClick();
        }}
      >
        <Logo
          alt={"Logo"}
          id="logo-header"
          aria-label={"Logo"}
        />
      </Link>
    );
  };

  // returns based on variants
  if (variant === "leftsettings-centerlogo-rightmenu") {
    return (
      <header
        id="article-header"
        ref={headerRef}
        className={`${variant} ${
          headerOption === 0
            ? ""
            : headerOption === 1
            ? `fixedOnScrollUp ${isVisible ? "visible" : "hidden"}`
            : headerOption === 2
            ? "fixedAllTime"
            : ""
        }`}
        style={{
          backgroundColor: `${bgColor}`,
          "--localBackdropFilter": `${backdropFilter}`,
          ...stylesForHeader,
        }}
      >
        <div className="header-container-settings"></div>
        <div className="header-container-logo">{renderLogo()}</div>
        <div id="header-container-menu">{renderMenu("right")}</div>
      </header>
    );
  } else if (variant === "leftlogo-rightmenu-rightsettings") {
    return (
      <header
        id="article-header"
        ref={headerRef}
        className={`${variant} ${
          headerOption === 0
            ? ""
            : headerOption === 1
            ? `fixedOnScrollUp ${isVisible ? "visible" : "hidden"}`
            : headerOption === 2
            ? "fixedAllTime"
            : ""
        }`}
        style={{
          backgroundColor: `${bgColor}`,
          "--localBackdropFilter": `${backdropFilter}`,
          ...stylesForHeader,
        }}
      >
        <div className="header-container-logo">{renderLogo()}</div>
        <div id="header-container-menu">{renderMenu("right")}</div>
      </header>
    );
  } else if (variant === "leftmenu-centerlogo-rightsettings") {
    return (
      <header
        id="article-header"
        ref={headerRef}
        className={`${variant} ${
          headerOption === 0
            ? ""
            : headerOption === 1
            ? `fixedOnScrollUp ${isVisible ? "visible" : "hidden"}`
            : headerOption === 2
            ? "fixedAllTime"
            : ""
        }`}
        style={{
          backgroundColor: `${bgColor}`,
          "--localBackdropFilter": `${backdropFilter}`,
          ...stylesForHeader,
        }}
      >
        <div id="header-container-menu">{renderMenu("left")}</div>
        <div className="header-container-logo">{renderLogo()}</div>
        <div className="header-container-settings"></div>
      </header>
    );
  } else {
    return (
      <header
        id="article-header"
        ref={headerRef}
        className={`${variant} ${
          headerOption === 0
            ? ""
            : headerOption === 1
            ? `fixedOnScrollUp ${isVisible ? "visible" : "hidden"}`
            : headerOption === 2
            ? "fixedAllTime"
            : ""
        }`}
        style={{
          backgroundColor: `${bgColor}`,
          "--localBackdropFilter": `${backdropFilter}`,
          ...stylesForHeader,
        }}
      >
        <h1>INVALID variant of HEADER</h1>
      </header>
    );
  }
};

export default Header;
