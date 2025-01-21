"use client";
// Styles
import styles from "./showcase.module.scss";
// Public & Assets

// React/Next Functions
import { Children, cloneElement } from "react";
import { useEffect, useState, useRef } from "react";
// Context & Actions

// Componenets

/*
INSTRUCTIONS
  children                            children of showcase
  alwaysAnimate                       default false (if true showcase will always animate)
  paddingTopAndBottomOfShowcase       padding of showcase (just apply to top and bottom)
  gap                                 gap between items
  heightOfItem                        height of each item
  widthOfItem                         width of each item
*/

export const Showcase = ({
  children,
  alwaysAnimate = false,
  paddingTopAndBottomOfShowcase = "36px",
  gap = "4rem",
  heightOfItem = "var(--fontsize-h2)",
  widthOfItem = "auto",
}) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const updateIsOverflow = () => {
      const isOverflowing =
        showcaseRef.current.parentElement.clientWidth <
        showcaseRef.current.clientWidth;
      setIsOverflow(isOverflowing);
    };
    updateIsOverflow();
    window.addEventListener("resize", updateIsOverflow);
    return () => {
      window.removeEventListener("resize", updateIsOverflow);
    };
  }, []);

  return (
    <div className={`${styles.showcaseImgContainer}`}>
      <div
        className={`${styles.showcaseImgGroup} ${
          alwaysAnimate || isOverflow ? styles.animated : ""
        }`}
        style={{
          padding: `${paddingTopAndBottomOfShowcase} 0px`,
          gap: `${gap}`,
          paddingRight: `${gap}`,
        }}
        ref={showcaseRef}
      >
        {Children.map(children, (child) => {
          return cloneElement(child, {
            heightOfItem: heightOfItem,
            widthOfItem: widthOfItem,
          });
        })}
      </div>
      {(alwaysAnimate || isOverflow) && (
        <div
          aria-hidden
          className={`${styles.showcaseImgGroup} ${
            alwaysAnimate || isOverflow ? styles.animated : ""
          }`}
          style={{
            padding: `${paddingTopAndBottomOfShowcase} 0px`,
            gap: `${gap}`,
            paddingRight: `${gap}`,
          }}
        >
          {Children.map(children, (child) => {
            return cloneElement(child, {
              heightOfItem: heightOfItem,
              widthOfItem: widthOfItem,
            });
          })}
        </div>
      )}
    </div>
  );
};

export const ShowcaseItem = ({
  children,
  heightOfItem,
  widthOfItem,
}) => {

  return (
    <div className={`${styles.showcaseItem}`} style={{
      height: `${heightOfItem}`,
      width: `${widthOfItem}`
    }}>
      {children}
    </div>
  )
};
