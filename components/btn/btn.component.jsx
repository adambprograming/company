"use client";
// Styles
import styles from "./btn.module.scss";
// React Functions
import Link from "next/link";

/*
INSTRUCTIONS 
  disabled              (*)defines if button is disabled (default false)
  itsScroll             (*)if link should be just on page (scroll)
  href                  (*)link or id of element to scroll to
  ariaLabel             (*)label for link
  functionOnClick       (*)function that happend onClick
  fontSize              (*)fontSize in px (* multiplier)
  fontFamily            (*)fontFamily (could be like var(--font-primary), if fonts are set in variables)
  borderRadius          (*)borderRadius (default set to 0px)
  borderHoverRadius     (6)its new radius of btn
  borderSize            (*)size of border (default set to 1px)
  borderColor           (*)color of border
  bgColor               (*)color of background
  textColor             (*)color of text
  opacity               (*)opacity of button background (default set to 1.0)
  paddingOfBtn          (*)padding will be aplied if fontSize is not defined
  width                 (*)width of element
  display               (*)display of content
  backdropFilter        (*)backdropfilter apply to btnBg as var
  filter                (*)filter apply to btn as var
  bgHoverColor          (*)background hover color
  bgHoverBorderRadius   (2,3,4,5)border radius for hovering bg (::before)
  textHoverColor        (*)text hover color
  hoverEffect           (*)hover effect (choose from preset of effects)
                          1: bgHover (transition of bgHoverColor)
                          2: cfLeft (color fill left) (slide bgHoverColorFrom left with changing textHoverColor (if declared))
                          3: cfRight (color fill right) (slide bgHoverColorFrom right with changing textHoverColor (if declared))
                          4: cfBottom (color fill bottom) (slide bgHoverColorFrom bottom with changing textHoverColor (if declared))
                          5: cfTop (color fill top) (slide bgHoverColorFrom top with changing textHoverColor (if declared))
                          6: brc (border radius change) (border radius of btn change to borderHoverRadius)
                          7: scaleForward (scale forward) (Btn will scale forward little bit (1.15))
                          8: scaleBackward (scale backward) (Btn will scale backward little bit (1.15))
*/

const Btn = ({
  children,
  disabled = false,
  itsScroll = false,
  href = "",
  ariaLabel = `${children}`,
  functionOnClick,
  fontSize = "var(--fontsize-btn)",
  fontFamily = "var(--font-primary)",
  fontWeight = "",
  borderRadius = "var(--border-radius-btn)",
  borderHoverRadius = "",
  borderSize = "1px",
  borderColor = "var(--color-border)",
  textColor = "var(--color-text)",
  textHoverColor = "",
  bgColor = "transparent",
  bgHoverColor = "",
  opacity = 1,
  paddingOfBtn = "10px 20px",
  width = "fit-content",
  display = "",
  backdropFilter = "",
  filter = "",
  bgHoverBorderRadius = "",
  hoverEffect = "",
}) => {
  const itsLinkBtn = href && !functionOnClick ? true : false;
  return (
    <button
      className={`${styles.btn} ${!disabled && styles[hoverEffect]}`}
      disabled={disabled}
      aria-label={`${ariaLabel}`}
      style={{
        borderRadius: `${borderRadius}`,
        "--localBorderHoverRadius": `${borderHoverRadius}`,
        border: `${borderSize} solid ${borderColor}`,
        width: `${width}`,
        "--localFilter": `${filter}`,
        cursor: `${disabled ? "default" : "pointer"}`
      }}
      onClick={() => {
        itsLinkBtn
          ? itsScroll &&
            document
              .getElementById(`${href}`)
              .scrollIntoView({ behavior: "smooth" })
          : functionOnClick();
      }}
    >
      <span
        className={`${styles.btnBg}`}
        style={{
          "--localBgColor": `${bgColor}`,
          opacity: `${opacity}`,
          "--localBackdropFilter": `${backdropFilter}`,
          "--localBgHoverColor": `${bgHoverColor}`,
          "--localBgHoverBorderRadius": `${bgHoverBorderRadius}`,
        }}
      ></span>
      {itsLinkBtn && !itsScroll && (
        <Link
          className={`${styles.btnLink}`}
          href={href}
          aria-label={`${ariaLabel}`}
        ></Link>
      )}
      <span
        className={`${styles.btnText}`}
        style={{
          "--localTextColor": `${textColor}`,
          "--localTextHoverColor": `${
            textHoverColor ? textHoverColor : textColor
          }`,
          fontSize: `${fontSize}`,
          fontFamily: `${fontFamily}`,
          fontWeight: `${fontWeight}`,
          padding: `${paddingOfBtn}`,
          display: `${display}`,
        }}
      >
        {children}
      </span>
    </button>
  );
};

export default Btn;
