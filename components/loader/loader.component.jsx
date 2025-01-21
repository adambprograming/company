import styles from "./loader.module.scss";


/*
INSTRUCTIONS
fullscreen      boolean value, default true, if true loader cover fullscreen, if false parent component must be set to relative position and must have some content
backdropFilter  direcrtly type what backdropFilter should be applied (blur(4px))
backgroundColor directly type what backgroundColor should be applied (var(--color-background))
*/ 

export default function Loader({
  fullscreen = true,
  backdropFilter = "none",
  backgroundColor = "transparent",
}) {
  return (
    <div
      className={`${styles.loadingContainer}`}
      style={{
        position: fullscreen ? "fixed" : "absolute",
        backdropFilter: backdropFilter,
        backgroundColor: backgroundColor,
      }}
    >
      <div className={`${styles.loadingCircle}`}></div>
    </div>
  );
}
