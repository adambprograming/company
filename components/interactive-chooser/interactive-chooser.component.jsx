"use client";
// Styles
import styles from "./interactive-chooser.module.scss";
// Public & Assets
import IconCheckCircle from "@/components/svgs/icon-check-circle.component";
import IconInfoCircle from "@/components/svgs/icon-info-circle.component";
import IconArrowBack from "@/components/svgs/icon-arrow-left-circle.component";
import IconXCircle from "../svgs/icon-x-circle.component";
import IconGlobe from "../svgs/interactive-picker-icons/icon-globe.component";
import IconEshop from "../svgs/interactive-picker-icons/icon-eshop.component";
import IconGears from "../svgs/interactive-picker-icons/icon-gears.component";
import IconCheck from "../svgs/interactive-picker-icons/icon-check.component";
import IconTarget from "../svgs/interactive-picker-icons/icon-target.component";
import IconRocket from "../svgs/interactive-picker-icons/icon-rocket.component";
import IconPerson from "../svgs/interactive-picker-icons/icon-person.component";
import IconShop from "../svgs/interactive-picker-icons/icon-shop.component";
import IconWarehouse from "../svgs/interactive-picker-icons/icon-warehouse.component";
// React/Next Functions
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
// Context & Actions

// Componenets
import { Card } from "@/components/card/card.component";
import Btn from "@/components/btn/btn.component";
import { Carousel, CarouselItem } from "../carousel/carousel.component";
import Popup from "../popup/popup.component";

function setInitialValuesToSessionStorage(option, lang) {
  
  var initialValues;
  switch (option) {
    case "web1":
      initialValues = {
        scope: lang("web1.scope"),
        functions: lang("web1.functions"),
        // price: lang("web1.price"),
      };
      break;
    case "web2":
      initialValues = {
        scope: lang("web2.scope"),
        functions: lang("web2.functions"),
        // price: lang("web2.price"),
      };
      break;
    case "web3":
      initialValues = {
        scope: lang("web3.scope"),
        functions: lang("web3.functions"),
        // price: lang("web3.price"),
      };
      break;
    case "eshop1":
      initialValues = {
        scope: lang("eshop1.scope"),
        functions: lang("eshop1.functions"),
        // price: lang("eshop1.price"),
      };
      break;
    case "eshop2":
      initialValues = {
        scope: lang("eshop2.scope"),
        functions: lang("eshop2.functions"),
        // price: lang("eshop2.price"),
      };
      break;
    case "eshop3":
      initialValues = {
        scope: lang("eshop3.scope"),
        functions: lang("eshop3.functions"),
        // price: lang("eshop3.price"),
      };
      break;
    case "webapp":
      initialValues = {
        scope: lang("webapp.scope"),
        functions: lang("webapp.functions"),
      };
      break;
    default:
      break;
  }
  if (initialValues) {
    sessionStorage.setItem("initialFormValues", JSON.stringify(initialValues));
  }
}

/*
INSTRUCTIONS

*/

const InteractiveChooser = () => {
  const lang = useTranslations("components.interactiveChooser");
  const langForFillFormData = useTranslations("components.interactiveChooser.fillFormData")
  const router = useRouter();
  const phoneNumber = "+42077780333073";
  const [popupPhone, setPopupPhone] = useState(false);
  const [widthOfWindow, setWidthOfWindow] = useState(1440);
  useEffect(() => {
    if (popupPhone) {
      setTimeout(() => {
        setPopupPhone(false);
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupPhone]);
  useEffect(() => {
    const getAndSetInnerWidthOfWindow = () => {
      setWidthOfWindow(window.innerWidth);
    };
    getAndSetInnerWidthOfWindow();
    window.addEventListener("resize", getAndSetInnerWidthOfWindow);
    return () => {
      window.removeEventListener("resize", getAndSetInnerWidthOfWindow);
    };
  }, []);
  const [isFirstCardPicked, setIsFirstCardPicked] = useState(false);
  const [firstCardPick, setFirstCardPick] = useState(0);
  const [isSecondCardPicked, setIsSecondCardPicked] = useState(false);
  const [secondCardPick, setSecondCardPick] = useState(0);
  const [isThirdCardPicked, setIsThirdCardPicked] = useState(false);
  const [thirdCardPick, setThirdCardPick] = useState(0);
  const handleFirstCardFirstOptionClick = () => {
    setIsFirstCardPicked(true);
    setFirstCardPick(1);
    // setSecondCardPick(0)
    // setThirdCardPick(0)
  };
  const handleFirstCardSecondOptionClick = () => {
    setIsFirstCardPicked(true);
    setFirstCardPick(2);
    // setSecondCardPick(0)
    // setThirdCardPick(0)
  };
  const handleFirstCardThirdOptionClick = () => {
    setIsFirstCardPicked(true);
    setFirstCardPick(3);
    // setSecondCardPick(0)
    // setThirdCardPick(0)
  };
  const handleSecondCardFirstOptionClick = () => {
    setIsSecondCardPicked(true);
    setSecondCardPick(1);
    // setThirdCardPick(0)
  };
  const handleSecondCardSecondOptionClick = () => {
    setIsSecondCardPicked(true);
    setSecondCardPick(2);
    // setThirdCardPick(0)
  };
  const handleSecondCardThirdOptionClick = () => {
    setIsSecondCardPicked(true);
    setSecondCardPick(3);
    // setThirdCardPick(0)
  };
  const handlePrevious = () => {
    // If first is choosed, is second choosed ? if true, is next choosed? if not reset last choosedPick
    if (isFirstCardPicked) {
      if (isSecondCardPicked) {
        if (isThirdCardPicked) {
          setIsThirdCardPicked(false);
        } else {
          setIsSecondCardPicked(false);
        }
      } else {
        setIsFirstCardPicked(false);
      }
    }
  };
  const handleResetFromFirst = () => {
    setIsFirstCardPicked(false);
    setIsSecondCardPicked(false);
    setIsThirdCardPicked(false);
  };
  const handleResetFromSecond = () => {
    setIsSecondCardPicked(false);
    setIsThirdCardPicked(false);
  };

  const handleCallOrCopyNumber = () => {
    const userAgent = navigator.userAgent || window.opera;
    // Check, if device have phone functions
    if (/android|iphone|ipad|iPod/i.test(userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // If not (so desktop), just copy phone
      navigator.clipboard.writeText(phoneNumber).then(
        () => {
          setPopupPhone(true);
        },
        () => {}
      );
    }
  };

  const handleFillForm = (option) => {
    setInitialValuesToSessionStorage(option, langForFillFormData);
    router.push("/kontakt#form", {scroll: true});
  }

  return (
    <div className={`${styles.interactiveChooserContainer}`}>
      {/* PATH */}
      <div className={`${styles.pathChooser}`}>
        <div
          className={`${styles.pathArrow} ${
            isFirstCardPicked ? styles.active : styles.disactive
          }`}
        >
          <Btn
            disabled={!isFirstCardPicked}
            functionOnClick={handlePrevious}
            bgColor="none"
            borderSize="0"
            hoverEffect="scaleBackward"
            ariaLabel={lang("btn.0.aria")}
          >
            <IconArrowBack width={25} height={25} />
          </Btn>
        </div>
        <div
          className={`${styles.pathFirst} ${
            isFirstCardPicked ? styles.active : styles.disactive
          }`}
        >
          <Btn
            functionOnClick={handleResetFromFirst}
            bgColor="none"
            borderSize="0"
            hoverEffect="scaleBackward"
            paddingOfBtn="10px"
            ariaLabel={lang("btn.1.aria")}
          >
            {lang("btn.1.content")}
          </Btn>
        </div>
        <div
          className={`${styles.pathSecond} ${
            isSecondCardPicked ? styles.active : styles.disactive
          }`}
        >
          <Btn
            functionOnClick={handleResetFromSecond}
            bgColor="none"
            borderSize="0"
            hoverEffect="scaleBackward"
            paddingOfBtn="10px"
            ariaLabel={lang("btn.2.aria")}
          >{`/ ${
            firstCardPick === 1
              ? lang("btn.2.content.0")
              : firstCardPick === 2
              ? lang("btn.2.content.1")
              : ""
          }`}</Btn>
        </div>
        {/* <div
          className={`${styles.pathThird} ${
            isThirdCardPicked ? styles.active : styles.disactive
          }`}
        >
          <Btn
            functionOnClick={handleResetFromSecond}
            bgColor="none"
            borderSize="0"
            hoverEffect="scaleBackward"
            paddingOfBtn="10px"
            ariaLabel=""
          >{`/ ${
            firstCardPick === 1
              ? ""
              : firstCardPick === 2
              ? ""
              : ""
          }`}</Btn>
        </div> */}
      </div>
      <div className={`${styles.interactiveChooser}`}>
        {/* FIRST PICK */}
        <div className={`${styles.cardContainer} ${styles.firstCardContainer}`}>
          <Card
            gapFlex="25px"
            paddingOfCard="100px 0px 160px 0px"
            bgColor="rgb(from var(--color-primary) r g b / 0.15)"
            borderSize="none"
            borderRadius="15px"
          >
            <div className={`${styles.titleContainer}`}>
              <span>{lang("card.0.subtitle")}</span>
              <h1>
                {lang("card.0.title.0")}
                <strong>{lang("card.0.title.1")}</strong>
                {lang("card.0.title.2")}
              </h1>
              <hr />
            </div>
            <div
              className={`${styles.chooseContainer} ${
                widthOfWindow < 880 ? styles.carousel : styles.inline
              }`}
            >
              {widthOfWindow < 880 ? (
                <Carousel
                  fullWidth={true}
                  backdropFilterArrows=""
                  infinite="pseudoInfinite"
                >
                  <CarouselItem>
                    <Btn
                      functionOnClick={handleFirstCardFirstOptionClick}
                      paddingOfBtn="20px 10px"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="10px"
                      bgHoverColor="var(--black-10)"
                      hoverEffect="bgHover"
                      ariaLabel={lang("card.0.btn.0.aria")}
                    >
                      <div className={`${styles.imgContainer}`}>
                        <IconGlobe height={75} />
                      </div>
                      <div className={`${styles.descriptionContainer}`}>
                        <span className={`${styles.btnTitle}`}>
                          {lang("card.0.btn.0.content.title")}
                        </span>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.0.content.list.0")}</p>
                        </div>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.0.content.list.1")}</p>
                        </div>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.0.content.list.2")}</p>
                        </div>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.0.content.list.3")}</p>
                        </div>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.0.content.list.4")}</p>
                        </div>
                      </div>
                    </Btn>
                  </CarouselItem>
                  <CarouselItem>
                    <Btn
                      functionOnClick={handleFirstCardSecondOptionClick}
                      paddingOfBtn="20px 10px"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="10px"
                      bgHoverColor="var(--black-10)"
                      hoverEffect="bgHover"
                      ariaLabel={lang("card.0.btn.1.aria")}
                    >
                      <div className={`${styles.imgContainer}`}>
                        <IconEshop height={75} />
                      </div>
                      <div className={`${styles.descriptionContainer}`}>
                        <span className={`${styles.btnTitle}`}>
                          {lang("card.0.btn.1.content.title")}
                        </span>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.1.content.list.0")}</p>
                        </div>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.1.content.list.1")}</p>
                        </div>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>
                            {lang("card.0.btn.1.content.list.2.0")}
                            <br />
                            {lang("card.0.btn.1.content.list.2.1")}
                            <br />
                            {lang("card.0.btn.1.content.list.2.2")}
                          </p>
                        </div>
                      </div>
                    </Btn>
                  </CarouselItem>
                  <CarouselItem>
                    <Btn
                      functionOnClick={handleFirstCardThirdOptionClick}
                      paddingOfBtn="20px 10px"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="10px"
                      bgHoverColor="var(--black-10)"
                      hoverEffect="bgHover"
                      ariaLabel={lang("card.0.btn.2.aria")}
                    >
                      <div className={`${styles.imgContainer}`}>
                        <IconGears height={75} />
                      </div>
                      <div className={`${styles.descriptionContainer}`}>
                        <span className={`${styles.btnTitle}`}>
                          {lang("card.0.btn.2.content.title")}
                        </span>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.2.content.list.0")}</p>
                        </div>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>{lang("card.0.btn.2.content.list.1")}</p>
                        </div>
                        <div>
                          <span>
                            <IconCheckCircle
                              style={{ color: "var(--color-success)" }}
                            />
                          </span>
                          <p>
                            {lang("card.0.btn.2.content.list.2.0")}
                            <br />
                            {lang("card.0.btn.2.content.list.2.1")}
                          </p>
                        </div>
                      </div>
                    </Btn>
                  </CarouselItem>
                </Carousel>
              ) : (
                <>
                  <Btn
                    functionOnClick={handleFirstCardFirstOptionClick}
                    paddingOfBtn="20px 10px"
                    bgColor="transparent"
                    borderSize="none"
                    borderRadius="10px"
                    bgHoverColor="var(--black-10)"
                    hoverEffect="bgHover"
                    ariaLabel={lang("card.0.btn.0.aria")}
                  >
                    <div className={`${styles.imgContainer}`}>
                      <IconGlobe height={75} />
                    </div>
                    <div className={`${styles.descriptionContainer}`}>
                      <span className={`${styles.btnTitle}`}>
                        {lang("card.0.btn.0.content.title")}
                      </span>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.0.content.list.0")}</p>
                      </div>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.0.content.list.1")}</p>
                      </div>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.0.content.list.2")}</p>
                      </div>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.0.content.list.3")}</p>
                      </div>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.0.content.list.4")}</p>
                      </div>
                    </div>
                  </Btn>
                  <Btn
                    functionOnClick={handleFirstCardSecondOptionClick}
                    paddingOfBtn="20px 10px"
                    bgColor="transparent"
                    borderSize="none"
                    borderRadius="10px"
                    bgHoverColor="var(--black-10)"
                    hoverEffect="bgHover"
                    ariaLabel={lang("card.0.btn.1.aria")}
                  >
                    <div className={`${styles.imgContainer}`}>
                      <IconEshop height={75} />
                    </div>
                    <div className={`${styles.descriptionContainer}`}>
                      <span className={`${styles.btnTitle}`}>
                        {lang("card.0.btn.1.content.title")}
                      </span>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.1.content.list.0")}</p>
                      </div>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.1.content.list.1")}</p>
                      </div>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>
                          {lang("card.0.btn.1.content.list.2.0")}
                          <br />
                          {lang("card.0.btn.1.content.list.2.1")}
                          <br />
                          {lang("card.0.btn.1.content.list.2.2")}
                        </p>
                      </div>
                    </div>
                  </Btn>
                  <Btn
                    functionOnClick={handleFirstCardThirdOptionClick}
                    paddingOfBtn="20px 10px"
                    bgColor="transparent"
                    borderSize="none"
                    borderRadius="10px"
                    bgHoverColor="var(--black-10)"
                    hoverEffect="bgHover"
                    ariaLabel={lang("card.0.btn.2.aria")}
                  >
                    <div className={`${styles.imgContainer}`}>
                      <IconGears height={75} />
                    </div>
                    <div className={`${styles.descriptionContainer}`}>
                      <span className={`${styles.btnTitle}`}>
                        {lang("card.0.btn.2.content.title")}
                      </span>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.2.content.list.0")}</p>
                      </div>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>{lang("card.0.btn.2.content.list.1")}</p>
                      </div>
                      <div>
                        <span>
                          <IconCheckCircle
                            style={{ color: "var(--color-success)" }}
                          />
                        </span>
                        <p>
                          {lang("card.0.btn.2.content.list.2.0")}
                          <br />
                          {lang("card.0.btn.2.content.list.2.1")}
                        </p>
                      </div>
                    </div>
                  </Btn>
                </>
              )}
            </div>
          </Card>
        </div>
        {/* SECOND PICK */}
        <div
          className={`${styles.cardContainer} ${
            isFirstCardPicked ? styles.active : styles.disactive
          } ${styles.secondCardContainer}`}
        >
          <Card
            height="calc(100% - 160px)"
            gapFlex="25px"
            paddingOfCard="80px 25px"
            bgColor="rgb(from var(--color-primary) r g b / 0.2)"
            borderSize="none"
            borderRadius="15px"
          >
            {firstCardPick === 1 ? (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.1.subtitle")}</span>
                  <h1>
                    {lang("card.1.title.0")}
                    <strong>{lang("card.1.title.1")}</strong>
                    {lang("card.1.title.2")}
                  </h1>
                  <hr />
                </div>
                <div
                  className={`${styles.chooseContainer} ${
                    widthOfWindow < 880 ? styles.carousel : styles.inline
                  }`}
                >
                  {widthOfWindow < 880 ? (
                    <Carousel
                      fullWidth={true}
                      backdropFilterArrows=""
                      infinite="pseudoInfinite"
                    >
                      <CarouselItem>
                        <Btn
                          functionOnClick={handleSecondCardFirstOptionClick}
                          bgColor="transparent"
                          borderSize="none"
                          borderRadius="15px"
                          bgHoverColor="var(--black-10)"
                          hoverEffect="bgHover"
                          ariaLabel={lang("card.1.btn.0.aria")}
                        >
                          <div className={`${styles.imgContainer}`}>
                            <IconCheck height={75} />
                          </div>
                          <div className={`${styles.descriptionContainer}`}>
                            <span className={`${styles.btnTitle}`}>
                              {lang("card.1.btn.0.content.title")}
                            </span>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.0.content.list.0")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.0.content.list.1")}</p>
                            </div>
                            <div>
                              <span>
                                <IconXCircle
                                  style={{ color: "var(--color-error)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.0.content.list.2")}</p>
                            </div>
                            <div>
                              <span>
                                <IconXCircle
                                  style={{ color: "var(--color-error)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.0.content.list.3")}</p>
                            </div>
                            <div>
                              <span>
                                <IconXCircle
                                  style={{ color: "var(--color-error)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.0.content.list.4")}</p>
                            </div>
                          </div>
                        </Btn>
                      </CarouselItem>
                      <CarouselItem>
                        <Btn
                          functionOnClick={handleSecondCardSecondOptionClick}
                          bgColor="transparent"
                          borderSize="none"
                          borderRadius="15px"
                          bgHoverColor="var(--black-10)"
                          hoverEffect="bgHover"
                          ariaLabel={lang("card.1.btn.1.aria")}
                        >
                          <div className={`${styles.imgContainer}`}>
                            <IconTarget height={75} />
                          </div>
                          <div className={`${styles.descriptionContainer}`}>
                            <span className={`${styles.btnTitle}`}>
                              {lang("card.1.btn.1.content.title")}
                            </span>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.1.content.list.0")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.1.content.list.1")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.1.content.list.2")}</p>
                            </div>
                            <div>
                              <span>
                                <IconXCircle
                                  style={{ color: "var(--color-error)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.1.content.list.3")}</p>
                            </div>
                            <div>
                              <span>
                                <IconXCircle
                                  style={{ color: "var(--color-error)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.1.content.list.4")}</p>
                            </div>
                          </div>
                        </Btn>
                      </CarouselItem>
                      <CarouselItem>
                        <Btn
                          functionOnClick={handleSecondCardSecondOptionClick}
                          bgColor="transparent"
                          borderSize="none"
                          borderRadius="15px"
                          bgHoverColor="var(--black-10)"
                          hoverEffect="bgHover"
                          ariaLabel={lang("card.1.btn.2.aria")}
                        >
                          <div className={`${styles.imgContainer}`}>
                            <IconRocket height={75} />
                          </div>
                          <div className={`${styles.descriptionContainer}`}>
                            <span className={`${styles.btnTitle}`}>
                              {lang("card.1.btn.2.content.title")}
                            </span>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.2.content.list.0")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.2.content.list.1")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.2.content.list.2")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.2.content.list.3")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.1.btn.2.content.list.4")}</p>
                            </div>
                          </div>
                        </Btn>
                      </CarouselItem>
                    </Carousel>
                  ) : (
                    <>
                      <Btn
                        functionOnClick={handleSecondCardFirstOptionClick}
                        bgColor="transparent"
                        borderSize="none"
                        borderRadius="15px"
                        bgHoverColor="var(--black-10)"
                        hoverEffect="bgHover"
                        ariaLabel={lang("card.1.btn.0.aria")}
                      >
                        <div className={`${styles.imgContainer}`}>
                          <IconCheck height={75} />
                        </div>
                        <div className={`${styles.descriptionContainer}`}>
                          <span className={`${styles.btnTitle}`}>
                            {lang("card.1.btn.0.content.title")}
                          </span>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.0.content.list.0")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.0.content.list.1")}</p>
                          </div>
                          <div>
                            <span>
                              <IconXCircle
                                style={{ color: "var(--color-error)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.0.content.list.2")}</p>
                          </div>
                          <div>
                            <span>
                              <IconXCircle
                                style={{ color: "var(--color-error)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.0.content.list.3")}</p>
                          </div>
                          <div>
                            <span>
                              <IconXCircle
                                style={{ color: "var(--color-error)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.0.content.list.4")}</p>
                          </div>
                        </div>
                      </Btn>
                      <Btn
                        functionOnClick={handleSecondCardSecondOptionClick}
                        bgColor="transparent"
                        borderSize="none"
                        borderRadius="15px"
                        bgHoverColor="var(--black-10)"
                        hoverEffect="bgHover"
                        ariaLabel={lang("card.1.btn.1.aria")}
                      >
                        <div className={`${styles.imgContainer}`}>
                          <IconTarget height={75} />
                        </div>
                        <div className={`${styles.descriptionContainer}`}>
                          <span className={`${styles.btnTitle}`}>
                            {lang("card.1.btn.1.content.title")}
                          </span>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.1.content.list.0")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.1.content.list.1")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.1.content.list.2")}</p>
                          </div>
                          <div>
                            <span>
                              <IconXCircle
                                style={{ color: "var(--color-error)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.1.content.list.3")}</p>
                          </div>
                          <div>
                            <span>
                              <IconXCircle
                                style={{ color: "var(--color-error)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.1.content.list.4")}</p>
                          </div>
                        </div>
                      </Btn>
                      <Btn
                        functionOnClick={handleSecondCardThirdOptionClick}
                        bgColor="transparent"
                        borderSize="none"
                        borderRadius="15px"
                        bgHoverColor="var(--black-10)"
                        hoverEffect="bgHover"
                        ariaLabel={lang("card.1.btn.2.aria")}
                      >
                        <div className={`${styles.imgContainer}`}>
                          <IconRocket height={75} />
                        </div>
                        <div className={`${styles.descriptionContainer}`}>
                          <span className={`${styles.btnTitle}`}>
                            {lang("card.1.btn.2.content.title")}
                          </span>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.2.content.list.0")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.2.content.list.1")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.2.content.list.2")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.2.content.list.3")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.1.btn.2.content.list.4")}</p>
                          </div>
                        </div>
                      </Btn>
                    </>
                  )}
                </div>
                <div className={`${styles.infoContainer}`}>
                  <div>
                    <span>
                      <IconInfoCircle style={{ fill: "var(--shadow-25)" }} />
                    </span>
                    <p>{lang("info.0")}</p>
                  </div>
                  <div>
                    <span>
                      <IconInfoCircle style={{ fill: "var(--shadow-25)" }} />
                    </span>
                    <p>{lang("info.1")}</p>
                  </div>
                </div>
              </>
            ) : firstCardPick === 2 ? (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.2.subtitle")}</span>
                  <h1>
                    {lang("card.2.title.0")}
                    <strong>{lang("card.2.title.1")}</strong>
                    {lang("card.2.title.2")}
                  </h1>
                  <hr />
                </div>
                <div
                  className={`${styles.chooseContainer} ${
                    widthOfWindow < 880 ? styles.carousel : styles.inline
                  }`}
                >
                  {widthOfWindow < 880 ? (
                    <Carousel
                      fullWidth={true}
                      backdropFilterArrows=""
                      infinite="pseudoInfinite"
                    >
                      <CarouselItem>
                        <Btn
                          functionOnClick={handleSecondCardFirstOptionClick}
                          bgColor="transparent"
                          borderSize="none"
                          borderRadius="15px"
                          bgHoverColor="var(--black-10)"
                          hoverEffect="bgHover"
                          ariaLabel={lang("card.2.btn.0.aria")}
                        >
                          <div className={`${styles.imgContainer}`}>
                            <IconPerson height={75} />
                          </div>
                          <div className={`${styles.descriptionContainer}`}>
                            <span className={`${styles.btnTitle}`}>
                              {lang("card.2.btn.0.content.title")}
                            </span>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.0.content.list.0")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.0.content.list.1")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.0.content.list.2")}</p>
                            </div>
                            <div>
                              <span>
                                <IconXCircle
                                  style={{ color: "var(--color-error)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.0.content.list.3")}</p>
                            </div>
                            <div>
                              <span>
                                <IconXCircle
                                  style={{ color: "var(--color-error)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.0.content.list.4")}</p>
                            </div>
                          </div>
                        </Btn>
                      </CarouselItem>
                      <CarouselItem>
                        <Btn
                          functionOnClick={handleSecondCardSecondOptionClick}
                          bgColor="transparent"
                          borderSize="none"
                          borderRadius="15px"
                          bgHoverColor="var(--black-10)"
                          hoverEffect="bgHover"
                          ariaLabel={lang("card.2.btn.1.aria")}
                        >
                          <div className={`${styles.imgContainer}`}>
                            <IconShop height={75} />
                          </div>
                          <div className={`${styles.descriptionContainer}`}>
                            <span className={`${styles.btnTitle}`}>
                              {lang("card.2.btn.1.content.title")}
                            </span>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.1.content.list.0")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.1.content.list.1")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.1.content.list.2")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.1.content.list.3")}</p>
                            </div>
                            <div>
                              <span>
                                <IconXCircle
                                  style={{ color: "var(--color-error)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.1.content.list.4")}</p>
                            </div>
                          </div>
                        </Btn>
                      </CarouselItem>
                      <CarouselItem>
                        <Btn
                          functionOnClick={handleSecondCardThirdOptionClick}
                          bgColor="transparent"
                          borderSize="none"
                          borderRadius="15px"
                          bgHoverColor="var(--black-10)"
                          hoverEffect="bgHover"
                          ariaLabel={lang("card.2.btn.2.aria")}
                        >
                          <div className={`${styles.imgContainer}`}>
                            <IconWarehouse height={75} />
                          </div>
                          <div className={`${styles.descriptionContainer}`}>
                            <span className={`${styles.btnTitle}`}>
                              {lang("card.2.btn.2.content.title")}
                            </span>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.2.content.list.0")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.2.content.list.1")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.2.content.list.2")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.2.content.list.3")}</p>
                            </div>
                            <div>
                              <span>
                                <IconCheckCircle
                                  style={{ color: "var(--color-success)" }}
                                />
                              </span>
                              <p>{lang("card.2.btn.2.content.list.4")}</p>
                            </div>
                          </div>
                        </Btn>
                      </CarouselItem>
                    </Carousel>
                  ) : (
                    <>
                      <Btn
                        functionOnClick={handleSecondCardFirstOptionClick}
                        bgColor="transparent"
                        borderSize="none"
                        borderRadius="15px"
                        bgHoverColor="var(--black-10)"
                        hoverEffect="bgHover"
                        ariaLabel={lang("card.2.btn.0.aria")}
                      >
                        <div className={`${styles.imgContainer}`}>
                          <IconPerson height={75} />
                        </div>
                        <div className={`${styles.descriptionContainer}`}>
                          <span className={`${styles.btnTitle}`}>
                            {lang("card.2.btn.0.content.title")}
                          </span>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.0.content.list.0")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.0.content.list.1")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.0.content.list.2")}</p>
                          </div>
                          <div>
                            <span>
                              <IconXCircle
                                style={{ color: "var(--color-error)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.0.content.list.3")}</p>
                          </div>
                          <div>
                            <span>
                              <IconXCircle
                                style={{ color: "var(--color-error)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.0.content.list.4")}</p>
                          </div>
                        </div>
                      </Btn>
                      <Btn
                        functionOnClick={handleSecondCardSecondOptionClick}
                        bgColor="transparent"
                        borderSize="none"
                        borderRadius="15px"
                        bgHoverColor="var(--black-10)"
                        hoverEffect="bgHover"
                        ariaLabel={lang("card.2.btn.1.aria")}
                      >
                        <div className={`${styles.imgContainer}`}>
                          <IconShop height={75} />
                        </div>
                        <div className={`${styles.descriptionContainer}`}>
                          <span className={`${styles.btnTitle}`}>
                            {lang("card.2.btn.1.content.title")}
                          </span>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.1.content.list.0")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.1.content.list.1")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.1.content.list.2")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.1.content.list.3")}</p>
                          </div>
                          <div>
                            <span>
                              <IconXCircle
                                style={{ color: "var(--color-error)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.1.content.list.4")}</p>
                          </div>
                        </div>
                      </Btn>
                      <Btn
                        functionOnClick={handleSecondCardThirdOptionClick}
                        bgColor="transparent"
                        borderSize="none"
                        borderRadius="15px"
                        bgHoverColor="var(--black-10)"
                        hoverEffect="bgHover"
                        ariaLabel={lang("card.2.btn.2.aria")}
                      >
                        <div className={`${styles.imgContainer}`}>
                          <IconWarehouse height={75} />
                        </div>
                        <div className={`${styles.descriptionContainer}`}>
                          <span className={`${styles.btnTitle}`}>
                            {lang("card.2.btn.2.content.title")}
                          </span>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.2.content.list.0")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.2.content.list.1")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.2.content.list.2")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.2.content.list.3")}</p>
                          </div>
                          <div>
                            <span>
                              <IconCheckCircle
                                style={{ color: "var(--color-success)" }}
                              />
                            </span>
                            <p>{lang("card.2.btn.2.content.list.4")}</p>
                          </div>
                        </div>
                      </Btn>
                    </>
                  )}
                </div>
                <div className={`${styles.infoContainer}`}>
                  <div>
                    <span>
                      <IconInfoCircle style={{ fill: "var(--shadow-25)" }} />
                    </span>
                    <p>{lang("info.0")}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.3.subtitle")}</span>
                  <h1>
                    {lang("card.3.title.0")}
                    <strong>{lang("card.3.title.1")}</strong>
                  </h1>
                  <hr />
                </div>
                <div className={`${styles.contentContainer}`}>
                  <div className={`${styles.categoryDescription}`}>
                    <p>{lang("card.3.text")}</p>
                  </div>
                  <div className={`${styles.checkboxDescription}`}>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.3.list.0")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.3.list.1")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.3.list.2")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.3.list.3")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.3.list.4")}</p>
                    </div>
                  </div>
                  <div className={`${styles.ctaBtns}`}>
                    <Btn
                      functionOnClick={() => {handleFillForm("webapp")}}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="var(--color-secondary)"
                      textColor="var(--color-text)"
                      borderSize="none"
                      borderRadius="15px"
                      fontWeight="600"
                      hoverEffect="scaleForward"
                      ariaLabel={lang("btn.3.aria")}
                    >
                      {lang("btn.3.content")}
                    </Btn>
                    <Btn
                      functionOnClick={handleCallOrCopyNumber}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="15px"
                      bgHoverColor="var(--color-primary)"
                      textHoverColor="var(--color-text-reverse)"
                      fontWeight="600"
                      hoverEffect="cfLeft"
                      ariaLabel={lang("btn.4.aria")}
                    >
                      {lang("btn.4.content")}
                    </Btn>
                    <Popup
                      top="105%"
                      left="calc(50% + clamp(50px, 50%, 125px))"
                      state={popupPhone}
                    >
                      {lang("popup")}
                    </Popup>
                  </div>
                  {/* <div className={`${styles.infoContainer}`}>
                    <div><span><IconInfoCircle style={{fill: "var(--shadow-25)"}}/></span><p>{lang('info.2')}</p></div>
                  </div> */}
                </div>
              </>
            )}
          </Card>
        </div>
        {/* THIRD PICK - CONTENT */}
        <div
          className={`${styles.cardContainer} ${
            isSecondCardPicked ? styles.active : styles.disactive
          } ${styles.thirdCardContainer}`}
        >
          <Card
            height="calc(100% - 120px)"
            gapFlex="25px"
            paddingOfCard="60px 25px"
            bgColor="rgb(from var(--color-primary) r g b / 0.25)"
            borderSize="none"
            borderRadius="15px"
          >
            {firstCardPick === 1 && secondCardPick === 1 ? (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.4.subtitle")}</span>
                  <h1>
                    <strong>{lang("card.4.title.0")}</strong>
                    {lang("card.4.title.1")}
                  </h1>
                  <hr />
                </div>
                <div className={`${styles.contentContainer}`}>
                  <div className={`${styles.categoryDescription}`}>
                    <p>{lang("card.4.text")}</p>
                  </div>
                  <div className={`${styles.checkboxDescription}`}>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.4.list.0")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.4.list.1")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.4.list.2")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.4.list.3")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.4.list.4")}</p>
                    </div>
                    <div>
                      <span>
                        <IconInfoCircle style={{ fill: "var(--shadow-25)" }} />
                      </span>
                      <p>{lang("card.4.list.5")}</p>
                    </div>
                  </div>
                  <div className={`${styles.ctaBtns}`}>
                    <Btn
                      functionOnClick={() => {handleFillForm("web1")}}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="var(--color-secondary)"
                      textColor="var(--color-text)"
                      borderSize="none"
                      borderRadius="15px"
                      fontWeight="600"
                      hoverEffect="scaleForward"
                      ariaLabel={lang("btn.3.aria")}
                    >
                      {lang("btn.3.content")}
                    </Btn>
                    <Btn
                      functionOnClick={handleCallOrCopyNumber}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="15px"
                      bgHoverColor="var(--color-primary)"
                      textHoverColor="var(--color-text-reverse)"
                      fontWeight="600"
                      hoverEffect="cfLeft"
                      ariaLabel={lang("btn.4.aria")}
                    >
                      {lang("btn.4.content")}
                    </Btn>
                    <Popup
                      top="105%"
                      left="calc(50% + clamp(50px, 50%, 125px))"
                      state={popupPhone}
                    >
                      {lang("popup")}
                    </Popup>
                  </div>
                  {/* <div className={`${styles.infoContainer}`}>
                    <h4>{lang('card.4.price')}</h4>
                    <div><span><IconInfoCircle style={{fill: "var(--shadow-25)"}}/></span><p>{lang('info.3')}</p></div>
                  </div> */}
                </div>
              </>
            ) : firstCardPick === 1 && secondCardPick === 2 ? (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.5.subtitle")}</span>
                  <h1>
                    <strong>{lang("card.5.title.0")}</strong>
                    {lang("card.5.title.1")}
                  </h1>
                  <hr />
                </div>
                <div className={`${styles.contentContainer}`}>
                  <div className={`${styles.categoryDescription}`}>
                    <p>{lang("card.5.text")}</p>
                  </div>
                  <div className={`${styles.checkboxDescription}`}>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.5.list.0")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.5.list.1")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.5.list.2")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.5.list.3")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.5.list.4")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.5.list.5")}</p>
                    </div>
                    <div>
                      <span>
                        <IconInfoCircle style={{ fill: "var(--shadow-25)" }} />
                      </span>
                      <p>{lang("card.5.list.6")}</p>
                    </div>
                  </div>
                  <div className={`${styles.ctaBtns}`}>
                    <Btn
                      functionOnClick={() => {handleFillForm("web2")}}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="var(--color-secondary)"
                      textColor="var(--color-text)"
                      borderSize="none"
                      borderRadius="15px"
                      fontWeight="600"
                      hoverEffect="scaleForward"
                      ariaLabel={lang("btn.3.aria")}
                    >
                      {lang("btn.3.content")}
                    </Btn>
                    <Btn
                      functionOnClick={handleCallOrCopyNumber}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="15px"
                      bgHoverColor="var(--color-primary)"
                      textHoverColor="var(--color-text-reverse)"
                      fontWeight="600"
                      hoverEffect="cfLeft"
                      ariaLabel={lang("btn.4.aria")}
                    >
                      {lang("btn.4.content")}
                    </Btn>
                    <Popup
                      top="105%"
                      left="calc(50% + clamp(50px, 50%, 125px))"
                      state={popupPhone}
                    >
                      {lang("popup")}
                    </Popup>
                  </div>
                  {/* <div className={`${styles.infoContainer}`}>
                    <h4>{lang('card.5.price')}</h4>
                    <div><span><IconInfoCircle style={{fill: "var(--shadow-25)"}}/></span><p>{lang('info.3')}</p></div>
                  </div> */}
                </div>
              </>
            ) : firstCardPick === 1 && secondCardPick === 3 ? (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.6.subtitle")}</span>
                  <h1>
                    <strong>{lang("card.6.title.0")}</strong>
                    {lang("card.6.title.1")}
                  </h1>
                  <hr />
                </div>
                <div className={`${styles.contentContainer}`}>
                  <div className={`${styles.categoryDescription}`}>
                    <p>{lang("card.6.text")}</p>
                  </div>
                  <div className={`${styles.checkboxDescription}`}>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.6.list.0")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.6.list.1")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.6.list.2")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.6.list.3")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.6.list.4")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.6.list.5")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.6.list.6")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.6.list.7")}</p>
                    </div>
                  </div>
                  <div className={`${styles.ctaBtns}`}>
                    <Btn
                      functionOnClick={() => {handleFillForm("web3")}}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="var(--color-secondary)"
                      textColor="var(--color-text)"
                      borderSize="none"
                      borderRadius="15px"
                      fontWeight="600"
                      hoverEffect="scaleForward"
                      ariaLabel={lang("btn.3.aria")}
                    >
                      {lang("btn.3.content")}
                    </Btn>
                    <Btn
                      functionOnClick={handleCallOrCopyNumber}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="15px"
                      bgHoverColor="var(--color-primary)"
                      textHoverColor="var(--color-text-reverse)"
                      fontWeight="600"
                      hoverEffect="cfLeft"
                      ariaLabel={lang("btn.4.aria")}
                    >
                      {lang("btn.4.content")}
                    </Btn>
                    <Popup
                      top="105%"
                      left="calc(50% + clamp(50px, 50%, 125px))"
                      state={popupPhone}
                    >
                      {lang("popup")}
                    </Popup>
                  </div>
                  {/* <div className={`${styles.infoContainer}`}>
                    <h4>{lang('card.6.price')}</h4>
                    <div><span><IconInfoCircle style={{fill: "var(--shadow-25)"}}/></span><p>{lang('info.3')}</p></div>
                  </div> */}
                </div>
              </>
            ) : firstCardPick === 2 && secondCardPick === 1 ? (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.7.subtitle")}</span>
                  <h1>
                    <strong>{lang("card.7.title.0")}</strong>
                    {lang("card.7.title.1")}
                  </h1>
                  <hr />
                </div>
                <div className={`${styles.contentContainer}`}>
                  <div className={`${styles.categoryDescription}`}>
                    <p>{lang("card.7.text")}</p>
                  </div>
                  <div className={`${styles.checkboxDescription}`}>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.7.list.0")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.7.list.1")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.7.list.2")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.7.list.3")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.7.list.4")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.7.list.5")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.7.list.6")}</p>
                    </div>
                    <div>
                      <span>
                        <IconInfoCircle style={{ fill: "var(--shadow-25)" }} />
                      </span>
                      <p>{lang("card.7.list.7")}</p>
                    </div>
                  </div>
                  <div className={`${styles.ctaBtns}`}>
                    <Btn
                      functionOnClick={() => {handleFillForm("eshop1")}}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="var(--color-secondary)"
                      textColor="var(--color-text)"
                      borderSize="none"
                      borderRadius="15px"
                      fontWeight="600"
                      hoverEffect="scaleForward"
                      ariaLabel={lang("btn.3.aria")}
                    >
                      {lang("btn.3.content")}
                    </Btn>
                    <Btn
                      functionOnClick={handleCallOrCopyNumber}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="15px"
                      bgHoverColor="var(--color-primary)"
                      textHoverColor="var(--color-text-reverse)"
                      fontWeight="600"
                      hoverEffect="cfLeft"
                      ariaLabel={lang("btn.4.aria")}
                    >
                      {lang("btn.4.content")}
                    </Btn>
                    <Popup
                      top="105%"
                      left="calc(50% + clamp(50px, 50%, 125px))"
                      state={popupPhone}
                    >
                      {lang("popup")}
                    </Popup>
                  </div>
                  {/* <div className={`${styles.infoContainer}`}>
                    <h4>{lang('card.7.price')}</h4>
                    <div><span><IconInfoCircle style={{fill: "var(--shadow-25)"}}/></span><p>{lang('info.3')}</p></div>
                  </div> */}
                </div>
              </>
            ) : firstCardPick === 2 && secondCardPick === 2 ? (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.8.subtitle")}</span>
                  <h1>
                    <strong>{lang("card.8.title.0")}</strong>
                    {lang("card.8.title.1")}
                  </h1>
                  <hr />
                </div>
                <div className={`${styles.contentContainer}`}>
                  <div className={`${styles.categoryDescription}`}>
                    <p>{lang("card.8.text")}</p>
                  </div>
                  <div className={`${styles.checkboxDescription}`}>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.0")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.1")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.2")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.3")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.4")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.5")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.6")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.7")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.8.list.8")}</p>
                    </div>
                    <div>
                      <span>
                        <IconInfoCircle style={{ fill: "var(--shadow-25)" }} />
                      </span>
                      <p>{lang("card.8.list.9")}</p>
                    </div>
                  </div>
                  <div className={`${styles.ctaBtns}`}>
                    <Btn
                      functionOnClick={() => {handleFillForm("eshop2")}}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="var(--color-secondary)"
                      textColor="var(--color-text)"
                      borderSize="none"
                      borderRadius="15px"
                      fontWeight="600"
                      hoverEffect="scaleForward"
                      ariaLabel={lang("btn.3.aria")}
                    >
                      {lang("btn.3.content")}
                    </Btn>
                    <Btn
                      functionOnClick={handleCallOrCopyNumber}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="15px"
                      bgHoverColor="var(--color-primary)"
                      textHoverColor="var(--color-text-reverse)"
                      fontWeight="600"
                      hoverEffect="cfLeft"
                      ariaLabel={lang("btn.4.aria")}
                    >
                      {lang("btn.4.content")}
                    </Btn>
                    <Popup
                      top="105%"
                      left="calc(50% + clamp(50px, 50%, 125px))"
                      state={popupPhone}
                    >
                      {lang("popup")}
                    </Popup>
                  </div>
                  {/* <div className={`${styles.infoContainer}`}>
                    <h4>{lang('card.8.price')}</h4>
                    <div><span><IconInfoCircle style={{fill: "var(--shadow-25)"}}/></span><p>{lang('info.3')}</p></div>
                  </div> */}
                </div>
              </>
            ) : (
              <>
                <div className={`${styles.titleContainer}`}>
                  <span>{lang("card.9.subtitle")}</span>
                  <h1>
                    <strong>{lang("card.9.title.0")}</strong>
                    {lang("card.9.title.1")}
                  </h1>
                  <hr />
                </div>
                <div className={`${styles.contentContainer}`}>
                  <div className={`${styles.categoryDescription}`}>
                    <p>{lang("card.9.text")}</p>
                  </div>
                  <div className={`${styles.checkboxDescription}`}>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.0")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.1")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.2")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.3")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.4")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.5")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.6")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.7")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.8")}</p>
                    </div>
                    <div>
                      <span>
                        <IconCheckCircle
                          style={{ color: "var(--color-success)" }}
                        />
                      </span>
                      <p>{lang("card.9.list.9")}</p>
                    </div>
                  </div>
                  <div className={`${styles.ctaBtns}`}>
                    <Btn
                      functionOnClick={() => {handleFillForm("eshop3")}}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="var(--color-secondary)"
                      textColor="var(--color-text)"
                      borderSize="none"
                      borderRadius="15px"
                      fontWeight="600"
                      hoverEffect="scaleForward"
                      ariaLabel={lang("btn.3.aria")}
                    >
                      {lang("btn.3.content")}
                    </Btn>
                    <Btn
                      functionOnClick={handleCallOrCopyNumber}
                      width="clamp(100px, 100%, 250px)"
                      bgColor="transparent"
                      borderSize="none"
                      borderRadius="15px"
                      bgHoverColor="var(--color-primary)"
                      textHoverColor="var(--color-text-reverse)"
                      fontWeight="600"
                      hoverEffect="cfLeft"
                      ariaLabel={lang("btn.4.aria")}
                    >
                      {lang("btn.4.content")}
                    </Btn>
                    <Popup
                      top="105%"
                      left="calc(50% + clamp(50px, 50%, 125px))"
                      state={popupPhone}
                    >
                      {lang("popup")}
                    </Popup>
                  </div>
                  {/* <div className={`${styles.infoContainer}`}>
                    <h4>{lang('card.9.price')}</h4>
                    <div><span><IconInfoCircle style={{fill: "var(--shadow-25)"}}/></span><p>{lang('info.3')}</p></div>
                  </div> */}
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveChooser;
