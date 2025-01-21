// Styles

// Public & Assets

// React/Next Functions
import { useTranslations } from "next-intl";
// Context & Actions

// Componenets
import Btn from "@/components/btn/btn.component";

export default function NotFound() {
  const lang = useTranslations("notFound");
  return (
    <main
      style={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "var(--color-background)",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", margin: 0 }}>{lang('title')}</h1>
      <p style={{ margin: 0 }}>
        {lang('text')}
      </p>
      <Btn
        href="/"
        bgColor="var(--color-secondary)"
      >
        {lang('btn.0.content')}
      </Btn>
    </main>
  );
}
