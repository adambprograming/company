// Styles

// Public & Assets

// React/Next Functions
// Context & Actions

// Componenets
import Btn from "@/components/btn/btn.component";

export default function NotFound() {
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
      <h1 style={{ fontSize: "2rem", margin: 0 }}>{"Stránka nenalezena"}</h1>
      <p style={{ margin: 0 }}>
        {"Odkaz je neplatný nebo stránka už neexistuje."}
      </p>
      <Btn href="/" bgColor="var(--color-secondary)">
        {"Zpět na domovskou stránku"}
      </Btn>
    </main>
  );
}
