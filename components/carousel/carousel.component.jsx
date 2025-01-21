"use client";
// Styles
import styles from "./carousel.module.scss";
// Public & Assets

// React/Next Functions
import { cloneElement } from "react";
import { useState, useEffect, useRef } from "react";
// Context & Actions

// Components

/*
INSTRUCTIONS
infinite              three options 
                        1: notInfinite for swiping just right to last item and there is no right arrow
                        2: pseudoInfinite for swiping to last element and at last element right arrow do swipe back to first element
                        3: infinite for endless swiping
fullWidth             if true, one item take full potential width, else take 86% and 7% on each side take previous and next item
backdropFilterArrows  backdropfilter of arrows
animation             animation of carousel, options:
                        "cube": 
*/
export const Carousel = ({ children, infinite = "notInfinite", fullWidth = true, backdropFilterArrows = "blur(4px)", animation = "none" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const transitionRef = useRef(null);
  const length = children.length;
  const carouselRef = useRef(null);

  // Cloning the first and last children for the infinite loop effect
  const clonedChildren = infinite === "infinite"
    ? [
        cloneElement(children[length - 1], { key: length + 1 }),
        ...children,
        cloneElement(children[0], { key: length + 2 }),
      ]
    : children;

  useEffect(() => {
    if (isTransitioning) {
      const transitionEnd = () => {
        setIsTransitioning(false);
        if (infinite === "infinite") {
          if (currentIndex === length) {
            setCurrentIndex(0);
          } else if (currentIndex === -1) {
            setCurrentIndex(length - 1);
          }
          setCurrentTranslate(0);
        }
      };
      const transitionRefCurrent = transitionRef.current;
      transitionRefCurrent.addEventListener("transitionend", transitionEnd);

      return () => {
        transitionRefCurrent.removeEventListener(
          "transitionend",
          transitionEnd
        );
      };
    }
  }, [isTransitioning, currentIndex, length, infinite]);

  const next = () => {
    if (!isTransitioning) {
      if (infinite === "infinite" || currentIndex < length - 1) {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (infinite === "pseudoInfinite" && currentIndex === length - 1) {
        setIsTransitioning(true);
        setCurrentIndex(0);
      }
    }
  };

  const prev = () => {
    if (!isTransitioning) {
      if (infinite === "infinite" || currentIndex > 0) {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
      } else if (infinite === "pseudoInfinite" && currentIndex === 0) {
        setIsTransitioning(true);
        setCurrentIndex(length - 1);
      }
    }
  };

  const handleWheel = (e) => {
    if (e.deltaX > 0) {
      next();
    } else if (e.deltaX < 0) {
      prev();
    }
  };

  // const handleMouseDown = (e) => {
  //   setStartPosition(e.pageX);
  //   setIsDragging(true);
  // };

  // const handleMouseMove = (e) => {
  //   if (!isDragging) return;
  //   const currentPosition = e.pageX;
  //   const diff = startPosition - currentPosition;
  //   if (diff > 50) {
  //     next();
  //     setIsDragging(false);
  //   } else if (diff < -50) {
  //     prev();
  //     setIsDragging(false);
  //   } else {
  //     setCurrentTranslate(diff);
  //   }
  // };

  // const handleMouseUp = () => {
  //   if (isDragging) {
  //     if (currentTranslate > 25) {
  //       next();
  //     } else if (currentTranslate < -25) {
  //       prev();
  //     } else {
  //       setCurrentTranslate(0);
  //     }
  //     setIsDragging(false);
  //   }
  // };

  const handleTouchStart = (e) => {
    setStartPosition(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    const diff = startPosition - currentPosition;
    if (diff > 75) {
      next();
      setIsDragging(false);
    } else if (diff < -75) {
      prev();
      setIsDragging(false);
    } else {
      setCurrentTranslate(diff);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      if (currentTranslate > 25) {
        next();
      } else if (currentTranslate < -25) {
        prev();
      } else {
        setCurrentTranslate(0);
      }
      setIsDragging(false);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setCurrentTranslate(0);
  };

  const getRelativePosition = (index) => {
    if(infinite === "notInfinite" || infinite === "pseudoInfinite") {
      if (index === currentIndex) return "active";
      if (index === (currentIndex + 1) % length) return "rightToActive";
      if (index === (currentIndex - 1 + length) % length) return "leftToActive";
    } else if (infinite === "infinite") {
      if (index - 1 === currentIndex) return "active";
      if (index - 1 === (currentIndex + 1) % length) return "rightToActive";
      if (index - 1 === (currentIndex - 1 + length) % length) return "leftToActive";
      if (index === 0 && currentIndex === 0) return "leftToActive"
      if (index - 1 === length && currentIndex + 1 === length) return "rightToActive"
    }
    return "other";
  };

  return (
    <div
      className={`${styles.carousel} ${styles[animation]}`}
      // onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onMouseLeave={handleMouseLeave}
      tabIndex={0} // Add tabIndex to make the div focusable
      ref={carouselRef}
      style={{
        "--localBackdropFilterArrows": `${backdropFilterArrows}`,
      }}
    >
      {(infinite === "infinite" || infinite === "pseudoInfinite" || currentIndex > 0) && (
        <button onClick={prev} className={`${styles.navBtn} ${styles.leftBtn}`}>
          {"<"}
        </button>
      )}
      <div
        className={styles.carouselInner}
        style={{
          width: `${fullWidth ? "100%" : "86%"}`,
          transform: `translateX(calc(-${(currentIndex + (infinite === "infinite" ? 1 : 0)) * 100}% - ${currentTranslate}px))`,
          transition: isTransitioning ? "transform 0.5s ease" : "none",
        }}
        ref={transitionRef}
      >
        {clonedChildren.map((child, index) =>
          cloneElement(child, {
            key: index,
            "active": getRelativePosition(index),
          })
        )}
      </div>
      {(infinite === "infinite" || infinite === "pseudoInfinite" || currentIndex < length - 1) && (
        <button onClick={next} className={`${styles.navBtn} ${styles.rightBtn}`}>
          {">"}
        </button>
      )}
    </div>
  );
};

export const CarouselItem = ({children, active, height}) => {
  return (
      <div className={`${styles.carouselItem} ${styles[active]}`} style={{height: `${height}`}}>
          {children}
      </div>
  );
}