"use client";

/* ==========================================================================
 *  Acordeón de fotos (React Bits, simplificado): una franja se agranda y
 *  recupera color al pasar el mouse o tocar. La versión original animaba
 *  todo con GSAP, incluyendo un tilt 3D (perspective + preserve-3d) sobre
 *  el mismo elemento cuyo flex-grow se animaba — esa combinación es un
 *  punto conocido de bugs de repintado en WebKit/Safari (el panel cambia
 *  de tamaño pero no se repinta). Acá el agrandado, el color y el cartel
 *  dependen solo de una clase CSS + transición plana — sin 3D, sin GSAP —
 *  así funciona igual en cualquier navegador.
 * ========================================================================== */

import Image from "next/image";
import { useState } from "react";
import "./AccordionGallery.css";

export type ItemGaleria = {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
};

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  height = 420,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = "horizontal",
  trigger = "hover",
  showLabels = true,
  className = "",
}: {
  items: ItemGaleria[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  trigger?: "hover" | "click";
  showLabels?: boolean;
  className?: string;
}) {
  const vertical = orientation === "vertical";
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
  const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

  const alEntrar = (i: number) => {
    if (trigger === "hover") setActive(i);
  };

  const alTeclear = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      className={`accordion-gallery${vertical ? " accordion-gallery--vertical" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--ag-accent": accentColor,
          "--ag-overlay": overlayColor,
          "--ag-text": textColor,
          "--ag-gap": `${gap}px`,
          "--ag-radius": `${radius}px`,
          "--ag-grow": grow,
          height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
        } as React.CSSProperties
      }
      role="list"
      aria-label="Galería de fotos del local"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = item.link ? "a" : "div";
        return (
          <Tag
            key={item.image}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            href={item.link || undefined}
            onClick={() => setActive(i)}
            onMouseEnter={() => alEntrar(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e: React.KeyboardEvent) => alTeclear(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__media">
              <Image
                src={item.image}
                alt={item.alt || item.label || ""}
                fill
                sizes="60vw"
                style={{ objectFit: "cover" }}
                draggable={false}
              />
            </span>
            <span className="ag-panel__dim" aria-hidden="true" />
            <span className="ag-panel__overlay" aria-hidden="true" />
            {showLabels && item.label && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" />
                <span className="ag-panel__text">{item.label}</span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}
