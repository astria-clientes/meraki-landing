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
        <Enhebrado desde="#F5EFE6" hacia="#1B1411" cuenta="#1B1411" />
        <Peluqueria />
        <Enhebrado desde="#1B1411" hacia="#2A2134" cuenta="#B3A5D6" />
        <Terapias />
        <Enhebrado desde="#2A2134" hacia="#E9DDCB" cuenta="#E0A77C" />
        <Piedras />
        <Enhebrado desde="#E9DDCB" hacia="#1B1411" cuenta="#B8693F" />
        <Visitanos />
      </main>
      <WhatsAppFlotante />
    </>
  );
}
