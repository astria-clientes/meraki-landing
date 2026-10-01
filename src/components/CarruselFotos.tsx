"use client";

/* ==========================================================================
 *  Carrusel de fotos (Swiper, con efecto "coverflow") — solo para celular.
 *  Reemplaza al acordeón (AccordionGallery) ahí porque el acordeón, pensado
 *  para pasar el mouse, no se siente igual de cómodo con el dedo: acá se
 *  desliza horizontalmente de una foto a la otra, con la actual al centro
 *  y un poco más grande.
 * ========================================================================== */

import Image from "next/image";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./CarruselFotos.css";

export type ItemCarrusel = {
  image: string;
  label?: string;
};

export default function CarruselFotos({
  items,
  autoplayDelay = 3200,
}: {
  items: ItemCarrusel[];
  autoplayDelay?: number;
}) {
  return (
    <div className="carrusel-fotos">
      <Swiper
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1.25}
        spaceBetween={16}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: true }}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 90, modifier: 2, slideShadows: false }}
        pagination={{ clickable: true }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px]">
              <Image src={item.image} alt={item.label || ""} fill sizes="80vw" style={{ objectFit: "cover" }} />
              {item.label && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tinta/85 via-transparent to-transparent"
                  />
                  <p className="absolute inset-x-0 bottom-4 px-4 text-sm font-semibold text-crema">{item.label}</p>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
