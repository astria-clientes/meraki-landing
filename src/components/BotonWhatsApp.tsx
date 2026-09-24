import { contacto } from "@/config/contacto";
import { waLink } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./Iconos";

type Variante = "cobre" | "claro" | "oscuro" | "lavanda";

const estilos: Record<Variante, string> = {
  cobre: "bg-cobre text-hueso hover:bg-cobre-oscuro shadow-[0_10px_30px_-12px_rgba(184,105,63,.8)]",
  claro: "bg-hueso text-tinta hover:bg-white",
  oscuro: "bg-tinta text-hueso hover:bg-tinta-suave",
  lavanda: "bg-lavanda text-ciruela-profunda hover:bg-lavanda-niebla shadow-[0_10px_30px_-12px_rgba(179,165,214,.7)]",
};

type Props = {
  mensaje?: string;
  children?: React.ReactNode;
  variante?: Variante;
  tamano?: "md" | "lg" | "sm";
  className?: string;
};

export default function BotonWhatsApp({
  mensaje,
  children = contacto.textos.botonWhatsApp,
  variante = "cobre",
  tamano = "md",
  className = "",
}: Props) {
  const t =
    tamano === "lg"
      ? "px-7 py-4 text-base gap-3"
      : tamano === "sm"
        ? "px-3.5 py-2 text-sm gap-2"
        : "px-5 py-3 text-[15px] gap-2.5";
  return (
    <a
      href={waLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 ${t} ${estilos[variante]} ${className}`}
    >
      <IconoWhatsApp className={tamano === "lg" ? "h-6 w-6" : "h-5 w-5"} />
      <span>{children}</span>
    </a>
  );
}
