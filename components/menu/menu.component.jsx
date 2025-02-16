"use client";
// Styles
import styles from "./menu.module.scss";
// Public & Assets

// React/Next Functions
import { Children, cloneElement } from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
// Context & Actions

// Componenets

/*
INSTRUCTIONS
  children                      MenuItem components should be there (If MenuItem have more Menu items, it will create submenu, else it will be Link)
  location                      define if menu is on the left or right side of the header
  menuInLine                    define if menu can be inline (if there is enough space) (default true)
  menuOption                    define if and how menu will act
                                  0: dropdown on click menuIcon (etc. it will make just standard dropdown > this for situation where menu have submenus)
                                  1: fullscreen on click menuIcon
                                  2: fullscreen on click menuIcon with fixed header
  fontSize                      fontSize in px (default set to var(--fontsize-btn))
  fontSizeDropdownFullscreen    fontSize in px for usecase menuOption where is dropdown fullscreen
  fontFamily                    fontFamily (could be like var(--font-primary), if fonts are set in variables) (default set to var(--font-primary))
  paddingOfEachLinkBlock        defines padding of each link block (default set to "10px 10px 5px 10px")
*/

export const Menu = ({
  children,
  location = "left",
  menuInLine = true,
  menuOption = 0,
  headerOption,
  fontSize = "var(--fontsize-btn)",
  fontSizeDropdownFullScreen = "var(--fontsize-h2)",
  fontFamily = "var(--font-primary), sans-serif",
  paddingOfEachLinkBlock = "10px 10px 5px 10px",
  headerOriginalBgColor,
}) => {
  // if menu is dropdown, this state have value if its active or not
  const [activeMenu, setActiveMenu] = useState(false);
  // width of container for left side of header, where should be only menu
  const [widthOfContainer, setWidthOfContainer] = useState(0);
  // width of all links in row (of menu)
  const [widthOfAllLinks, setWidthOfAllLinks] = useState(0);
  // height of one link
  const [heightOfLink, setHeightOfLink] = useState(0);
  // menu will be dropdown (false) or inline (true)
  const [canBeInline, setCanBeInline] = useState(true);
  // height of Header
  const [heightOfHeader, setHeightOfHeader] = useState(0);
  // Addon useState for activateMenu and deactivateMenu
  const [scrollY, setScrollY] = useState(0);
  // ref for menu
  const menuRef = useRef(null);

  /*
  Listener for height of header
  */

  useEffect(() => {
    function getAndSetHeightOfHeader() {
      const headerEl = document.getElementById("article-header");
      if (headerEl) {
        setHeightOfHeader(headerEl.offsetHeight);
      }
    }
    getAndSetHeightOfHeader();
    window.addEventListener("resize", getAndSetHeightOfHeader);
    return () => {
      window.removeEventListener("resize", getAndSetHeightOfHeader);
    };
  }, []);

  /*
  Listener for scroll up (when header is fixed and menuOption is 0, dropdown must be disactivated on scrollUp)
  */

  useEffect(() => {
    if (![1].includes(headerOption) || ![0].includes(menuOption)) return; // Apply logic only if header is fixed and menuOption is 0
    let prevScrollY = window.scrollY; // Store the last known scroll position
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // Get the current scroll position
      if (currentScrollY >= prevScrollY) {
        // Scrolling down
        closeMenuFunction()
      }
      prevScrollY = currentScrollY; // Update last known scroll position
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerOption, menuOption]);

  /*
  HANDLE CLICK OUTSIDE + LISTENER
  */

  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // func to handle click outside of menu and all child - if menu active, close it
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      if (menuRef.current.getElementsByClassName(styles.active)) {
        // List must contains option from menuOption where is fullscreen on click menuIcon and also on that state is some visible content that is not part of menu component
        if (![2].includes(menuOption)) {
          closeMenuFunction();
        }
      }
    }
  };

  /*
  HANDLE CAN BE INLINE ?
  */

  // update state widthOfContainer
  const updateWidthOfContainer = () => {
    try {
      const newWidth = document.getElementById(
        "header-container-menu"
      ).offsetWidth;
      setWidthOfContainer(newWidth);
    } catch (error) {}
  };
  // update state widthOfAllLinks
  const updateSizeOfLinks = () => {
    try {
      const listOfWidths = [];
      const listOfHeights = [];
      // find all inline items
      const listOfLinksInline = document.querySelectorAll(
        `#${styles.navInline} .${styles.containerMenuInline} .${styles.menu} > li`
      );
      for (let i = 0; i < listOfLinksInline.length; i++) {
        const width = listOfLinksInline[i].clientWidth;
        const height = listOfLinksInline[i].clientHeight;
        listOfWidths.push(width);
        listOfHeights.push(height);
      }
      if (typeof listOfWidths[0] !== "undefined") {
        const newWidth = listOfWidths.reduce((previousValue, curentValue) => {
          return previousValue + curentValue;
        }, listOfWidths.length * 10);
        const newHeight = Math.max(...listOfHeights);
        setWidthOfAllLinks(newWidth);
        setHeightOfLink(newHeight);
      }
    } catch (error) {}
  };
  // on initial load make listeners for resize that will call both func; updateWidthOfContainer & updateSizeOfLinks
  useEffect(() => {
    if (menuInLine) {
      window.addEventListener("resize", () => {
        updateWidthOfContainer();
        updateSizeOfLinks();
      });
      updateWidthOfContainer();
      updateSizeOfLinks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // if widthOfContainer or widthOfAllLinks change, setCanBeInline to equal value
  useEffect(() => {
    if (widthOfContainer >= widthOfAllLinks && menuInLine) {
      setCanBeInline(true);
    } else {
      setCanBeInline(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthOfContainer, widthOfAllLinks]);

  /*
  HANDLE OPENING AND CLOSING DROPDOWNS
  */

  /* animation of menu icon & if activeMenu state is active, set state of menu
  and all submenus to false (func handleDisactiveMenu),
  if activeMenu state is false then set it to true */
  const handleMenuClick = () => {
    document
      .getElementsByClassName(styles.menuIcon)
      .item(0)
      .classList.toggle(styles.active);
    document
      .getElementsByClassName(styles.line1)
      .item(0)
      .classList.remove(styles.noAnimation);
    document
      .getElementsByClassName(styles.line2)
      .item(0)
      .classList.remove(styles.noAnimation);
    document
      .getElementsByClassName(styles.line3)
      .item(0)
      .classList.remove(styles.noAnimation);
    if (activeMenu === true) {
      deactivateMenu();
      disactiveSubmenus();
    } else {
      activateMenu();
    }
  };

  // Function that close menu dropdown and submenus dropdowns
  const closeMenuFunction = () => {
    document
      .getElementsByClassName(styles.menuIcon)
      .item(0)
      .classList.remove(styles.active);
    deactivateMenu();
    disactiveSubmenus();
  };

  // Function that open menu ** ONLY FOR OPEN WHEN OPENING SUBMENU WITHOUT MENU BEING OPEN)
  const openMenuFunction = () => {
    if (!activeMenu) {
      document
        .getElementsByClassName(styles.line1)
        .item(0)
        .classList.remove(styles.noAnimation);
      document
        .getElementsByClassName(styles.line2)
        .item(0)
        .classList.remove(styles.noAnimation);
      document
        .getElementsByClassName(styles.line3)
        .item(0)
        .classList.remove(styles.noAnimation);
      document
        .getElementsByClassName(styles.menuIcon)
        .item(0)
        .classList.add(styles.active);
      activateMenu();
    }
  };

  // If menu change to hamburger menu or oposite way, remove active submenu
  useEffect(() => {
    disactiveSubmenus();
  }, [canBeInline]);

  // Disactive active submenu
  const disactiveSubmenus = () => {
    const listOfSubmenus = document.getElementsByClassName(
      styles.submenuDropdown
    );
    for (let i = 0; i < listOfSubmenus.length; i++) {
      const element = listOfSubmenus[i];
      element.classList.remove(styles.active);
    }
  };

  // Function for set active state of menu and more based on menuOption (for fullscreen option sets other styles to other elements)
  const activateMenu = () => {
    setActiveMenu(true);
    if ([1, 2].includes(menuOption)) {
      if ([0].includes(headerOption)) {
        setScrollY(window.scrollY);
        document.body.style.position = "fixed";
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = "100%";
      } else {
        document.body.style.overflow = "hidden";
      }
    }
    if ([2].includes(menuOption)) {
      const header = document.getElementById("article-header");
      if (header) {
        header.style.backgroundColor = "var(--color-background)";
      }
    }
  };

  // Function for set NOTactive state of menu and more based on menuOption (for fullscreen option sets other styles to other elements)
  const deactivateMenu = () => {
    setActiveMenu(false);
    if ([1, 2].includes(menuOption)) {
      if ([0].includes(headerOption)) {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      } else {
        document.body.style.overflow = "";
      }
    }
    if ([2].includes(menuOption)) {
      const header = document.getElementById("article-header");
      if (header) {
        header.style.backgroundColor = headerOriginalBgColor;
      }
    }
  };

  /* 
  canBeInline make everything suitable for both inline & dropdown options
  all submenu (ul) are generated inside of item (li) after text
  there are three types of onClick interactions (target another page, target id at actual page, dropdown submenu)
  */
  return (
    <nav
      id={`${canBeInline ? styles.navInline : styles.navDropdown}`}
      className={`${
        location === "right" ? styles.sideRight : styles.sideLeft
      } ${
        menuOption === 0
          ? styles.dropdownDefault
          : menuOption === 1
          ? styles.dropdownFullscreen
          : menuOption === 2
          ? styles.dropdownFullscreenWithHeader
          : ""
      }`}
      style={{ fontFamily: `${fontFamily}` }}
      ref={menuRef}
    >
      <div
        className={styles.menuIcon}
        style={{ display: `${canBeInline ? "none" : "block"}` }}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <div className={`${styles.line1} ${styles.noAnimation}`}></div>
        <div className={`${styles.line2} ${styles.noAnimation}`}></div>
        <div className={`${styles.line3} ${styles.noAnimation}`}></div>
      </div>
      <div
        className={`${
          canBeInline
            ? styles.containerMenuInline
            : styles.containerMenuDropdown
        } ${activeMenu === true ? styles.active : ""}`}
        style={{
          paddingTop: `${
            !canBeInline && [1].includes(menuOption)
              ? heightOfHeader + "px"
              : !canBeInline && [2].includes(menuOption)
              ? "0px"
              : "5px"
          }`,
          marginTop: `${
            !canBeInline && [2].includes(menuOption)
              ? heightOfHeader + "px"
              : "0px"
          }`,
        }}
      >
        <ul className={`${styles.menu}`}>
          {Children.map(children, (child) => {
            return cloneElement(child, {
              fontSize:
                [1, 2].includes(menuOption) && !canBeInline
                  ? fontSizeDropdownFullScreen
                  : fontSize,
              paddingOfEachLinkBlock: paddingOfEachLinkBlock,
              closeMenuFunction: closeMenuFunction,
              openMenuFunction: openMenuFunction,
            });
          })}
          {/* {!canBeInline && [1, 2].includes(menuOption) && (
            <div>
                DALSI VECI
            </div>
          )} */}
        </ul>
      </div>
    </nav>
  );
};

/*
INSTRUCTIONS
  children                  MenuItem components should be there (If MenuItem have more Menu items, it will create submenu, else it will be Link)
  content                   Text for MenuItem (Adjust spaces with this ‎)
  href                      Href, if MenuItem has more children dont use href in params, just content
  \/\/\/ These props are taken from Menu component (dont decalre in MenuItem) \/\/\/
  fontSize                  fontSize of text (default var(--fontsize-btn))
  paddingOfEachLinkBlock    defines padding of each link block (default set to "10px 10px 5px 10px")
*/
export const MenuItem = ({
  children,
  content,
  href,
  fontSize,
  paddingOfEachLinkBlock,
  closeMenuFunction,
  openMenuFunction,
}) => {
  const handleSubmenuClick = (e) => {
    const listOfSubmenus = document.getElementsByClassName(
      styles.submenuDropdown
    );
    const activeSubmenu = [];
    const targetSubmenu = e.target.querySelector(`.${styles.submenuDropdown}`);
    for (let i = 0; i < listOfSubmenus.length; i++) {
      const element = listOfSubmenus[i];
      if (element.classList.contains(styles.active)) {
        activeSubmenu.push(element);
      }
      element.classList.remove(styles.active);
    }
    if (activeSubmenu[0] !== targetSubmenu && targetSubmenu) {
      targetSubmenu.classList.add(styles.active);
      openMenuFunction();
    }
  };
  return (
    <li>
      {href ? (
        <Link
          className={styles.itemLinkElement}
          href={href}
          style={{ padding: paddingOfEachLinkBlock, fontSize: fontSize }}
          onClick={closeMenuFunction}
        >
          {content}
        </Link>
      ) : (
        <span
          className={styles.itemLinkElement}
          onClick={(e) => {
            handleSubmenuClick(e);
          }}
          style={{ padding: paddingOfEachLinkBlock, fontSize: fontSize }}
        >
          {content}
          <ul className={`${styles.submenuDropdown}`}>
            {Children.map(children, (child) => {
              return cloneElement(child, {
                fontSize: fontSize,
                paddingOfEachLinkBlock: paddingOfEachLinkBlock,
                closeMenuFunction: closeMenuFunction,
              });
            })}
          </ul>
        </span>
      )}
    </li>
  );
};
