"use client"
// Styles
import styles from "./card.module.scss";
// Public & Assets

// React/Next Functions

// Context & Actions

// Componenets

/*
opacity must be set throught bgColor "rgb(from var(--color-secondary) r g b / 0.1"
for BACKDROPFILTER to work, background must be transparent or semitransparent
INSTRUCTIONS
  gapFlex               (*) gap for content
  gapFlexRow            (*) gap for rows of content (if not set, gapFlex picked for gapRow)
  gapFlexColumn         (*) gap for columns of content (if not set, gapFlex picked for gapColumn)
  borderRadius          (*)borderRadius (default set to 0px)
  borderHoverRadius     (1)its new radius of card
  borderSize            (*)size of border (default set to 1px)
  borderColor           (*)color of border
  paddingOfCard         (*)padding of card
  width                 (*)width of card
  height                (*)height of card
  backdropFilter        (*)backdropfilter
  filterHover           (*)filter apply on hover
  bgColor               (*)color of background
  bgHoverColor          (*)background hover color
  hoverEffect           (*)hover effect (choose from preset of effects)
                          1: brc (border radius change) (border radius of btn change to borderHoverRadius)
*/

export const Card = ({
  children,
  gapFlex = "0px",
  gapFlexRow = "",
  gapFlexColumn = "",
  borderRadius = "0px",
  borderHoverRadius = "",
  borderSize = "1px",
  borderColor = "var(--color-border)",
  paddingOfCard = "10px 20px",
  width = "",
  height = "",
  backdropFilter = "",
  backdropFilterHover = "",
  filter = "",
  filterHover = "",
  bgColor = "",
  bgHoverColor = "",
  hoverEffect = "",
}) => {
  return (
    <div
      className={`${styles.card} ${styles[hoverEffect]}`}
      style={{
        padding: `${paddingOfCard}`,
        border: `${borderSize} solid ${borderColor}`,
        borderRadius: `${borderRadius}`,
        "--localBorderHoverRadius": `${borderHoverRadius}`,
        width: `${width}`,
        height: `${height}`,
        "--localFilter": `${filter}`,
        "--localFilterHover": `${filterHover ? filterHover : filter}`,
        "--localBackdropFilter": `${backdropFilter}`,
        "--localBackdropFilterHover": `${backdropFilterHover ? backdropFilterHover : backdropFilter}`,
        "--localBgColor": `${bgColor}`,
        "--localBgHoverColor": `${bgHoverColor ? bgHoverColor : bgColor}`,
      }}
    >
      <div
        className={`${styles.content}`}
        style={{
          rowGap: `${gapFlexRow ? gapFlexRow : gapFlex}`,
          columnGap: `${gapFlexColumn ? gapFlexColumn : gapFlex}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/*
FlipCard
FlippingCard on hover
#F0F
*/

/*
opacity must be set throught bgColor "rgb(from var(--color-secondary) r g b / 0.1"
for BACKDROPFILTER to work, background must be transparent or semitransparent
INSTRUCTIONS
  gapFlex               gap for content
  gapFlexRow            gap for rows of content (if not set, gapFlex picked for gapRow)
  gapFlexColumn         gap for columns of content (if not set, gapFlex picked for gapColumn)
  borderRadius          borderRadius (default set to 0px)
  borderHoverRadius     its new radius of card
  borderSize            size of border (default set to 1px)
  borderColor           color of border
  boxShadow             boxShadow of cardFront and cardBack
  paddingOfCard         padding of card
  width                 width of card
  height                height of card
  backdropFilter        backdropfilter of cardFront
  backdropFilterHover   backdropfilter of cardBack
  filter                filter of cardFront
  filterHover           filter of cardBack
  bgColor               color of cardFront
  bgHoverColor          background color of cardBack
  flippedContent        JSX that will be on cardBack (children of cardBack)
  hoverEffect           (*)hover effect (choose from preset of effects)
                        1: horizontal (horizontal flip) (default without any hoverEffect)
                        2: vertical (vertical flip)
                        3: sticker
*/

export const FlipCard = ({
  children,
  gapFlex = "0px",
  gapFlexRow = "",
  gapFlexColumn = "",
  borderRadius = "0px",
  borderSize = "1px",
  borderColor = "var(--color-border)",
  boxShadow = "0px 0px 5px var(--color-boxshadow)",
  paddingOfCard = "10px 20px",
  width = "",
  height = "",
  backdropFilter = "",
  backdropFilterHover = "",
  filter = "",
  filterHover = "",
  bgColor = "",
  bgHoverColor = "",
  flippedContent,
  hoverEffect = "horizontal",
}) => {
  return (
    <div
      className={`${styles.flipCard} ${styles[hoverEffect]}`}
      onClick={(e) => {
        e.currentTarget.classList.toggle(styles.clicked);
      }}
    >
      <div
        className={styles.cardInner}
        style={{
          width: `${width}`,
          height: `${height}`,
          "--localFilter": `${filter}`,
          "--localFilterHover": `${filterHover}`,
          "--localBackdropFilter": `${backdropFilter}`,
          "--localBackdropFilterHover": `${backdropFilterHover}`,
          "--localBgColor": `${bgColor}`,
          "--localBgHoverColor": `${bgHoverColor}`,
        }}
        >
        <div
          className={`${styles.cardFront}`}
          style={{
            boxShadow: `${boxShadow}`,
            border: `${borderSize} solid ${borderColor}`,
            borderRadius: `${borderRadius}`,
            padding: `${paddingOfCard}`,
            rowGap: `${gapFlexRow ? gapFlexRow : gapFlex}`,
            columnGap: `${gapFlexColumn ? gapFlexColumn : gapFlex}`,
          }}
        >
          {children}
        </div>
        {flippedContent && (
          <div
            className={`${styles.cardBack}`}
            style={{
              boxShadow: `${boxShadow}`,
              border: `${borderSize} solid ${borderColor}`,
              borderRadius: `${borderRadius}`,
              padding: `${paddingOfCard}`,
              rowGap: `${gapFlexRow ? gapFlexRow : gapFlex}`,
              columnGap: `${gapFlexColumn ? gapFlexColumn : gapFlex}`,
            }}
          >
            {flippedContent}
          </div>
        )}
      </div>
    </div>
  );
};
