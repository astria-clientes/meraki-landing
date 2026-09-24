"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./Iconos";

/** Botón fijo de WhatsApp: aparece después del inicio y acompaña todo el recorrido. */
export default function WhatsAppFlotante() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,.45)] transition-all duration-300 md:bottom-6 md:right-6 md:h-16 md:w-16 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute inset-0 animate-ondas rounded-full bg-whatsapp" aria-hidden />
      <IconoWhatsApp className="relative h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
}
