"use client";

import { useEffect, useRef, useState } from "react";

/** Aparición suave al hacer scroll. Respeta "reducir movimiento". */
export default function Aparecer({
  children,
  demora = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  demora?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-visible={visible}
      style={{ transitionDelay: `${demora}ms` }}
      className={`aparecer ${className}`}
    >
      {children}
    </Tag>
  );
}
