import { contacto } from "@/config/contacto";
import { Enhebrado } from "@/components/Capitulo";
import Encabezado from "@/components/Encabezado";
import Hero from "@/components/Hero";
import Peluqueria from "@/components/Peluqueria";
import Piedras from "@/components/Piedras";
import Terapias from "@/components/Terapias";
import Visitanos from "@/components/Visitanos";
import WhatsAppFlotante from "@/components/WhatsAppFlotante";

// Datos estructurados para Google (negocio local).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Meraki",
  description: "Peluquería y barbería, terapias alternativas y bijou con piedras semipreciosas.",
  telephone: `+${contacto.whatsapp.numero}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: contacto.direccion.calle,
    addressLocality: "Plottier",
    addressRegion: "Neuquén",
    addressCountry: "AR",
  },
};

export default function Inicio() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Encabezado />
      <main>
        <Hero />
        <Enhebrado desde="#F7F3EC" hacia="#221912" cuenta="#221912" />
        <Peluqueria />
        <Enhebrado desde="#221912" hacia="#2E2117" cuenta="#C9A227" />
        <Terapias />
        <Enhebrado desde="#2E2117" hacia="#EFE3CB" cuenta="#B8823D" />
        <Piedras />
        <Enhebrado desde="#EFE3CB" hacia="#221912" cuenta="#B8823D" />
        <Visitanos />
      </main>
      <WhatsAppFlotante />
    </>
  );
}
