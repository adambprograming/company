"use client";
// Styles
import styles from "./form.module.scss";
// Public & Assets
import IconInfoCircle from "../svgs/icon-info-circle.component";
// React/Next Functions
import { Children, cloneElement, useState, useEffect } from "react";
import { useRef } from "react";
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
  fontSizeOfLabelsForm                            style attribute for every label - can be overwritten individauly for each label element by setting fontSizeLabel there
  fontWeightOfLabelsForm                          style attribute for every label - can be overwritten individauly for each label element by setting fontWeightLabel there
  textColorOfLabelsForm                           style attribute for every label - can be overwritten individauly for each label element by setting textColorLabel there
  paddingOfLabelsForm                             style attribute for every label - can be overwritten individauly for each label element by setting paddingLabel there
  bgColorOfLabelsForm                             style attribute for every label - can be overwritten individauly for each label element by setting bgColorLabel there
  fontSizeOfInputsAndBtnsForm                     style attribute for every input and btn - can be overwritten individauly for each input/btn element by setting fontSizeInput or fontSizeBtn there
  fontWeightOfInputsAndBtnsForm                   style attribute for every input and btn - can be overwritten individauly for each input/btn element by setting fontWeightInput or fontWeightBtn there
  textColorOfInputsAndBtnsForm                    style attribute for every input and btn - can be overwritten individauly for each input/btn element by setting textColorInput or textColorBtn there
  paddingOfInputsAndBtnsForm                      style attribute for every input and btn - can be overwritten individauly for each input/btn element by setting paddingInput or paddingBtn there
  borderRadiusOfInputsAndBtnsForm                 style attribute for every input and btn - can be overwritten individauly for each input/btn element by setting borderRadius there
  borderSizeOfInputsAndBtnsForm                   style attribute for every input and btn - can be overwritten individauly for each input/btn element by setting borderSize there
  borderColorOfInputsAndBtnsForm                  style attribute for every input and btn - can be overwritten individauly for each input/btn element by setting borderColor there
  bgColorOfInputsAndBtnsForm                      style attribute for every input and btn - can be overwritten individauly for each input/btn element by setting bgColorInput or bgColor (btn) there
  fontFamilyOfInputsAndBtnsAndLabelsForm          style attribute for every input, btn and label - can be overwritten individauly for each input/btn/label element by setting fontFamily there
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
  fontSizeOfLabelsForm = "var(--fontsize-small)",
  fontWeightOfLabelsForm = "400",
  textColorOfLabelsForm = "var(--shadow-75)",
  paddingOfLabelsForm = "5px 10px",
  bgColorOfLabelsForm = "var(--color-background)",
  fontSizeOfInputsAndBtnsForm = "var(--fontsize-small)",
  fontWeightOfInputsAndBtnsForm = "400",
  textColorOfInputsAndBtnsForm = "var(--color-text)",
  paddingOfInputsAndBtnsForm = "10px 20px",
  borderRadiusOfInputsAndBtnsForm = "5px",
  borderSizeOfInputsAndBtnsForm = "1px",
  borderColorOfInputsAndBtnsForm = "var(--color-border)",
  fontFamilyOfInputsAndBtnsAndLabelsForm = "var(--font-secondary)",
  bgColorOfInputsAndBtnsForm = "var(--color-background)",
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
        border: `${borderSize} solid ${borderColor}`
      }}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate={true}
    >
      {Children.map(children, (child) => {
        try {
          return cloneElement(child, {
            styleOfLabels: styleOfLabels,
            fontSizeOfLabelsForm: fontSizeOfLabelsForm,
            fontWeightOfLabelsForm: fontWeightOfLabelsForm,
            textColorOfLabelsForm: textColorOfLabelsForm,
            paddingOfLabelsForm: paddingOfLabelsForm,
            bgColorOfLabelsForm: bgColorOfLabelsForm,
            fontSizeOfInputsAndBtnsForm: fontSizeOfInputsAndBtnsForm,
            fontWeightOfInputsAndBtnsForm: fontWeightOfInputsAndBtnsForm,
            textColorOfInputsAndBtnsForm: textColorOfInputsAndBtnsForm,
            paddingOfInputsAndBtnsForm: paddingOfInputsAndBtnsForm,
            borderRadiusOfInputsAndBtnsForm: borderRadiusOfInputsAndBtnsForm,
            borderSizeOfInputsAndBtnsForm: borderSizeOfInputsAndBtnsForm,
            borderColorOfInputsAndBtnsForm: borderColorOfInputsAndBtnsForm,
            fontFamilyOfInputsAndBtnsAndLabelsForm:
              fontFamilyOfInputsAndBtnsAndLabelsForm,
            bgColorOfInputsAndBtnsForm: bgColorOfInputsAndBtnsForm,
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
ROW
Should be used if more items should be in one row
#F0F
*/

export const FormRow = ({
  children,
  styleOfLabels,
  fontSizeOfLabelsForm,
  fontWeightOfLabelsForm,
  textColorOfLabelsForm,
  paddingOfLabelsForm,
  bgColorOfLabelsForm,
  fontSizeOfInputsAndBtnsForm,
  fontWeightOfInputsAndBtnsForm,
  textColorOfInputsAndBtnsForm,
  paddingOfInputsAndBtnsForm,
  borderRadiusOfInputsAndBtnsForm,
  borderSizeOfInputsAndBtnsForm,
  borderColorOfInputsAndBtnsForm,
  fontFamilyOfInputsAndBtnsAndLabelsForm,
  bgColorOfInputsAndBtnsForm,
}) => {
  return (
    <div className={`${styles.formRow}`}>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          styleOfLabels: styleOfLabels,
          fontSizeOfLabelsForm: fontSizeOfLabelsForm,
          fontWeightOfLabelsForm: fontWeightOfLabelsForm,
          textColorOfLabelsForm: textColorOfLabelsForm,
          paddingOfLabelsForm: paddingOfLabelsForm,
          bgColorOfLabelsForm: bgColorOfLabelsForm,
          fontSizeOfInputsAndBtnsForm: fontSizeOfInputsAndBtnsForm,
          fontWeightOfInputsAndBtnsForm: fontWeightOfInputsAndBtnsForm,
          textColorOfInputsAndBtnsForm: textColorOfInputsAndBtnsForm,
          paddingOfInputsAndBtnsForm: paddingOfInputsAndBtnsForm,
          borderRadiusOfInputsAndBtnsForm: borderRadiusOfInputsAndBtnsForm,
          borderSizeOfInputsAndBtnsForm: borderSizeOfInputsAndBtnsForm,
          borderColorOfInputsAndBtnsForm: borderColorOfInputsAndBtnsForm,
          fontFamilyOfInputsAndBtnsAndLabelsForm:
            fontFamilyOfInputsAndBtnsAndLabelsForm,
          bgColorOfInputsAndBtnsForm: bgColorOfInputsAndBtnsForm,
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
  fontSizeOfInputsAndBtnsForm,
  fontWeightOfInputsAndBtnsForm,
  textColorOfInputsAndBtnsForm,
  paddingOfInputsAndBtnsForm,
  borderRadiusOfInputsAndBtnsForm,
  borderSizeOfInputsAndBtnsForm,
  borderColorOfInputsAndBtnsForm,
  fontFamilyOfInputsAndBtnsAndLabelsForm,
  bgColorOfInputsAndBtnsForm,
  fontSize = "",
  fontWeight = "500",
  textColor = "var(--color-text-reverse)",
  padding = "",
  borderRadius = "",
  borderSize = "",
  borderColor = "",
  fontFamily = "",
  bgColor = "var(--color-primary)",
  textHoverColor = "var(--color-text)",
  borderHoverRadius = "",
  bgHoverBorderRadius = "",
  bgHoverColor = "var(--color-ascent)",
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
        borderRadius: `${
          borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
        }`,
        border: `${
          borderSize ? borderSize : borderSizeOfInputsAndBtnsForm
        } solid ${borderColor ? borderColor : borderColorOfInputsAndBtnsForm}`,
        width: `${width}`,
        "--localFilter": `${filter}`,
      }}
      aria-label={`${ariaLabel}`}
    >
      <span
        className={`${styles.btnBg}`}
        style={{
          "--localBgColor": `${bgColor ? bgColor : bgColorOfInputsAndBtnsForm}`,
          opacity: `${opacity}`,
          "--localBackdropFilter": `${backdropFilter}`,
          "--localBgHoverColor": `${bgHoverColor}`,
          "--localBgHoverBorderRadius": `${bgHoverBorderRadius}`,
        }}
      ></span>
      <span
        className={`${styles.btnText}`}
        style={{
          "--localTextColor": `${
            textColor ? textColor : textColorOfInputsAndBtnsForm
          }`,
          "--localTextHoverColor": `${
            textHoverColor
              ? textHoverColor
              : textColor
              ? textColor
              : textColorOfInputsAndBtnsForm
          }`,
          fontSize: `${fontSize ? fontSize : fontSizeOfInputsAndBtnsForm}`,
          fontWeight: `${
            fontWeight ? fontWeight : fontWeightOfInputsAndBtnsForm
          }`,
          color: `${textColor ? textColor : textColorOfInputsAndBtnsForm}`,
          padding: `${padding ? padding : paddingOfInputsAndBtnsForm}`,
          fontFamily: `${
            fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
          }`,
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
  fontSizeLabel                           style attribute for input that overwrite fontSizeOfLabelsForm  
  fontWeightLabel                         style attribute for input that overwrite fontWeightOfLabelsForm  
  textColorLabel                          style attribute for input that overwrite textColorOfLabelsForm  
  paddingLabel                            style attribute for input that overwrite paddingOfLabelsForm
  bgColorLabel                            style attribute for input that overwrite bgColorOfLabelsForm
  fontSizeInput                           style attribute for input that overwrite fontSizeOfInputsAndBtnsForm  
  fontWeightInput                         style attribute for input that overwrite fontWeightOfInputsAndBtnsForm  
  textColorInput                          style attribute for input that overwrite textColorOfInputsAndBtnsForm  
  paddingInput                            style attribute for input that overwrite paddingOfInputsAndBtnsForm  
  bgColorInput                            style attribute for input that overwrite bgColorOfInputsAndBtnsForm  
  borderRadius                            style attribute for input that overwrite borderRadiusOfInputsAndBtnsForm  
  borderSize                              style attribute for input that overwrite borderSizeOfInputsAndBtnsForm  
  borderColor                             style attribute for input that overwrite borderColorOfInputsAndBtnsForm  
  fontFamily                              style attribute for input that overwrite fontFamilyOfInputsAndBtnsAndLabelsForm  
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
  hintText = "",
  styleOfLabels,
  fontSizeOfLabelsForm,
  fontWeightOfLabelsForm,
  textColorOfLabelsForm,
  paddingOfLabelsForm,
  bgColorOfLabelsForm,
  fontSizeOfInputsAndBtnsForm,
  fontWeightOfInputsAndBtnsForm,
  textColorOfInputsAndBtnsForm,
  paddingOfInputsAndBtnsForm,
  borderRadiusOfInputsAndBtnsForm,
  borderSizeOfInputsAndBtnsForm,
  borderColorOfInputsAndBtnsForm,
  fontFamilyOfInputsAndBtnsAndLabelsForm,
  bgColorOfInputsAndBtnsForm,
  fontSizeLabel = "",
  fontWeightLabel = "",
  textColorLabel = "",
  paddingLabel = "",
  bgColorLabel = "",
  fontSizeInput = "",
  fontWeightInput = "",
  textColorInput = "",
  paddingInput = "",
  bgColorInput = "",
  borderRadius = "",
  borderSize = "",
  borderColor = "",
  fontFamily = "",
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
      const pattern = validationPattern;
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
            fontSize: `${fontSizeLabel ? fontSizeLabel : fontSizeOfLabelsForm}`,
            fontWeight: `${
              fontWeightLabel ? fontWeightLabel : fontWeightOfLabelsForm
            }`,
            color: `${textColorLabel ? textColorLabel : textColorOfLabelsForm}`,
            padding: `${paddingLabel ? paddingLabel : paddingOfLabelsForm}`,
            borderRadius: `${
              borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
            }`,
            fontFamily: `${
              fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
            }`,
            backgroundColor: `${
              bgColorLabel ? bgColorLabel : bgColorOfLabelsForm
            }`,
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
          // onInvalid={(e) => {
          // e.target.setCustomValidity("Vyplňte prosím Váš e-mail.");
          // }}
          // onInput={(e) => e.target.setCustomValidity("")}
          disabled={isDisabled}
          style={{
            fontSize: `${
              fontSizeInput ? fontSizeInput : fontSizeOfInputsAndBtnsForm
            }`,
            fontWeight: `${
              fontWeightInput ? fontWeightInput : fontWeightOfInputsAndBtnsForm
            }`,
            color: `${
              textColorInput ? textColorInput : textColorOfInputsAndBtnsForm
            }`,
            padding: `${
              paddingInput ? paddingInput : paddingOfInputsAndBtnsForm
            }`,
            borderRadius: `${
              borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
            }`,
            border: `${
              borderSize ? borderSize : borderSizeOfInputsAndBtnsForm
            } solid ${
              !isValid
                ? "var(--color-error)"
                : borderColor
                ? borderColor
                : borderColorOfInputsAndBtnsForm
            }`,
            fontFamily: `${
              fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
            }`,
            backgroundColor: `${
              bgColorInput ? bgColorInput : bgColorOfInputsAndBtnsForm
            }`,
          }}
        ></input>
        {hintText && !isValid && (
          <>
            <IconInfoCircle
              className={`${styles.hintIcon}`}
              style={{ fill: `${isValid ? "" : "var(--color-error)"}` }}
            />
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
  fontSizeLabel                           style attribute for textarea that overwrite fontSizeOfLabelsForm  
  fontWeightLabel                         style attribute for textarea that overwrite fontWeightOfLabelsForm  
  textColorLabel                          style attribute for textarea that overwrite textColorOfLabelsForm  
  paddingLabel                            style attribute for textarea that overwrite paddingOfLabelsForm
  bgColorLabel                            style attribute for textarea that overwrite bgColorOfLabelsForm
  fontSizeInput                           style attribute for textarea that overwrite fontSizeOfInputsAndBtnsForm  
  fontWeightInput                         style attribute for textarea that overwrite fontWeightOfInputsAndBtnsForm  
  textColorInput                          style attribute for textarea that overwrite textColorOfInputsAndBtnsForm  
  paddingInput                            style attribute for textarea that overwrite paddingOfInputsAndBtnsForm  
  bgColorInput                            style attribute for textarea that overwrite bgColorOfInputsAndBtnsForm  
  borderRadius                            style attribute for textarea that overwrite borderRadiusOfInputsAndBtnsForm  
  borderSize                              style attribute for textarea that overwrite borderSizeOfInputsAndBtnsForm  
  borderColor                             style attribute for textarea that overwrite borderColorOfInputsAndBtnsForm  
  fontFamily                              style attribute for textarea that overwrite fontFamilyOfInputsAndBtnsAndLabelsForm  
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
  hintText = "",
  styleOfLabels,
  fontSizeOfLabelsForm,
  fontWeightOfLabelsForm,
  textColorOfLabelsForm,
  paddingOfLabelsForm,
  bgColorOfLabelsForm,
  fontSizeOfInputsAndBtnsForm,
  fontWeightOfInputsAndBtnsForm,
  textColorOfInputsAndBtnsForm,
  paddingOfInputsAndBtnsForm,
  borderRadiusOfInputsAndBtnsForm,
  borderSizeOfInputsAndBtnsForm,
  borderColorOfInputsAndBtnsForm,
  fontFamilyOfInputsAndBtnsAndLabelsForm,
  bgColorOfInputsAndBtnsForm,
  fontSizeLabel = "",
  fontWeightLabel = "",
  textColorLabel = "",
  paddingLabel = "",
  bgColorLabel = "",
  fontSizeInput = "",
  fontWeightInput = "",
  textColorInput = "",
  paddingInput = "",
  bgColorInput = "",
  borderRadius = "",
  borderSize = "",
  borderColor = "",
  fontFamily = "",
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
      const pattern = validationPattern;
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
            fontSize: `${fontSizeLabel ? fontSizeLabel : fontSizeOfLabelsForm}`,
            fontWeight: `${
              fontWeightLabel ? fontWeightLabel : fontWeightOfLabelsForm
            }`,
            color: `${textColorLabel ? textColorLabel : textColorOfLabelsForm}`,
            padding: `${paddingLabel ? paddingLabel : paddingOfLabelsForm}`,
            borderRadius: `${
              borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
            }`,
            fontFamily: `${
              fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
            }`,
            backgroundColor: `${
              bgColorLabel ? bgColorLabel : bgColorOfLabelsForm
            }`,
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
      <div className={`${styles.textareaContainer}`}>
        <textarea
          name={`${tag}`}
          maxLength={maxLength}
          rows={rows}
          className={`${styles.formTextarea}`}
          placeholder={styleOfLabels !== "floating" ? placeholder : ""}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          required={isRequired}
          // onInvalid={(e) => {
          // e.target.setCustomValidity("Vyplňte prosím Váš e-mail.");
          // }}
          // onInput={(e) => e.target.setCustomValidity("")}
          disabled={isDisabled}
          style={{
            fontSize: `${
              fontSizeInput ? fontSizeInput : fontSizeOfInputsAndBtnsForm
            }`,
            fontWeight: `${
              fontWeightInput ? fontWeightInput : fontWeightOfInputsAndBtnsForm
            }`,
            color: `${
              textColorInput ? textColorInput : textColorOfInputsAndBtnsForm
            }`,
            padding: `${
              paddingInput ? paddingInput : paddingOfInputsAndBtnsForm
            }`,
            borderRadius: `${
              borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
            }`,
            border: `${
              borderSize ? borderSize : borderSizeOfInputsAndBtnsForm
            } solid ${
              !isValid
                ? "var(--color-error)"
                : borderColor
                ? borderColor
                : borderColorOfInputsAndBtnsForm
            }`,
            fontFamily: `${
              fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
            }`,
            backgroundColor: `${
              bgColorInput ? bgColorInput : bgColorOfInputsAndBtnsForm
            }`,
            resize: `${resize}`,
          }}
        ></textarea>
        {hintText && !isValid && (
          <>
            <IconInfoCircle
              className={`${styles.hintIcon}`}
              style={{ fill: `${isValid ? "" : "var(--color-error)"}` }}
            />
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
  fontSizeLabel                           style attribute for select that overwrite fontSizeOfLabelsForm  
  fontWeightLabel                         style attribute for select that overwrite fontWeightOfLabelsForm  
  textColorLabel                          style attribute for select that overwrite textColorOfLabelsForm  
  paddingLabel                            style attribute for select that overwrite paddingOfLabelsForm
  bgColorLabel                            style attribute for select that overwrite bgColorOfLabelsForm
  fontSizeInput                           style attribute for select that overwrite fontSizeOfInputsAndBtnsForm  
  fontWeightInput                         style attribute for select that overwrite fontWeightOfInputsAndBtnsForm  
  textColorInput                          style attribute for select that overwrite textColorOfInputsAndBtnsForm  
  paddingInput                            style attribute for select that overwrite paddingOfInputsAndBtnsForm  
  borderRadius                            style attribute for select that overwrite borderRadiusOfInputsAndBtnsForm  
  borderSize                              style attribute for select that overwrite borderSizeOfInputsAndBtnsForm  
  borderColor                             style attribute for select that overwrite borderColorOfInputsAndBtnsForm  
  fontFamily                              style attribute for select that overwrite fontFamilyOfInputsAndBtnsAndLabelsForm  
  bgColorInput                            style attribute for select that overwrite bgColorOfInputsAndBtnsForm  
*/

export const FormSelect = ({
  tag = "",
  options = ["Option 1", "Option 2"],
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
  fontSizeOfLabelsForm,
  fontWeightOfLabelsForm,
  textColorOfLabelsForm,
  paddingOfLabelsForm,
  fontSizeOfInputsAndBtnsForm,
  fontWeightOfInputsAndBtnsForm,
  textColorOfInputsAndBtnsForm,
  paddingOfInputsAndBtnsForm,
  bgColorOfLabelsForm,
  borderRadiusOfInputsAndBtnsForm,
  borderSizeOfInputsAndBtnsForm,
  borderColorOfInputsAndBtnsForm,
  fontFamilyOfInputsAndBtnsAndLabelsForm,
  bgColorOfInputsAndBtnsForm,
  fontSizeLabel = "",
  fontWeightLabel = "",
  textColorLabel = "",
  paddingLabel = "",
  bgColorLabel = "",
  fontSizeInput = "",
  fontWeightInput = "",
  textColorInput = "",
  paddingInput = "",
  bgColorInput = "var(--shadow-5)",
  borderRadius = "",
  borderSize = "",
  borderColor = "",
  fontFamily = "",
}) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(
    defaultOption ? defaultOption : options[0]
  );

  const handleChange = (e) => {
    // setIsActive(value !== "" && value !== null && value !== undefined) && e.target === document.activeElement;
    functionOnChange && functionOnChange(e);
    setValue(e.target.value);
  };

  const handleBlur = (e) => {
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
      className={`${styles.formFieldset}`}
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
            fontSize: `${fontSizeLabel ? fontSizeLabel : fontSizeOfLabelsForm}`,
            fontWeight: `${
              fontWeightLabel ? fontWeightLabel : fontWeightOfLabelsForm
            }`,
            color: `${textColorLabel ? textColorLabel : textColorOfLabelsForm}`,
            padding: `${paddingLabel ? paddingLabel : paddingOfLabelsForm}`,
            borderRadius: `${
              borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
            }`,
            fontFamily: `${
              fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
            }`,
            backgroundColor: `${
              bgColorLabel ? bgColorLabel : bgColorOfLabelsForm
            }`,
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
        <select
          name={`${tag}`}
          className={`${styles.formSelect}`}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          required={isRequired}
          // onInvalid={(e) => {
          // e.target.setCustomValidity("Vyplňte prosím Váš e-mail.");
          // }}
          // onInput={(e) => e.target.setCustomValidity("")}
          disabled={isDisabled}
          style={{
            fontSize: `${
              fontSizeInput ? fontSizeInput : fontSizeOfInputsAndBtnsForm
            }`,
            fontWeight: `${
              fontWeightInput ? fontWeightInput : fontWeightOfInputsAndBtnsForm
            }`,
            color: `${
              value === defaultOption
                ? "var(--shadow-50)"
                : textColorInput
                ? textColorInput
                : textColorOfInputsAndBtnsForm
            }`,
            padding: `${
              paddingInput ? paddingInput : paddingOfInputsAndBtnsForm
            }`,
            borderRadius: `${
              borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
            }`,
            border: `${
              borderSize ? borderSize : borderSizeOfInputsAndBtnsForm
            } solid ${
              borderColor ? borderColor : borderColorOfInputsAndBtnsForm
            }`,
            fontFamily: `${
              fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
            }`,
            backgroundColor: `${
              bgColorInput ? bgColorInput : bgColorOfInputsAndBtnsForm
            }`,
          }}
        >
          {defaultOption && (
            <option value={defaultOption} hidden={!defaultOptionShowInOptions}>
              {defaultOption}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
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
  fontSizeLabel                           style attribute for select that overwrite fontSizeOfLabelsForm  
  fontWeightLabel                         style attribute for select that overwrite fontWeightOfLabelsForm  
  textColorLabel                          style attribute for select that overwrite textColorOfLabelsForm  
  paddingLabel                            style attribute for select that overwrite paddingOfLabelsForm
  bgColorLabel                            style attribute for select that overwrite bgColorOfLabelsForm
  fontSizeInput                           style attribute for select that overwrite fontSizeOfInputsAndBtnsForm  
  fontWeightInput                         style attribute for select that overwrite fontWeightOfInputsAndBtnsForm  
  textColorInput                          style attribute for select that overwrite textColorOfInputsAndBtnsForm  
  paddingInput                            style attribute for select that overwrite paddingOfInputsAndBtnsForm  
  borderRadius                            style attribute for select that overwrite borderRadiusOfInputsAndBtnsForm  
  borderSize                              style attribute for select that overwrite borderSizeOfInputsAndBtnsForm  
  borderColor                             style attribute for select that overwrite borderColorOfInputsAndBtnsForm  
  fontFamily                              style attribute for select that overwrite fontFamilyOfInputsAndBtnsAndLabelsForm  
  bgColorInput                            style attribute for select that overwrite bgColorOfInputsAndBtnsForm  
*/

export const FormPicker = ({
  children,
  label,
  minWidth = "200px",
  flex = "1 1 25%",
  fontSizeOfLabelsForm,
  fontWeightOfLabelsForm,
  textColorOfLabelsForm,
  paddingOfLabelsForm,
  fontSizeOfInputsAndBtnsForm,
  fontWeightOfInputsAndBtnsForm,
  textColorOfInputsAndBtnsForm,
  paddingOfInputsAndBtnsForm,
  bgColorOfLabelsForm,
  borderRadiusOfInputsAndBtnsForm,
  borderSizeOfInputsAndBtnsForm,
  borderColorOfInputsAndBtnsForm,
  fontFamilyOfInputsAndBtnsAndLabelsForm,
  bgColorOfInputsAndBtnsForm,
  fontSizeLabel = "",
  fontWeightLabel = "",
  textColorLabel = "",
  paddingLabel = "",
  bgColorLabel = "",
  fontSizeInput = "",
  fontWeightInput = "",
  textColorInput = "",
  paddingInput = "",
  bgColorInput = "var(--shadow-10)",
  borderRadius = "",
  borderSize = "0",
  borderColor = "",
  fontFamily = "",
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
            fontSize: `${fontSizeLabel ? fontSizeLabel : fontSizeOfLabelsForm}`,
            fontWeight: `${
              fontWeightLabel ? fontWeightLabel : fontWeightOfLabelsForm
            }`,
            color: `${textColorLabel ? textColorLabel : textColorOfLabelsForm}`,
            padding: `${paddingLabel ? paddingLabel : paddingOfLabelsForm}`,
            borderRadius: `${
              borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
            }`,
            fontFamily: `${
              fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
            }`,
            backgroundColor: `${
              bgColorLabel ? bgColorLabel : bgColorOfLabelsForm
            }`,
          }}
          className={`${styles.formLabel}`}
        >
          {label}
        </span>
      )}
      <div className={`${styles.pickerContainer}`}>
        {Children.map(children, (child) => {
          return cloneElement(child, {
            fontSize: `${
              fontSizeInput ? fontSizeInput : fontSizeOfInputsAndBtnsForm
            }`,
            fontWeight: `${
              fontWeightInput ? fontWeightInput : fontWeightOfInputsAndBtnsForm
            }`,
            textColor: `${
              textColorInput ? textColorInput : textColorOfInputsAndBtnsForm
            }`,
            padding: `${
              paddingInput ? paddingInput : paddingOfInputsAndBtnsForm
            }`,
            borderRadius: `${
              borderRadius ? borderRadius : borderRadiusOfInputsAndBtnsForm
            }`,
            borderSize: `${
              borderSize ? borderSize : borderSizeOfInputsAndBtnsForm
            }`,
            borderColor: `${
              borderColor ? borderColor : borderColorOfInputsAndBtnsForm
            }`,
            fontFamily: `${
              fontFamily ? fontFamily : fontFamilyOfInputsAndBtnsAndLabelsForm
            }`,
            bgColor: `${
              bgColorInput ? bgColorInput : bgColorOfInputsAndBtnsForm
            }`,
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
  selected                  true if its selected option
  functionOnClick           should be (option)=>{setOptionForm(option)}
  value                     value that will be option
*/

export const FormPickerOption = ({
  children = "Option 1",
  selected = false,
  functionOnClick,
  value,
  fontSize,
  fontWeight,
  textColor,
  padding,
  borderRadius,
  borderSize,
  borderColor,
  fontFamily,
  bgColor,
}) => {
  return (
    <button
      className={`${styles.formPickerOption} ${selected ? styles.selected : ""}`}
      style={{
        fontSize: `${fontSize}`,
        fontWeight: `${fontWeight}`,
        color: `${selected ? "var(--color-text-reverse)" : textColor}`,
        padding: `${padding}`,
        borderRadius: `${borderRadius}`,
        border: `${borderSize} solid ${borderColor}`,
        fontFamily: `${fontFamily}`,
        backgroundColor: `${selected ? "var(--color-primary)" : bgColor}`,
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
