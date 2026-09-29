import { contacto } from "@/config/contacto";
import Hero from "@/components/Hero";

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
      <main>
        <Hero />
      </main>
    </>
  );
}
