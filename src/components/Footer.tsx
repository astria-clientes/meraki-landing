import { contacto } from "@/config/contacto";

/** Pie de página, presente en todas las rutas — antes vivía solo al final del scroll único. */
export default function Footer() {
  return (
    <footer className="border-t border-crema/10 bg-tinta text-crema/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 pb-24 text-xs md:flex-row md:px-6 md:pb-6">
        <p>
          <span className="font-display text-base text-crema/70">Meraki</span> · Peluquería, terapias y piedras ·{" "}
          {contacto.direccion.ciudad}
        </p>
        <p>© {new Date().getFullYear()} Meraki</p>
      </div>
    </footer>
  );
}
