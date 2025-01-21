"use client";
// Styles
import styles from "./input-floatinglabel.module.scss";
// Public & Assets

// React/Next Functions
import { useState, useEffect } from "react";
// Context & Actions

// Componenets

/*
INSTRUCTIONS
  disabled          defines if button is disabled (default false)
  label             content of label
  name              name and id of Input and htmlFor in label
  type              type of Input
  value             value of Input
  reference         reference using useRef
  functionOnChange  functionOnChange
  functionOnBlur    functionOnBlur
  functionOnKeyDown functionOnKeyDown
  fontSize          fontSize in px (* multiplier)
  fontFamily        fontFamily (could be like var(--font-primary), if fonts are set in variables)
  borderRadius      borderRadius (default set to 0px)
  borderSize        size of border (default set to 1px)
  borderColor       color of border
  bgColor           background color of input
  paddingOfBtn      padding will be aplied if fontSize is not defined
  width             width of element
*/

const InputFloatingLabel = ({
  disabled = false,
  label,
  name,
  type = "text",
  value,
  reference,
  functionOnChange,
  functionOnBlur,
  functionOnKeyDown,
  fontSize = "var(--fontsize-input)",
  fontFamily = "var(--font-secondary)",
  borderRadius = "0px",
  borderSize = "1px",
  borderColor = "var(--black-100)",
  bgColor = "var(--color-text-reverse)",
  paddingOfBtn = "10px 20px",
  width,
}) => {
  const [isActive, setIsActive] = useState(false);
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(value !== "" && value !== null && value !== undefined);
    functionOnBlur;
  };

  useEffect(() => {
    setIsActive(value !== "" && value !== null && value !== undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  
  return (
    <fieldset
      className={styles.inputFloatinglabel}
    >
      <label
        htmlFor={name}
        style={{
          fontSize: `${fontSize}`,
          fontFamily: `${fontFamily}`,
          padding: `${paddingOfBtn}`,
        }}
        className={isActive ? `${styles.active}` : ""}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        ref={reference}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={functionOnChange}
        onKeyDown={functionOnKeyDown}
        style={{
          fontSize: `${fontSize}`,
          borderRadius: `${borderRadius}`,
          fontFamily: `${fontFamily}`,
          width: `${width}`,
          border: `${borderSize} solid ${borderColor}`,
          padding: `${paddingOfBtn}`,
          backgroundColor: `${bgColor}`,
        }}
      >
      </input>
    </fieldset>
  );
};

export default InputFloatingLabel;
