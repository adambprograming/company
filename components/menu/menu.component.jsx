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
  children                MenuItem components should be there (If MenuItem have more Menu items, it will create submenu, else it will be Link)
  location                define if menu is on the left or right side of the header
  menuInLine              define if menu can be inline (if there is eneugh space) (default true)
  fontSize                fontSize in px for mobile (it will be * by multiplier for desktop) (default set to var(--fontsize-btn))
  fontFamily              fontFamily (could be like var(--font-primary), if fonts are set in variables) (default set to var(--font-primary))
  paddingOfEachLinkBlock  defines padding of each link block (default set to "10px 10px 5px 10px")
*/

export const Menu = ({
  children,
  location = "left",
  menuInLine = true,
  fontSize = "var(--fontsize-btn)",
  fontFamily = "var(--font-primary), sans-serif",
  paddingOfEachLinkBlock = "10px 10px 5px 10px",
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
  // ref for menu
  const menuRef = useRef(null)
  // func to handle click outside of menu and all child - if menu active, close it
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      if (menuRef.current.getElementsByClassName(styles.active)) {
        closeMenuFunction()
      }
    }
  };
  // Listener for mouseClick
  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        `#${styles.navInline} .${styles.menuInline} > li`
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
    } catch (error) {
      
    }
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
      setActiveMenu(false);
      disactiveSubmenus();
    } else {
      setActiveMenu(true);
    }
  };
  const closeMenuFunction = () => {
    document
      .getElementsByClassName(styles.menuIcon)
      .item(0)
      .classList.remove(styles.active);
    setActiveMenu(false);
    disactiveSubmenus();
  };
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
      setActiveMenu(true);
    }
  };
  // If menu change to hamburger menu or oposite way, remove active submenu
  useEffect(() => {
    disactiveSubmenus();
  }, [canBeInline]);
  // Disactive active submenu
  const disactiveSubmenus = () => {
    const listOfSubmenus = document.getElementsByClassName(styles.submenuDropdown);
    for (let i = 0; i < listOfSubmenus.length; i++) {
      const element = listOfSubmenus[i];
      element.classList.remove(styles.active);
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
      className={`${location === "right" ? styles.sideRight : styles.sideLeft}`}
      style={{ fontFamily: `${fontFamily}`}}
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
      <ul
        className={`${canBeInline ? styles.menuInline : styles.menuDropdown} ${
          activeMenu === true ? styles.active : ""
        }`}
      >
        {Children.map(children, (child) => {
          return cloneElement(child, {
            fontSize: fontSize,
            paddingOfEachLinkBlock: paddingOfEachLinkBlock,
            closeMenuFunction: closeMenuFunction,
            openMenuFunction: openMenuFunction,
          });
        })}
      </ul>
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
    const listOfSubmenus = document.getElementsByClassName(styles.submenuDropdown);
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
      openMenuFunction()
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
