"use client";
// Styles
import styles from "./select-floatinglabel.module.scss";
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
  options           options of select { label: "USA", value: "USA" }
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
  bgColor           background color of select
  paddingOfBtn      padding will be aplied if fontSize is not defined
  width             width of element
*/

const SelectFloatingLabel = ({
  disabled = false,
  label,
  name,
  options = [],
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
      className={styles.selectFloatinglabel}
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
      <select
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
        <option hidden value=""></option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectFloatingLabel;
