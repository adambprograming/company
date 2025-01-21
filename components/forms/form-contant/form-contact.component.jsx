import { useState } from "react";
import styles from "./form-contact.module.scss";

const FormContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    serviceType: "web",
    alreadyHaveWeb: "no",
    webLink: "",
    whatDoYouNeed: "",
    typeOfWebsite: "",
    webInspo: "",
    webFunctions: "",
    whatDoYouSell: "",
    howBigIsYourCompany: "",
    eshopInspo: "",
    eshopFunctions: "",
    otherWhatDoYouNeed: "",
    budget: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    service: "",
  });

  const validatePhone = () => {
    const phoneRegex = /^[+]?[0-9]{10,13}$/;
    setErrors({
      ...errors,
      phone: phoneRegex.test(formData.phone) ? "" : "Neplatné telefonní číslo",
    });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors({
      ...errors,
      email: emailRegex.test(formData.email) ? "" : "Neplatný email",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (type) => {
    setFormData({
      ...formData,
      serviceType: type,
      alreadyHaveWeb: "no", // reset dynamic content
      webLink: "",
      whatDoYouNeed: "",
      typeOfWebsite: "",
      webInspo: "",
      webFunctions: "",
      whatDoYouSell: "",
      howBigIsYourCompany: "",
      eshopInspo: "",
      eshopFunctions: "",
      otherWhatDoYouNeed: "",
    });
  };

  const handleAlreadyHaveWebChange = (value) => {
    setFormData({
      ...formData,
      alreadyHaveWeb: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.surname ||
      !formData.phone ||
      !formData.email ||
      !formData.budget
    ) {
      setErrors({ ...errors, service: "Prosím vyplňte všechna povinná pole" });
      return;
    }
    // Handle form submission
  };

  return (
    <article id={`${styles.formContact}`}>
      <h2 className={`${styles.heading}`}>Formulář</h2>
      <div className={`${styles.formContainer}`}>
        <form onSubmit={handleSubmit}>
          <section className={`${styles.section}`}>
            <h5 className={`${styles.subHeading}`}>Vaše údaje</h5>
            <div className={`${styles.containerGroup}`}>
              <div className={`${styles.containerInput}`}>
                <span className={`${styles.label}`}>
                  Jméno:<span className={`${styles.requiredStar}`}> *</span>
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input}`}
                  placeholder="Uveďte Vaše jméno"
                  required
                />
              </div>
              <div className={`${styles.containerInput}`}>
                <span className={`${styles.label}`}>
                  Příjmení:<span className={`${styles.requiredStar}`}> *</span>
                </span>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className={`${styles.input}`}
                  placeholder="Uveďte Vaše příjmení"
                  required
                />
              </div>
              <div className={`${styles.containerInput}`}>
                <span className={`${styles.label}`}>
                  Telefonní číslo:
                  <span className={`${styles.requiredStar}`}> *</span>
                </span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={validatePhone}
                  className={`${styles.input}`}
                  placeholder="Uveďte Vaše tel. číslo"
                  required
                />
                {errors.phone && (
                  <span className={`${styles.error}`}>{errors.phone}</span>
                )}
              </div>
              <div className={`${styles.containerInput}`}>
                <span className={`${styles.label}`}>
                  E-mail:<span className={`${styles.requiredStar}`}> *</span>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={validateEmail}
                  className={`${styles.input}`}
                  placeholder="Uveďte Váš e-mail"
                  required
                />
                {errors.email && (
                  <span className={`${styles.error}`}>{errors.email}</span>
                )}
              </div>
            </div>
          </section>
          <section className={`${styles.section}`}>
            <h5 className={`${styles.subHeading}`}>Váš dotaz</h5>
            <div className={`${styles.containerInput}`}>
              <span className={`${styles.label}`}>Zvolte co potřebujete:</span>
              <div className={`${styles.btnGroup}`}>
                <button
                  type="button"
                  onClick={() => handleServiceChange("web")}
                  className={`${styles.btn} ${
                    formData.serviceType === "web" ? styles.active : ""
                  }`}
                >
                  Web
                </button>
                <button
                  type="button"
                  onClick={() => handleServiceChange("eshop")}
                  className={`${styles.btn} ${
                    formData.serviceType === "eshop" ? styles.active : ""
                  }`}
                >
                  E-shop
                </button>
                <button
                  type="button"
                  onClick={() => handleServiceChange("jine")}
                  className={`${styles.btn} ${
                    formData.serviceType === "jine" ? styles.active : ""
                  }`}
                >
                  Jiné
                </button>
              </div>
            </div>
            {formData.serviceType === "web" ? (
              <>
                <div className={`${styles.containerInput}`}>
                  <span className={`${styles.label}`}>
                    Máte již webové stránky?
                  </span>
                  <div className={`${styles.btnGroup}`}>
                    <button
                      type="button"
                      onClick={() => handleAlreadyHaveWebChange("yes")}
                      className={`${styles.btn} ${
                        formData.alreadyHaveWeb === "yes" ? styles.active : ""
                      }`}
                    >
                      Ano
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAlreadyHaveWebChange("no")}
                      className={`${styles.btn} ${
                        formData.alreadyHaveWeb === "no" ? styles.active : ""
                      }`}
                    >
                      Ne
                    </button>
                  </div>
                </div>
                {formData.alreadyHaveWeb === "yes" && (
                  <>
                    <div className={`${styles.containerInput}`}>
                      <span className={`${styles.label}`}>
                        Odkaz na Váš web:
                        <span className={`${styles.requiredStar}`}> *</span>
                      </span>
                      <input
                        type="url"
                        name="webLink"
                        value={formData.webLink}
                        onChange={handleChange}
                        className={`${styles.input}`}
                        placeholder="Uveďte odkaz na Vaše aktuální webové stránky"
                        required
                      />
                    </div>
                    <div className={`${styles.containerInput}`}>
                      <span className={`${styles.label}`}>
                        S čím potřebujete pomoci?
                        <span className={`${styles.requiredStar}`}> *</span>
                      </span>
                      <textarea
                        name="whatDoYouNeed"
                        value={formData.whatDoYouNeed}
                        onChange={handleChange}
                        className={`${styles.textarea}`}
                        placeholder="Uveďte s čím přesně Vám mohu pomoci"
                        required
                      ></textarea>
                    </div>
                  </>
                )}
                {formData.alreadyHaveWeb === "no" && (
                  <>
                    <div className={`${styles.containerInput}`}>
                      <span className={`${styles.label}`}>
                        Jaké webové stránky potřebujete?
                        <span className={`${styles.requiredStar}`}> *</span>
                      </span>
                      <select
                        name="typeOfWebsite"
                        value={formData.typeOfWebsite}
                        onChange={handleChange}
                        className={`${styles.select}`}
                        required
                      >
                        <option value="" hidden>
                          Vyberte
                        </option>
                        <option value="Jednoduché">Jednoduché</option>
                        <option value="Komplexní">Komplexní</option>
                        <option value="Profesionální">Profesionální</option>
                      </select>
                    </div>
                    <div className={`${styles.containerInput}`}>
                      <span className={`${styles.label}`}>
                        Máte představu jak mají webové stránky vypadat?
                      </span>
                      <textarea
                        name="webInspo"
                        value={formData.webInspo}
                        onChange={handleChange}
                        className={`${styles.textarea}`}
                        placeholder="V případě, že víte, uveďte odkazy na weby které se Vám líbí"
                      ></textarea>
                    </div>
                    <div className={`${styles.containerInput}`}>
                      <span className={`${styles.label}`}>
                        Víte co na webu chcete?
                      </span>
                      <textarea
                        name="webFunctions"
                        value={formData.webFunctions}
                        onChange={handleChange}
                        className={`${styles.textarea}`}
                        placeholder="V případě, že víte jaké funkce na webu chcete, uveďte je (případně i strukturu webu)"
                      ></textarea>
                    </div>
                  </>
                )}
              </>
            ) : formData.serviceType === "eshop" ? (
              <>
                <div className={`${styles.containerInput}`}>
                  <span className={`${styles.label}`}>
                    Co chcete prodávat?
                    <span className={`${styles.requiredStar}`}> *</span>
                  </span>
                  <input
                    type="text"
                    name="whatDoYouSell"
                    value={formData.whatDoYouSell}
                    onChange={handleChange}
                    className={`${styles.input}`}
                    placeholder="Uveďte typ produktu/ů, které budete na e-shopu prodávat"
                    required
                  />
                </div>
                <div className={`${styles.containerInput}`}>
                  <span className={`${styles.label}`}>
                    Jak velký máte podnik?
                    <span className={`${styles.requiredStar}`}> *</span>
                  </span>
                  <select
                    name="howBigIsYourCompany"
                    value={formData.howBigIsYourCompany}
                    onChange={handleChange}
                    className={`${styles.select}`}
                    required
                  >
                    <option value="" hidden>
                      Vyberte
                    </option>
                    <option value="Jedinec">Jedinec</option>
                    <option value="Maloobchod">Maloobchod</option>
                    <option value="Velkoobchod">Velkoobchod</option>
                  </select>
                </div>
                <div className={`${styles.containerInput}`}>
                  <span className={`${styles.label}`}>
                    Máte představu jak chcete aby Váš e-shop vypadal?
                  </span>
                  <textarea
                    name="eshopInspo"
                    value={formData.eshopInspo}
                    onChange={handleChange}
                    className={`${styles.textarea}`}
                    placeholder="V případě, že víte, uveďte odkazy na e-shopy které se Vám líbí"
                  ></textarea>
                </div>
                <div className={`${styles.containerInput}`}>
                  <span className={`${styles.label}`}>
                    Víte co na e-shopu chcete?
                  </span>
                  <textarea
                    name="eshopFunctions"
                    value={formData.eshopFunctions}
                    onChange={handleChange}
                    className={`${styles.textarea}`}
                    placeholder="V případě, že víte jaké funkce na e-shopu chcete, uveďte je (případně i strukturu e-shopu)"
                  ></textarea>
                </div>
              </>
            ) : (
              <>
                <div className={`${styles.containerInput}`}>
                  <span className={`${styles.label}`}>
                    Co potřebujete?
                    <span className={`${styles.requiredStar}`}> *</span>
                  </span>
                  <textarea
                    name="otherWhatDoYouNeed"
                    value={formData.otherWhatDoYouNeed}
                    onChange={handleChange}
                    className={`${styles.textarea}`}
                    placeholder="Uveďtě Váš dotaz, či zpětnou vazbu"
                    required
                  ></textarea>
                </div>
              </>
            )}
            <div className={`${styles.containerInput}`}>
              <span className={`${styles.label}`}>
                Jaký máte rozpočet?
                <span className={`${styles.requiredStar}`}> *</span>
              </span>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`${styles.input}`}
                placeholder="Uveďte jaký je Váš rozpočet"
                required
              />
            </div>
            {errors.service && (
              <span className={`${styles.error}`}>{errors.service}</span>
            )}
            <button type="submit" className={`${styles.submitBtn}`}>
              Odeslat
            </button>
          </section>
        </form>
      </div>
    </article>
  );
};

export default FormContact;
