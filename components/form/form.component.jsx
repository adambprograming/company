"use client";
// Styles
import styles from "./form.module.scss";
// Public & Assets
import IconInfoCircle from "../svgs/icon-info-circle.component";
import IconDropdownCircle from "@/components/svgs/icon-dropdown-circle.component";
// React/Next Functions
import { Children, cloneElement, useState, useEffect, useRef } from "react";
// Context & Actions

// Componenets

/*
FORM
#F0F
*/

/*
INSTRUCTIONS
  children                                        Child element
  onSubmit                                        what should happen on submit
  initialValues                                   initial values (if set, use them)
  styleOfLabels                                   can contain floating, above or none (defines style of labels across form) (floating cant handle selects)
  width                                           style attr for width of whole form element
  padding                                         style attr for padding of whole form element
  bgColor                                         style attr for background-color for whole form element
  borderRadius                                    style attr for border-radius of whole form element
  borderSize                                      style attr for border-size of whole form element
  borderColor                                     style attr for border-color of whole form element
*/

export const Form = ({
  children,
  onSubmit,
  initialValues = {},
  styleOfLabels = "above",
  width = "100%",
  padding = "0px",
  bgColor = "transparent",
  borderRadius = "5px",
  borderSize = "0px",
  borderColor = "var(--color-border)",
  // LABELS
  fontFamilyOfLabels = "var(--font-primary)",
  fontSizeOfLabels = "var(--fontsize-small)",
  fontWeightOfLabels = "400",
  textColorOfLabels = "var(--shadow-75)",
  paddingOfLabels = "5px 10px",
  bgColorOfLabels = "var(--color-background)",
  borderRadiusOfLabels = "5px",
  // CONTAINERS - INPUTS + TEXTAREAS + SELECTS + MULTISELECTS + MULTICHECKBOXS
  paddingOfContainers = "10px 20px",
  bgColorOfContainer = "var(--color-background)",
  borderRadiusOfContainers = "5px",
  borderSizeOfContainers = "1px",
  borderColorOfContainers = "var(--color-border)",
  boxShadowOnFocusOfContainers = "0 0 5px var(--color-boxshadow)",
  boxShadowOnFocusOfDropdowns = "0 0 2.5px var(--color-boxshadow)",
  // BTNS - SUBMIT + PICKER OPTIONS
  fontFamilyOfBtns = "var(--font-secondary)", // SUBMIT + PICKER OPTION
  fontSizeOfBtns = "var(--fontsize-small)", // SUBMIT + PICKER OPTION
  fontWeightOfBtns = "400", // SUBMIT + PICKER OPTION
  textColorOfSubmit = "var(--color-text-reverse)", // SUBMIT
  textColorOnHoverOfSubmit = "var(--color-text)", // SUBMIT
  textColorOfPicker = "var(--color-text)", // PICKER
  textColorOnHoverOfPicker = "var(--color-text)", // PICKER
  textColorOnPickedOfPicker = "var(--color-text-reverse)", // PICKER
  paddingOfBtns = "10px 20px", // SUBMIT + PICKER OPTION
  bgColorOfSubmit = "var(--color-primary)", // SUBMIT
  bgColorOnHoverOfSubmit = "var(--color-ascent)", // SUBMIT
  bgColorOfPicker = "var(--color-background)", // PICKER
  bgColorOnHoverOfPicker = "var(--shadow-15)", // PICKER
  bgColorOnPickedOfPicker = "var(--color-primary)", // PICKER
  borderRadiusOfBtns = "5px", // SUBMIT + PICKER OPTION
  borderSizeOfBtns = "0px", // SUBMIT + PICKER OPTION
  borderColorOfBtns = "var(--color-border)", // SUBMIT + PICKER OPTION
  // VALUES - filled or selected values
  fontFamilyOfValues = "var(--font-secondary)",
  fontSizeOfValues = "var(--fontsize-small)",
  fontWeightOfValues = "400",
  textColorOfValues = "var(--color-text)",
  paddingOfValues = "10px 20px",
  bgColorOfValues = "var(--shadow-5)",
  bgColorOnHoverOfValues = "var(--shadow-10)",
  // PLACEHOLDERS
  fontFamilyOfPlaceholders = "var(--font-secondary)",
  fontSizeOfPlaceholders = "var(--fontsize-smaller)",
  fontWeightOfPlaceholders = "400",
  textColorOfPlaceholders = "rgb(from var(--color-text) r g b / 0.5)",
  // UNSELECTED VALUES
  textColorOfUnselected = "rgb(from var(--color-text) r g b / 0.5)",
  // SELECTED VALUES
  textColorOfSelected = "var(--color-text)",
  bgColorOfSelected = "rgb(from var(--color-success) r g b / 0.15)",
}) => {
  const formRef = useRef();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (formRef.current) {
      // Populate form fields with initial values
      Object.entries(initialValues).forEach(([key, value]) => {
        const input = formRef.current.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = value;
        }
      });
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent multiple submissions within a short time interval
    if (submitting) return;
    setSubmitting(true);

    const allFieldsetEls = [
      ...document.getElementsByClassName(`${styles.formFieldset}`),
    ];

    allFieldsetEls.forEach((fieldset) => {
      const input = fieldset.querySelector("input"); // Get the input element
      if (input) {
        input.focus();
        input.blur();
      }
    });

    setTimeout(() => {
      const hasNotValidClass =
        allFieldsetEls.filter((fieldset) =>
          fieldset.classList.contains(`${styles.notValid}`)
        ).length > 0;

      if (hasNotValidClass) {
        const firstInvalidFieldset = allFieldsetEls.find((fieldset) =>
          fieldset.classList.contains(`${styles.notValid}`)
        );

        if (firstInvalidFieldset) {
          const firstInput = firstInvalidFieldset.querySelector("input");
          if (firstInput) {
            firstInput.focus();
            firstInput.select();
          }
        }
      } else {
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        onSubmit(data);
      }

      // Reset the submitting state after 1 second (1000 ms)
      setTimeout(() => setSubmitting(false), 1000);
    }, 0);
  };

  return (
    <form
      className={`${styles.form}`}
      style={{
        width: `${width}`,
        padding: `${padding}`,
        backgroundColor: `${bgColor}`,
        borderRadius: `${borderRadius}`,
        border: `${borderSize} solid ${borderColor}`,
        // LABELS
        "--localFontFamilyOfLabels": `${fontFamilyOfLabels}`,
        "--localFontSizeOfLabels": `${fontSizeOfLabels}`,
        "--localFontWeightOfLabels": `${fontWeightOfLabels}`,
        "--localTextColorOfLabels": `${textColorOfLabels}`,
        "--localPaddingOfLabels": `${paddingOfLabels}`,
        "--localBgColorOfLabels": `${bgColorOfLabels}`,
        "--localBorderRadiusOfLabels": `${borderRadiusOfLabels}`,
        // CONTAINERS
        "--localPaddingOfContainers": `${paddingOfContainers}`,
        "--localBgColorOfContainers": `${bgColorOfContainer}`,
        "--localBorderRadiusOfContainers": `${borderRadiusOfContainers}`,
        "--localBorderSizeOfContainers": `${borderSizeOfContainers}`,
        "--localBorderColorOfContainers": `${borderColorOfContainers}`,
        "--localBoxShadowOnFocusOfContainers": `${boxShadowOnFocusOfContainers}`,
        "--localBoxShadowOnFocusOfDropdowns": `${boxShadowOnFocusOfDropdowns}`,
        // BTNS
        "--localFontFamilyOfBtns": `${fontFamilyOfBtns}`,
        "--localFontSizeOfBtns": `${fontSizeOfBtns}`,
        "--localFontWeightOfBtns": `${fontWeightOfBtns}`,
        "--localTextColorOfSubmit": `${textColorOfSubmit}`,
        "--localTextColorOnHoverOfSubmit": `${textColorOnHoverOfSubmit}`,
        "--localTextColorOfPicker": `${textColorOfPicker}`,
        "--localTextColorOnHoverOfPicker": `${textColorOnHoverOfPicker}`,
        "--localTextColorOnPickedOfPicker": `${textColorOnPickedOfPicker}`,
        "--localPaddingOfBtns": `${paddingOfBtns}`,
        "--localBgColorOfSubmit": `${bgColorOfSubmit}`,
        "--localBgColorOnHoverOfSubmit": `${bgColorOnHoverOfSubmit}`,
        "--localBgColorOfPicker": `${bgColorOfPicker}`,
        "--localBgColorOnHoverOfPicker": `${bgColorOnHoverOfPicker}`,
        "--localBgColorOnPickedOfPicker": `${bgColorOnPickedOfPicker}`,
        "--localBorderRadiusOfBtns": `${borderRadiusOfBtns}`,
        "--localBorderSizeOfBtns": `${borderSizeOfBtns}`,
        "--localBorderColorOfBtns": `${borderColorOfBtns}`,
        // VALUES
        "--localFontFamilyOfValues": `${fontFamilyOfValues}`,
        "--localFontSizeOfValues": `${fontSizeOfValues}`,
        "--localFontWeightOfValues": `${fontWeightOfValues}`,
        "--localTextColorOfValues": `${textColorOfValues}`,
        "--localPaddingOfValues": `${paddingOfValues}`,
        "--localBgColorOfValues": `${bgColorOfValues}`,
        "--localBgColorOnHoverOfValues": `${bgColorOnHoverOfValues}`,
        // PLACEHOLDERS
        "--localFontFamilyOfPlaceholders": `${fontFamilyOfPlaceholders}`,
        "--localFontSizeOfPlaceholders": `${fontSizeOfPlaceholders}`,
        "--localFontWeightOfPlaceholders": `${fontWeightOfPlaceholders}`,
        "--localTextColorOfPlaceholders": `${textColorOfPlaceholders}`,
        // UNSELECTED VALUES
        "--localTextColorOfUnselected": `${textColorOfUnselected}`,
        // SELECTED VALUES
        "--localTextColorOfSelected": `${textColorOfSelected}`,
        "--localBgColorOfSelected": `${bgColorOfSelected}`,
      }}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate={true}
    >
      {Children.map(children, (child) => {
        try {
          return cloneElement(child, {
            styleOfLabels: styleOfLabels,
          });
        } catch (error) {}
      })}
    </form>
  );
};

/*
TITLE
#F0F
*/

/*
INSTRUCTIONS
  children                    Child element
  css                         styles (can set all css here), exemple - css={{backgroundColor: "red"}}
*/

export const FormTitle = ({ children, css }) => {
  return (
    <h2
      className={`${styles.formTitle}`}
      style={{
        ...css,
      }}
    >
      {children}
    </h2>
  );
};

/*
SPAN
#F0F
*/

/*
INSTRUCTIONS
  children                    Child element
  css                         styles (can set all css here), exemple - css={{backgroundColor: "red"}}
*/

export const FormSpan = ({ children, css }) => {
  return (
    <h2
      className={`${styles.formSpan}`}
      style={{
        ...css,
      }}
    >
      {children}
    </h2>
  );
};

/*
ROW
Should be used if more items should be in one row
#F0F
*/

export const FormRow = ({ children, styleOfLabels }) => {
  return (
    <div className={`${styles.formRow}`}>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          styleOfLabels: styleOfLabels,
        });
      })}
    </div>
  );
};

/*
BTN Submit
Final submit button 
#F0F
*/

/*
INSTRUCTIONS
  ariaLabel             (*)ariaLabel is for button element
  fontSize              (*)fontSize in px (* multiplier)
  fontFamily            (*)fontFamily (could be like var(--font-primary), if fonts are set in variables)
  borderRadius          (*)borderRadius (default set to 0px)
  borderHoverRadius     (6)its new radius of btn
  borderSize            (*)size of border (default set to 1px)
  borderColor           (*)color of border
  bgColor               (*)color of background
  textColor             (*)color of text
  opacity               (*)opacity of button background (default set to 1.0)
  padding               (*)padding will be aplied if fontSize is not defined
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

export const FormBtnSubmit = ({
  children = "Odeslat",
  ariaLabel = "",
  fontSize = "",
  fontWeight = "500",
  textColor = "",
  padding = "",
  borderRadius = "",
  borderSize = "",
  borderColor = "",
  fontFamily = "",
  bgColor = "",
  textHoverColor = "",
  borderHoverRadius = "",
  bgHoverBorderRadius = "",
  bgHoverColor = "",
  opacity = 1,
  width = "",
  backdropFilter = "",
  filter = "",
  hoverEffect = "bgHover",
}) => {
  return (
    <button
      className={`${styles.formBtnSubmit} ${styles[hoverEffect]}`}
      type="submit"
      style={{
        "--localBorderHoverRadius": `${borderHoverRadius}`,
        "--localBorderRadiusOfBtns": `${borderRadius}`,
        "--localBorderSizeOfBtns": `${borderSize}`,
        "--localBorderColorOfBtns": `${borderColor}`,
        width: `${width}`,
        "--localFilter": `${filter}`,
      }}
      aria-label={`${ariaLabel}`}
    >
      <span
        className={`${styles.btnBg}`}
        style={{
          "--localBgColorOfSubmit": `${bgColor}`,
          opacity: `${opacity}`,
          "--localBackdropFilter": `${backdropFilter}`,
          "--localBgColorOnHoverOfSubmit": `${bgHoverColor}`,
          "--localBgHoverBorderRadius": `${bgHoverBorderRadius}`,
        }}
      ></span>
      <span
        className={`${styles.btnText}`}
        style={{
          "--localFontFamilyOfBtns": `${fontFamily}`,
          "--localFontSizeOfBtns": `${fontSize}`,
          "--localFontWeightOfBtns": `${fontWeight}`,
          "--localPaddingOfBtns": `${padding}`,
          "--localTextColorOfSubmit": `${textColor}`,
          "--localTextColorOnHoverOfSubmit": `${textHoverColor}`,
        }}
      >
        {children}
      </span>
    </button>
  );
};

/*
INPUT Input (Universal - can be used multiple times in one form with different tag)
#F0F
*/

/*
EXEMPLES
  <FormInput
    tag="name"
    label="Jméno:"
    placeholder="Uveďte Vaše jméno"
    validationPattern={/^[a-zA-ZěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ\s'-]{2,30}$/}
    maxLength={30}
    hintText="Jméno musí obsahovat 2 až 30 znaků a může obsahovat pouze písmena, mezery a pomlčky."
    isRequired={true}
  />
  <FormInput
    tag="surname"
    label="Příjmení:"
    placeholder="Uveďte Vaše příjmení"
    validationPattern={/^[a-zA-ZěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ\s'-]{2,35}$/}
    maxLength={35}
    hintText="Příjmení musí obsahovat 2 až 35 znaků a může obsahovat pouze písmena, mezery a pomlčky."
    isRequired={true}
  />
  <FormInput
    tag="phone"
    label="Telefonní číslo:"
    placeholder="Uveďte Vaše telefonní číslo"
    validationPattern={/^\+?[0-9]{7,15}$/}
    maxLength={15}
    hintText="Telefonní číslo musí obsahovat 7 až 15 číslic."
    isRequired={true}
  />
  <FormInput
    tag="email"
    label="E-mail:"
    placeholder="Uveďte Váš e-mail"
    validationPattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,320}$/}
    maxLength={320}
    hintText="Zadejte platnou e-mailovou adresu ve formátu např. uzivatel@email.com."
    isRequired={true}
  />
  <FormInput
    tag="age"
    label="Věk:"
    placeholder="Uveďte Váš věk"
    validationPattern={/^[0-9]{1,3}$/}
    maxLength={3}
    hintText="Věk musí obsahovat 1 až 3 znaky a může obsahovat pouze čísla."
  />
*/

/*
INSTRUCTIONS
  tag                                     *REQUIRED - its for htmlFor and name of input to make it original (cant be two inputs with same name in form)
  validationPattern                       pattern for validation, must be in regex format (/^[a-zA-Z0-9ěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ+\-.,=]{1,30}$/)
  maxLength                               maxLength for input (default 100)
  label                                   fill either label or placeholder
  placeholder                             fill either label or placeholder
  isRequired                              true if required field (can't submit without this field filled)
  isRequiredStar                          if true, show red start next to label (default true)
  isDisabled                              true if input is disabled
  functionOnChange                        function that proceed onChange
  functionOnBlur                          function that proceed onBlur
  functionOnFocus                         function that proceed onFocus
  functionOnKeyDown                       function that proceed onKeyDown
  minWidth                                minWidth of fieldset element (default to 200px) - if space, it take full width
  flex                                    flex of fieldset (default is "1 1 25%" - if two in same row with this default, it will be 50/50 until wrapped bcs of minWidth)
*/

export const FormInput = ({
  tag = "",
  validationPattern,
  maxLength = 100,
  label = "",
  placeholder = "",
  isRequired = false,
  isRequiredStar = true,
  isDisabled,
  functionOnChange,
  functionOnBlur,
  functionOnFocus,
  functionOnKeyDown,
  minWidth = "200px",
  flex = "1 1 25%",
  hintVisibleOnlyOnInvalid = false,
  hintText = "",
  styleOfLabels,
  // LABEL
  fontFamilyOfLabel = "",
  fontSizeOfLabel = "",
  fontWeightOfLabel = "",
  textColorOfLabel = "",
  paddingOfLabel = "",
  bgColorOfLabel = "",
  borderRadiusOfLabel = "",
  // CONTAINER
  paddingOfContainer = "",
  bgColorOfContainer = "",
  borderRadiusOfContainer = "",
  borderSizeOfContainer = "",
  borderColorOfContainer = "",
  boxShadowOnFocusOfContainer = "",
  // VALUE
  fontFamilyOfValues = "",
  fontSizeOfValues = "",
  fontWeightOfValues = "",
  textColorOfValues = "",
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    // setIsActive(value !== "" && value !== null && value !== undefined) && e.target === document.activeElement;
    !isValid && validateInput(e);
    functionOnChange && functionOnChange(e);
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    setIsActive(value !== "" && value !== null && value !== undefined);
    validateInput(e);
    functionOnBlur && functionOnBlur(e);
  };

  const handleFocus = (e) => {
    setIsActive(true);
    functionOnFocus && functionOnFocus(e);
  };

  const handleKeyDown = (e) => {
    functionOnKeyDown && functionOnKeyDown(e);
  };

  const validateInput = (e) => {
    if (isRequired || (!isRequired && e.target.value && validationPattern)) {
      const pattern = validationPattern || /^.+$/;
      const value = e.target.value;
      if (!pattern.test(value)) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      if (!isValid) {
        setIsValid(true);
      }
    }
  };

  return (
    <fieldset
      className={`${styles.formFieldset} ${isValid ? "" : styles.notValid}`}
      style={{
        marginTop: `${styleOfLabels === "floating" ? "1.5rem" : "0"}`,
        minWidth: `${minWidth}`,
        flex: `${flex}`,
      }}
    >
      {label && styleOfLabels !== "none" && (
        <label
          htmlFor={`${tag}`}
          style={{
            "--localFontFamilyOfLabels": `${fontFamilyOfLabel}`,
            "--localFontSizeOfLabels": `${fontSizeOfLabel}`,
            "--localFontWeightOfLabels": `${fontWeightOfLabel}`,
            "--localTextColorOfLabels": `${textColorOfLabel}`,
            "--localPaddingOfLabels": `${paddingOfLabel}`,
            "--localBgColorOfLabels": `${bgColorOfLabel}`,
            "--localBorderRadiusOfLabels": `${borderRadiusOfLabel}`,
          }}
          className={`${styles.formLabel} ${
            isActive ? `${styles.active}` : ""
          } ${styles[styleOfLabels]}`}
        >
          {label}
          {isRequired && isRequiredStar && (
            <span className={`${styles.requiredStar}`}> *</span>
          )}
        </label>
      )}
      <div className={`${styles.inputContainer}`}>
        <input
          type="text"
          name={`${tag}`}
          maxLength={maxLength}
          className={`${styles.formInput}`}
          placeholder={styleOfLabels !== "floating" ? placeholder : ""}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          required={isRequired}
          disabled={isDisabled}
          style={{
            "--localFontFamilyOfValues": `${fontFamilyOfValues}`,
            "--localFontSizeOfValues": `${fontSizeOfValues}`,
            "--localFontWeightOfValues": `${fontWeightOfValues}`,
            "--localTextColorOfValues": `${textColorOfValues}`,
            "--localPaddingOfContainers": `${paddingOfContainer}`,
            "--localBgColorOfContainers": `${bgColorOfContainer}`,
            "--localBorderRadiusOfContainers": `${borderRadiusOfContainer}`,
            "--localBorderSizeOfContainers": `${borderSizeOfContainer}`,
            "--localBorderColorOfContainers": `${borderColorOfContainer}`,
            "--localBoxShadowOnFocusOfContainers": `${boxShadowOnFocusOfContainer}`,
          }}
        ></input>
        {hintText && (hintVisibleOnlyOnInvalid ? !isValid : true) && (
          <>
            <IconInfoCircle className={`${styles.hintIcon}`} />
            <span className={`${styles.hintText}`}>{hintText}</span>
          </>
        )}
      </div>
    </fieldset>
  );
};

/*
INPUT Textarea (Universal - can be used multiple times in one form with different tag)
#F0F
*/

/*
EXEMPLES
    <FormTextarea
      tag="web-inspo"
      label="Máte představu jak mají webové stránky vypadat?"
      placeholder="V případě, že víte, uveďte odkazy na weby které se Vám líbí"
      maxLength={500}
    />
*/

/*
INSTRUCTIONS
  tag                                     *REQUIRED - its for htmlFor and name of textarea to make it original (cant be two textareas with same name in form)
  validationPattern                       pattern for validation, must be in regex format (/^[a-zA-Z0-9ěščřžýáíéúůóďťňĚŠČŘŽÝÁÍÉÚŮÓĎŤŇ+\-.,=]{1,30}$/)
  maxLength                               maxLength for textarea (default 100)
  rows                                    rows for textarea (default 5)
  resize                                  resize can be "none", "vertical", "horizontal"  or "both" (default "vertical")
  label                                   fill either label or placeholder
  placeholder                             fill either label or placeholder
  isRequired                              true if required field (can't submit without this field filled)
  isRequiredStar                          if true, show red start next to label (default true)
  isDisabled                              true if textarea is disabled
  functionOnChange                        function that proceed onChange
  functionOnBlur                          function that proceed onBlur
  functionOnFocus                         function that proceed onFocus
  functionOnKeyDown                       function that proceed onKeyDown
  minWidth                                minWidth of fieldset element (default to 200px) - if space, it take full width
  flex                                    flex of fieldset (default is "1 1 25%" - if two in same row with this default, it will be 50/50 until wrapped bcs of minWidth)
*/

export const FormTextarea = ({
  tag = "",
  validationPattern,
  maxLength = 500,
  rows = 5,
  resize = "vertical",
  label = "",
  placeholder = "",
  isRequired = false,
  isRequiredStar = true,
  isDisabled,
  functionOnChange,
  functionOnBlur,
  functionOnFocus,
  functionOnKeyDown,
  minWidth = "200px",
  flex = "1 1 25%",
  hintVisibleOnlyOnInvalid = false,
  hintText = "",
  styleOfLabels,
  // LABEL
  fontFamilyOfLabel = "",
  fontSizeOfLabel = "",
  fontWeightOfLabel = "",
  textColorOfLabel = "",
  paddingOfLabel = "",
  bgColorOfLabel = "",
  borderRadiusOfLabel = "",
  // CONTAINER
  paddingOfContainer = "",
  bgColorOfContainer = "",
  borderRadiusOfContainer = "",
  borderSizeOfContainer = "",
  borderColorOfContainer = "",
  boxShadowOnFocusOfContainer = "",
  // VALUE
  fontFamilyOfValues = "",
  fontSizeOfValues = "",
  fontWeightOfValues = "",
  textColorOfValues = "",
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    // setIsActive(value !== "" && value !== null && value !== undefined) && e.target === document.activeElement;
    !isValid && validateInput(e);
    functionOnChange && functionOnChange(e);
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    setIsActive(value !== "" && value !== null && value !== undefined);
    validateInput(e);
    functionOnBlur && functionOnBlur(e);
  };

  const handleFocus = (e) => {
    setIsActive(true);
    functionOnFocus && functionOnFocus(e);
  };

  const handleKeyDown = (e) => {
    functionOnKeyDown && functionOnKeyDown(e);
  };

  const validateInput = (e) => {
    if (isRequired || (!isRequired && e.target.value && validationPattern)) {
      const pattern = validationPattern || /^.+$/;
      const value = e.target.value;
      if (!pattern.test(value)) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      if (!isValid) {
        setIsValid(true);
      }
    }
  };

  return (
    <fieldset
      className={`${styles.formFieldset} ${isValid ? "" : styles.notValid}`}
      style={{
        marginTop: `${styleOfLabels === "floating" ? "1.5rem" : "0"}`,
        minWidth: `${minWidth}`,
        flex: `${flex}`,
      }}
    >
      {label && styleOfLabels !== "none" && (
        <label
          htmlFor={`${tag}`}
          style={{
            "--localFontFamilyOfLabels": `${fontFamilyOfLabel}`,
            "--localFontSizeOfLabels": `${fontSizeOfLabel}`,
            "--localFontWeightOfLabels": `${fontWeightOfLabel}`,
            "--localTextColorOfLabels": `${textColorOfLabel}`,
            "--localPaddingOfLabels": `${paddingOfLabel}`,
            "--localBgColorOfLabels": `${bgColorOfLabel}`,
            "--localBorderRadiusOfLabels": `${borderRadiusOfLabel}`,
          }}
          className={`${styles.formLabel} ${
            isActive ? `${styles.active}` : ""
          } ${styles[styleOfLabels]}`}
        >
          {label}
          {isRequired && isRequiredStar && (
            <span className={`${styles.requiredStar}`}> *</span>
          )}
        </label>
      )}
      <div className={`${styles.textAreaContainer}`}>
        <textarea
          name={`${tag}`}
          maxLength={maxLength}
          rows={rows}
          className={`${styles.formTextArea}`}
          placeholder={styleOfLabels !== "floating" ? placeholder : ""}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          required={isRequired}
          disabled={isDisabled}
          style={{
            "--localFontFamilyOfValues": `${fontFamilyOfValues}`,
            "--localFontSizeOfValues": `${fontSizeOfValues}`,
            "--localFontWeightOfValues": `${fontWeightOfValues}`,
            "--localTextColorOfValues": `${textColorOfValues}`,
            "--localPaddingOfContainers": `${paddingOfContainer}`,
            "--localBgColorOfContainers": `${bgColorOfContainer}`,
            "--localBorderRadiusOfContainers": `${borderRadiusOfContainer}`,
            "--localBorderSizeOfContainers": `${borderSizeOfContainer}`,
            "--localBorderColorOfContainers": `${borderColorOfContainer}`,
            "--localBoxShadowOnFocusOfContainers": `${boxShadowOnFocusOfContainer}`,
            resize: `${resize}`,
          }}
        ></textarea>
        {hintText && (hintVisibleOnlyOnInvalid ? !isValid : true) && (
          <>
            <IconInfoCircle className={`${styles.hintIcon}`} />
            <span className={`${styles.hintText}`}>{hintText}</span>
          </>
        )}
      </div>
    </fieldset>
  );
};

/*
INPUT Select (Universal - can be used multiple times in one form with different tag)
#F0F
*/

/*
EXEMPLES

*/

/*
INSTRUCTIONS
  tag                                     *REQUIRED - its for htmlFor and name of select to make it original (cant be two selects with same name in form)
  options                                 *REQUIRED - list of options (["Option 1", "Option 2"])
  defaultOption                           Default option that will be visible on default
  defaultOptionShowInOptions              If true, default option can be picked from dropdown list of option, false means its not visible in list (default false)
  label                                   fill either label or placeholder
  isRequired                              true if required field (can't submit without this field filled)
  isRequiredStar                          if true, show red start next to label (default true)
  isDisabled                              true if select is disabled
  functionOnChange                        function that proceed onChange
  functionOnBlur                          function that proceed onBlur
  functionOnFocus                         function that proceed onFocus
  functionOnKeyDown                       function that proceed onKeyDown
  minWidth                                minWidth of fieldset element (default to 200px) - if space, it take full width
  flex                                    flex of fieldset (default is "1 1 25%" - if two in same row with this default, it will be 50/50 until wrapped bcs of minWidth)
*/

export const FormSelect = ({
  tag = "",
  options = ["Option 1", "Option 2", "Other"],
  defaultOption = "Vyberte",
  defaultOptionShowInOptions = false,
  label = "",
  isRequired = false,
  isRequiredStar = true,
  isDisabled,
  functionOnChange,
  functionOnBlur,
  functionOnFocus,
  functionOnKeyDown,
  minWidth = "200px",
  flex = "1 1 25%",
  hintText = "",
  styleOfLabels,
  // LABEL
  fontFamilyOfLabel = "",
  fontSizeOfLabel = "",
  fontWeightOfLabel = "",
  textColorOfLabel = "",
  paddingOfLabel = "",
  bgColorOfLabel = "",
  borderRadiusOfLabel = "",
  // CONTAINER
  paddingOfContainer = "",
  bgColorOfContainer = "",
  borderRadiusOfContainer = "",
  borderSizeOfContainer = "",
  borderColorOfContainer = "",
  boxShadowOnFocusOfContainer = "",
  boxShadowOnFocusOfDropdown = "",
  // VALUE
  fontFamilyOfValues = "",
  fontSizeOfValues = "",
  fontWeightOfValues = "",
  textColorOfValues = "",
  paddingOfValues = "",
  bgColorOfValues = "",
  bgColorOnHoverOfValues = "",
  // UNSELECTED
  textColorOfUnselected = "",
  // SELECTED VALUES
  textColorOfSelected = "",
  bgColorOfSelected = "",
}) => {
  const [value, setValue] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const selectRef = useRef(null);

  const handleOptionClick = (clickedValue) => {
    if (clickedValue === value) {
      setValue(defaultOption);
    } else {
      setValue(clickedValue);
    }
    functionOnChange && functionOnChange(clickedValue);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleBlur = (e) => {
    if (!selectRef.current.contains(document.activeElement)) {
      setIsOpen(false);
    }
    setIsActive(value !== "" && value !== null && value !== undefined);
    functionOnBlur && functionOnBlur(e);
  };

  const handleFocus = (e) => {
    setIsActive(true);
    functionOnFocus && functionOnFocus(e);
  };

  return (
    <fieldset
      className={styles.formFieldset}
      ref={selectRef}
      style={{
        marginTop: `${styleOfLabels === "floating" ? "1.5rem" : "0"}`,
        minWidth: `${minWidth}`,
        flex: `${flex}`,
      }}
    >
      {label && (
        <label
          htmlFor={`${tag}`}
          style={{
            "--localFontFamilyOfLabels": `${fontFamilyOfLabel}`,
            "--localFontSizeOfLabels": `${fontSizeOfLabel}`,
            "--localFontWeightOfLabels": `${fontWeightOfLabel}`,
            "--localTextColorOfLabels": `${textColorOfLabel}`,
            "--localPaddingOfLabels": `${paddingOfLabel}`,
            "--localBgColorOfLabels": `${bgColorOfLabel}`,
            "--localBorderRadiusOfLabels": `${borderRadiusOfLabel}`,
          }}
          className={`${styles.formLabel} ${
            isActive ? `${styles.active}` : ""
          } ${styles[styleOfLabels]}`}
        >
          {label}
          {isRequired && isRequiredStar && (
            <span className={`${styles.requiredStar}`}> *</span>
          )}
        </label>
      )}
      <div className={`${styles.selectContainer}`}>
        <input type="hidden" name={tag} value={value} />
        <div
          name={`${tag}`}
          className={`${styles.formSelect} ${isOpen ? styles.open : ""}`}
          onClick={() => !isDisabled && setIsOpen((prev) => !prev)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={functionOnKeyDown}
          required={isRequired}
          disabled={isDisabled}
          tabIndex={0}
          role="button"
          style={{
            // CONTAINERS
            "--localPaddingOfContainers": `${paddingOfContainer}`,
            "--localBgColorOfContainers": `${bgColorOfContainer}`,
            "--localBorderRadiusOfContainers": `${borderRadiusOfContainer}`,
            "--localBorderSizeOfContainers": `${borderSizeOfContainer}`,
            "--localBorderColorOfContainers": `${borderColorOfContainer}`,
            "--localBoxShadowOnFocusOfContainers": `${boxShadowOnFocusOfContainer}`,
            "--localBoxShadowOnFocusOfDropdowns": `${boxShadowOnFocusOfDropdown}`,
            // VALUES
            "--localFontFamilyOfValues": `${fontFamilyOfValues}`,
            "--localFontSizeOfValues": `${fontSizeOfValues}`,
            "--localFontWeightOfValues": `${fontWeightOfValues}`,
            "--localTextColorOfValues": `${
              value === defaultOption
                ? textColorOfUnselected
                  ? textColorOfUnselected
                  : "var(--localTextColorOfUnselected)"
                : textColorOfValues
            }`,
            "--localPaddingOfValues": `${paddingOfValues}`,
            "--localBgColorOfValues": `${bgColorOfValues}`,
            "--localBgColorOnHoverOfValues": `${bgColorOnHoverOfValues}`,
            // SELECTED VALUES
            "--localTextColorOfSelected": `${textColorOfSelected}`,
            "--localBgColorOfSelected": `${bgColorOfSelected}`,
          }}
        >
          {value}
          <IconDropdownCircle className={`${styles.dropdownIcon}`} />
        </div>
        {isOpen && (
          <div
            className={styles.optionsList}
            onMouseDown={(e) => e.preventDefault()}
          >
            {defaultOption &&
              defaultOptionShowInOptions &&
              value !== defaultOption && (
                <div
                  key={"default"}
                  className={`${styles.option}`}
                  style={{
                    color: `${
                      textColorOfUnselected
                        ? textColorOfUnselected
                        : "var(--localTextColorOfUnselected)"
                    }`,
                  }}
                  onClick={() =>
                    !isDisabled && handleOptionClick(defaultOption)
                  }
                >
                  {defaultOption}
                </div>
              )}
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  value === option ? styles.selected : ""
                }`}
                onClick={() => !isDisabled && handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        {hintText && (
          <>
            <IconInfoCircle className={`${styles.hintIcon}`} />
            <span className={`${styles.hintText}`}>{hintText}</span>
          </>
        )}
      </div>
    </fieldset>
  );
};

/*
INPUT MultiSelect (Universal - can be used multiple times in one form with different tag)
#F0F
*/

/*
EXEMPLES

*/

/*
INSTRUCTIONS
  tag                                     *REQUIRED - its for htmlFor and name of select to make it original (cant be two selects with same name in form)
  options                                 *REQUIRED - list of options (["Option 1", "Option 2"])
  defaultOption                           Default option that will be visible on default
  defaultOptionShowInOptions              If true, default option can be picked from dropdown list of option, false means its not visible in list (default false)
  label                                   fill either label or placeholder
  isRequired                              true if required field (can't submit without this field filled)
  isRequiredStar                          if true, show red start next to label (default true)
  isDisabled                              true if select is disabled
  functionOnChange                        function that proceed onChange
  functionOnBlur                          function that proceed onBlur
  functionOnFocus                         function that proceed onFocus
  functionOnKeyDown                       function that proceed onKeyDown
  minWidth                                minWidth of fieldset element (default to 200px) - if space, it take full width
  flex                                    flex of fieldset (default is "1 1 25%" - if two in same row with this default, it will be 50/50 until wrapped bcs of minWidth)
*/

export const FormMultiSelect = ({
  tag = "",
  options = ["Option 1", "Option 2", "Other"],
  defaultOption = "Vyberte",
  defaultOptionShowInOptions = false,
  label = "",
  isRequired = false,
  isRequiredStar = true,
  isDisabled,
  functionOnChange,
  functionOnBlur,
  functionOnFocus,
  functionOnKeyDown,
  minWidth = "200px",
  flex = "1 1 25%",
  hintText = "",
  styleOfLabels,
  // LABEL
  fontFamilyOfLabel = "",
  fontSizeOfLabel = "",
  fontWeightOfLabel = "",
  textColorOfLabel = "",
  paddingOfLabel = "",
  bgColorOfLabel = "",
  borderRadiusOfLabel = "",
  // CONTAINER
  paddingOfContainer = "",
  bgColorOfContainer = "",
  borderRadiusOfContainer = "",
  borderSizeOfContainer = "",
  borderColorOfContainer = "",
  boxShadowOnFocusOfContainer = "",
  boxShadowOnFocusOfDropdown = "",
  // VALUE
  fontFamilyOfValues = "",
  fontSizeOfValues = "",
  fontWeightOfValues = "",
  textColorOfValues = "",
  paddingOfValues = "",
  bgColorOfValues = "",
  bgColorOnHoverOfValues = "",
  // UNSELECTED
  textColorOfUnselected = "",
  // SELECTED VALUES
  textColorOfSelected = "",
  bgColorOfSelected = "",
}) => {
  const [values, setValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const multiSelectRef = useRef();

  const toggleOption = (clickedValue) => {
    setValues((prev) => {
      const newSelected = prev.includes(clickedValue)
        ? prev.filter((item) => item !== clickedValue)
        : [...prev, clickedValue];
      functionOnChange && functionOnChange(newSelected);
      return newSelected;
    });
  };

  const handleBlur = (e) => {
    if (!multiSelectRef.current.contains(document.activeElement)) {
      setIsOpen(false);
    }
    const value = e.target.value;
    setIsActive(value !== "" && value !== null && value !== undefined);
    functionOnBlur && functionOnBlur(e);
  };

  const handleFocus = (e) => {
    setIsActive(true);
    functionOnFocus && functionOnFocus(e);
  };

  const handleKeyDown = (e) => {
    functionOnKeyDown && functionOnKeyDown(e);
  };

  return (
    <fieldset
      className={styles.formFieldset}
      ref={multiSelectRef}
      style={{
        marginTop: `${styleOfLabels === "floating" ? "1.5rem" : "0"}`,
        minWidth: `${minWidth}`,
        flex: `${flex}`,
      }}
    >
      {label && (
        <label
          htmlFor={`${tag}`}
          style={{
            "--localFontFamilyOfLabels": `${fontFamilyOfLabel}`,
            "--localFontSizeOfLabels": `${fontSizeOfLabel}`,
            "--localFontWeightOfLabels": `${fontWeightOfLabel}`,
            "--localTextColorOfLabels": `${textColorOfLabel}`,
            "--localPaddingOfLabels": `${paddingOfLabel}`,
            "--localBgColorOfLabels": `${bgColorOfLabel}`,
            "--localBorderRadiusOfLabels": `${borderRadiusOfLabel}`,
          }}
          className={`${styles.formLabel} ${
            isActive ? `${styles.active}` : ""
          } ${styles[styleOfLabels]}`}
        >
          {label}
          {isRequired && isRequiredStar && (
            <span className={`${styles.requiredStar}`}> *</span>
          )}
        </label>
      )}
      <div className={`${styles.multiSelectContainer}`}>
        <input type="hidden" name={tag} value={values} />
        <div
          className={`${styles.formMultiSelect} ${isOpen ? styles.open : ""}`}
          onClick={() => !isDisabled && setIsOpen((prev) => !prev)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          required={isRequired}
          disabled={isDisabled}
          tabIndex={0}
          role="button"
          style={{
            // CONTAINERS
            "--localPaddingOfContainers": `${paddingOfContainer}`,
            "--localBgColorOfContainers": `${bgColorOfContainer}`,
            "--localBorderRadiusOfContainers": `${borderRadiusOfContainer}`,
            "--localBorderSizeOfContainers": `${borderSizeOfContainer}`,
            "--localBorderColorOfContainers": `${borderColorOfContainer}`,
            "--localBoxShadowOnFocusOfContainers": `${boxShadowOnFocusOfContainer}`,
            "--localBoxShadowOnFocusOfDropdowns": `${boxShadowOnFocusOfDropdown}`,
            // VALUES
            "--localFontFamilyOfValues": `${fontFamilyOfValues}`,
            "--localFontSizeOfValues": `${fontSizeOfValues}`,
            "--localFontWeightOfValues": `${fontWeightOfValues}`,
            "--localTextColorOfValues": `${
              values.length === 0
                ? textColorOfUnselected
                  ? textColorOfUnselected
                  : "var(--localTextColorOfUnselected)"
                : textColorOfValues
            }`,
            "--localPaddingOfValues": `${paddingOfValues}`,
            "--localBgColorOfValues": `${bgColorOfValues}`,
            "--localBgColorOnHoverOfValues": `${bgColorOnHoverOfValues}`,
            // SELECTED VALUES
            "--localTextColorOfSelected": `${textColorOfSelected}`,
            "--localBgColorOfSelected": `${bgColorOfSelected}`,
          }}
        >
          {values.length > 0 ? values.join(", ") : defaultOption}
          <IconDropdownCircle className={`${styles.dropdownIcon}`} />
        </div>
        {isOpen && (
          <div
            className={`${styles.optionsList}`}
            onMouseDown={(e) => e.preventDefault()}
          >
            {defaultOption &&
              defaultOptionShowInOptions &&
              values.length !== 0 && (
                <div
                  key={"default"}
                  className={`${styles.option}`}
                  style={{
                    color: `${
                      textColorOfUnselected
                        ? textColorOfUnselected
                        : "var(--localTextColorOfUnselected)"
                    }`,
                  }}
                  onClick={() => {
                    !isDisabled && setValues([]);
                    !isDisabled && setIsOpen(false);
                    !isDisabled && functionOnChange && functionOnChange([]);
                  }}
                >
                  {defaultOption}
                </div>
              )}
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  values.includes(option) ? styles.selected : ""
                }`}
                onClick={() => !isDisabled && toggleOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        {hintText && (
          <>
            <IconInfoCircle className={`${styles.hintIcon}`} />
            <span className={`${styles.hintText}`}>{hintText}</span>
          </>
        )}
      </div>
    </fieldset>
  );
};

/*
INPUT MultiCheckbox (Universal - can be used multiple times in one form with different tag)
#F0F
*/

/*
EXEMPLES

*/

/*
INSTRUCTIONS
  tag                                     *REQUIRED - its for htmlFor and name of select to make it original (cant be two selects with same name in form)
  options                                 *REQUIRED - list of options (["Option 1", "Option 2"])
  defaultOption                           Default option that will be visible on default
  defaultOptionShowInOptions              If true, default option can be picked from dropdown list of option, false means its not visible in list (default false)
  label                                   fill either label or placeholder
  isRequired                              true if required field (can't submit without this field filled)
  isRequiredStar                          if true, show red start next to label (default true)
  isDisabled                              true if select is disabled
  functionOnChange                        function that proceed onChange
  minWidth                                minWidth of fieldset element (default to 200px) - if space, it take full width
  flex                                    flex of fieldset (default is "1 1 25%" - if two in same row with this default, it will be 50/50 until wrapped bcs of minWidth)
*/

export const FormMultiCheckbox = ({
  tag = "",
  ref = {},
  options = ["Option 1", "Option 2", "Other"],
  label = "",
  isRequired = false,
  isRequiredStar = true,
  isDisabled,
  functionOnChange,
  minWidth = "200px",
  flex = "1 1 25%",
  hintText = "",
  styleOfLabels,
  // LABEL
  fontFamilyOfLabel = "",
  fontSizeOfLabel = "",
  fontWeightOfLabel = "",
  textColorOfLabel = "",
  paddingOfLabel = "",
  bgColorOfLabel = "",
  borderRadiusOfLabel = "",
  // CONTAINER
  paddingOfContainer = "",
  bgColorOfContainer = "",
  borderRadiusOfContainer = "",
  borderSizeOfContainer = "",
  borderColorOfContainer = "",
  boxShadowOnFocusOfContainer = "",
  // VALUE
  fontFamilyOfValues = "",
  fontSizeOfValues = "",
  fontWeightOfValues = "",
  textColorOfValues = "",
  paddingOfValues = "",
  bgColorOfValues = "",
  bgColorOnHoverOfValues = "",
  // UNSELECTED
  textColorOfUnselected = "",
  // SELECTED VALUES
  textColorOfSelected = "",
  bgColorOfSelected = "",
}) => {
  const [values, setValues] = useState([]);
  const multiSelectRef = useRef();

  const toggleOption = (clickedValue) => {
    setValues((prev) => {
      const newSelected = prev.includes(clickedValue)
        ? prev.filter((item) => item !== clickedValue)
        : [...prev, clickedValue];
      functionOnChange && functionOnChange(newSelected);
      return newSelected;
    });
  };

  return (
    <fieldset
      className={styles.formFieldset}
      ref={multiSelectRef}
      style={{
        marginTop: `${styleOfLabels === "floating" ? "1.5rem" : "0"}`,
        minWidth: `${minWidth}`,
        flex: `${flex}`,
      }}
    >
      {label && (
        <label
          htmlFor={`${tag}`}
          style={{
            "--localFontFamilyOfLabels": `${fontFamilyOfLabel}`,
            "--localFontSizeOfLabels": `${fontSizeOfLabel}`,
            "--localFontWeightOfLabels": `${fontWeightOfLabel}`,
            "--localTextColorOfLabels": `${textColorOfLabel}`,
            "--localPaddingOfLabels": `${paddingOfLabel}`,
            "--localBgColorOfLabels": `${bgColorOfLabel}`,
            "--localBorderRadiusOfLabels": `${borderRadiusOfLabel}`,
          }}
          className={`${styles.formLabel} ${styles[styleOfLabels]}`}
        >
          {label}
          {isRequired && isRequiredStar && (
            <span className={`${styles.requiredStar}`}> *</span>
          )}
        </label>
      )}
      <div className={`${styles.multiCheckboxContainer}`}>
        <input type="hidden" name={tag} value={values} />
        <div
          className={`${styles.formMultiCheckbox}`}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            // CONTAINERS
            "--localPaddingOfContainers": `${paddingOfContainer}`,
            "--localBgColorOfContainers": `${bgColorOfContainer}`,
            "--localBorderRadiusOfContainers": `${borderRadiusOfContainer}`,
            "--localBorderSizeOfContainers": `${borderSizeOfContainer}`,
            "--localBorderColorOfContainers": `${borderColorOfContainer}`,
            "--localBoxShadowOnFocusOfContainers": `${boxShadowOnFocusOfContainer}`,
            // VALUES
            "--localFontFamilyOfValues": `${fontFamilyOfValues}`,
            "--localFontSizeOfValues": `${fontSizeOfValues}`,
            "--localFontWeightOfValues": `${fontWeightOfValues}`,
            "--localTextColorOfValues": `${textColorOfValues}`,
            "--localPaddingOfValues": `${paddingOfValues}`,
            "--localBgColorOfValues": `${bgColorOfValues}`,
            "--localBgColorOnHoverOfValues": `${bgColorOnHoverOfValues}`,
            // UNSELECTED
            "--localTextColorOfUnselected": `${textColorOfUnselected}`,
            // SELECTED VALUES
            "--localTextColorOfSelected": `${textColorOfSelected}`,
            "--localBgColorOfSelected": `${bgColorOfSelected}`,
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`${styles.option} ${
                values.includes(option) ? styles.selected : ""
              }`}
              onClick={() => !isDisabled && toggleOption(option)}
            >
              <span
                className={`${styles.symbol} ${
                  values.includes(option) ? styles.checked : ""
                }`}
              >
                <span />
                <span />
              </span>
              {option}
            </div>
          ))}
        </div>
        {hintText && (
          <>
            <IconInfoCircle className={`${styles.hintIcon}`} />
            <span className={`${styles.hintText}`}>{hintText}</span>
          </>
        )}
      </div>
    </fieldset>
  );
};

/*
INPUT Picker (Universal - can be used multiple times in one form with different tag)
#F0F
*/

/*
EXEMPLES
  <FormPicker label="S čím potřebujete pomoct?">
    <FormPickerOption
      functionOnClick={(option) => {
        setChoosedOptionForm(option);
      }}
    >
      Opt 1
    </FormPickerOption>
    <FormPickerOption
      functionOnClick={(option) => {
        setChoosedOptionForm(option);
      }}
    >
      Opt 2
    </FormPickerOption>
  </FormPicker>
*/

/*
INSTRUCTIONS
  label                                   fill either label or placeholder
  minWidth                                minWidth of fieldset element (default to 200px) - if space, it take full width
  flex                                    flex of fieldset (default is "1 1 25%" - if two in same row with this default, it will be 50/50 until wrapped bcs of minWidth)  
*/

export const FormPicker = ({
  children,
  label,
  minWidth = "200px",
  flex = "1 1 25%",
  // LABEL
  fontFamilyOfLabel = "",
  fontSizeOfLabel = "",
  fontWeightOfLabel = "",
  textColorOfLabel = "",
  paddingOfLabel = "",
  bgColorOfLabel = "",
  borderRadiusOfLabel = "",
  // BTNS
  fontFamilyOfBtns = "",
  fontSizeOfBtns = "",
  fontWeightOfBtns = "",
  textColorOfPicker = "",
  textColorOnHoverOfPicker = "",
  textColorOnPickedOfPicker = "",
  paddingOfBtns = "",
  bgColorOfPicker = "",
  bgColorOnHoverOfPicker = "",
  bgColorOnPickedOfPicker = "",
  borderRadiusOfBtns = "",
  borderSizeOfBtns = "",
  borderColorOfBtns = "",
}) => {
  return (
    <div
      className={`${styles.formPicker}`}
      style={{
        minWidth: `${minWidth}`,
        flex: `${flex}`,
      }}
    >
      {label && (
        <span
          style={{
            "--localFontFamilyOfLabels": `${fontFamilyOfLabel}`,
            "--localFontSizeOfLabels": `${fontSizeOfLabel}`,
            "--localFontWeightOfLabels": `${fontWeightOfLabel}`,
            "--localTextColorOfLabels": `${textColorOfLabel}`,
            "--localPaddingOfLabels": `${paddingOfLabel}`,
            "--localBgColorOfLabels": `${bgColorOfLabel}`,
            "--localBorderRadiusOfLabels": `${borderRadiusOfLabel}`,
          }}
          className={`${styles.formLabel}`}
        >
          {label}
        </span>
      )}
      <div className={`${styles.pickerContainer}`}>
        {Children.map(children, (child) => {
          return cloneElement(child, {
            fontFamilyOfBtns: `${fontFamilyOfBtns}`,
            fontSizeOfBtns: `${fontSizeOfBtns}`,
            fontWeightOfBtns: `${fontWeightOfBtns}`,
            textColorOfPicker: `${textColorOfPicker}`,
            textColorOnHoverOfPicker: `${textColorOnHoverOfPicker}`,
            textColorOnPickedOfPicker: `${textColorOnPickedOfPicker}`,
            paddingOfBtns: `${paddingOfBtns}`,
            bgColorOfPicker: `${bgColorOfPicker}`,
            bgColorOnHoverOfPicker: `${bgColorOnHoverOfPicker}`,
            bgColorOnPickedOfPicker: `${bgColorOnPickedOfPicker}`,
            borderRadiusOfBtns: `${borderRadiusOfBtns}`,
            borderSizeOfBtns: `${borderSizeOfBtns}`,
            borderColorOfBtns: `${borderColorOfBtns}`,
          });
        })}
      </div>
    </div>
  );
};

/*
INPUT Picker Option (Universal - can be used multiple times in one form with different tag)
#F0F
*/

/*
INSTRUCTIONS
  children                  text of btn
  picked                    true if its picked option
  functionOnClick           should be (option)=>{setOptionForm(option)}
  value                     value that will be option
*/

export const FormPickerOption = ({
  children = "Option 1",
  picked = false,
  functionOnClick,
  value,
  fontFamilyOfBtns,
  fontSizeOfBtns,
  fontWeightOfBtns,
  textColorOfPicker,
  textColorOnHoverOfPicker,
  textColorOnPickedOfPicker,
  paddingOfBtns,
  bgColorOfPicker,
  bgColorOnHoverOfPicker,
  bgColorOnPickedOfPicker,
  borderRadiusOfBtns,
  borderSizeOfBtns,
  borderColorOfBtns,
}) => {
  return (
    <button
      className={`${styles.formPickerOption} ${picked ? styles.picked : ""}`}
      style={{
        "--localFontFamilyOfBtns": `${fontFamilyOfBtns}`,
        "--localFontSizeOfBtns": `${fontSizeOfBtns}`,
        "--localFontWeightOfBtns": `${fontWeightOfBtns}`,
        "--localTextColorOfPicker": `${textColorOfPicker}`,
        "--localTextColorOnHoverOfPicker": `${textColorOnHoverOfPicker}`,
        "--localTextColorOnPickedOfPicker": `${textColorOnPickedOfPicker}`,
        "--localPaddingOfBtns": `${paddingOfBtns}`,
        "--localBgColorOfPicker": `${bgColorOfPicker}`,
        "--localBgColorOnHoverOfPicker": `${bgColorOnHoverOfPicker}`,
        "--localBgColorOnPickedOfPicker": `${bgColorOnPickedOfPicker}`,
        "--localBorderRadiusOfBtns": `${borderRadiusOfBtns}`,
        "--localBorderSizeOfBtns": `${borderSizeOfBtns}`,
        "--localBorderColorOfBtns": `${borderColorOfBtns}`,
      }}
      onClick={(e) => {
        e.preventDefault();
        functionOnClick(value);
      }}
    >
      {children}
    </button>
  );
};

/*
  CAN WAIT TODO ---
  MAKE POSSIBLE TO HANDLE SELECTS AND CHECKBOXS BY KEYBOARD
*/
