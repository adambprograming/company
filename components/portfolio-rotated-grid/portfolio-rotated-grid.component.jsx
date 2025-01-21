"use client";
// Styles
import styles from "./portfolio-rotated-grid.module.scss";
// Public & Assets
import HeroImg from "@/public/hero.png";
// React/Next Functions
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
// Context & Actions

// Componenets
import { Carousel, CarouselItem } from "../carousel/carousel.component";

/*
INSTRUCTIONS

*/

const PortfolioRotatedGrid = () => {
  // const lang = useTranslations("portfolioRotatedGrid");
  const [widthOfWindow, setWidthOfWindow] = useState(1440);
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
  // TODO whole component
  return (
    <>
      {widthOfWindow < 760 ? (
        <Carousel fullWidth={false} backdropFilterArrows="">
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
          <CarouselItem>
            
              <div className={`${styles.inner}`}>
                <Image src={HeroImg} alt="Hero section image" />
              </div>
            
          </CarouselItem>
        </Carousel>
      ) : (
        <div className={`${styles.portfolioRotatedGridContainer}`}>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
          <div className={`${styles.box}`}>
            <div className={`${styles.inner}`}>
              <Image src={HeroImg} alt="Hero section image" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioRotatedGrid;
