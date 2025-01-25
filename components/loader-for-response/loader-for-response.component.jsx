import Btn from "../btn/btn.component";
import Loader from "../loader/loader.component";
import IconCheckCircle from "@/components/svgs/icon-check-circle.component";
import IconXCircle from "../svgs/icon-x-circle.component";
import { useTranslations } from "next-intl";

export default function LoaderForResponse({
  isLoading,
  status,
  message,
  onClose,
  fullscreen = false,
  backdropFilter = "blur(4px)",
}) {
  const lang = useTranslations("components.loader");
  return (
    <>
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: fullscreen ? "fixed" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: backdropFilter,
            zIndex: 1000,
            borderRadius: "var(--border-radius-btn)",
          }}
        >
          <Loader />
        </div>
      )}
      {!isLoading && status && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: fullscreen ? "fixed" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: backdropFilter,
            zIndex: 1000,
            borderRadius: "var(--border-radius-btn)",
          }}
          onClick={onClose}
        >
          <div
            style={{
              backgroundColor: "var(--color-background)",
              padding: "3rem",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2.5rem",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {status === "success" ? (
              <>
                <IconCheckCircle width={36} height={36} style={{color: "var(--color-success)"}} />
                <h4 style={{textAlign: "center", maxWidth: "fit-content"}}>{message || lang("defaultMessage.success")}</h4>
              </>
            ) : (
              <>
                <IconXCircle width={36} height={36} style={{color: "var(--color-error)"}} />
                <h4 style={{textAlign: "center", maxWidth: "fit-content"}}>{message || lang("defaultMessage.error")}</h4>
              </>
            )}
            <Btn
              functionOnClick={onClose}
              borderSize="none"
              bgColor="var(--color-primary)"
              textColor="var(--color-text-reverse)"
              fontSize="var(--fontsize-p)"
              hoverEffect="scaleForward"
              ariaLabel={lang("btn.0.aria")}
            >
              {lang("btn.0.content")}
            </Btn>
          </div>
        </div>
      )}
    </>
  );
}
