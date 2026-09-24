import { contacto } from "@/config/contacto";

/** Arma el link de WhatsApp con el mensaje precargado. */
export function waLink(mensaje: string = contacto.mensajesWhatsApp.general) {
  const numero = contacto.whatsapp.numero.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/** Reemplaza {nombre} en las plantillas de mensajes. */
export function conNombre(plantilla: string, nombre: string) {
  return plantilla.replace(/\{nombre\}/g, nombre);
}

export function linkMapa() {
  const { linkMapa, calle, ciudad } = contacto.direccion;
  if (linkMapa) return linkMapa;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${calle}, ${ciudad}`)}`;
}
