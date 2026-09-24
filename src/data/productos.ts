/* ==========================================================================
 *  CATÁLOGO DE BIJOU  (capítulo 03)
 *  Para agregar una pieza, copiá un bloque { ... }, pegalo abajo y cambiá los datos.
 *   - id:        único, sin espacios (ej. "dije-amatista-2")
 *   - nombre:    cómo se muestra
 *   - categoria: "dijes" | "collares" | "accesorios"
 *   - piedra:    opcional, la piedra principal de la pieza
 *   - imagen:    ruta dentro de /public (ej. "/productos/dije-amatista.jpg") o null
 *  Sin precios: el valor se consulta por WhatsApp (el botón ya lleva el nombre de la pieza).
 * ========================================================================== */

export type Categoria = "dijes" | "collares" | "accesorios";

export type Producto = {
  id: string;
  nombre: string;
  categoria: Categoria;
  piedra?: string;
  imagen: string | null;
};

export const categorias: { id: Categoria; nombre: string }[] = [
  { id: "dijes", nombre: "Dijes" },
  { id: "collares", nombre: "Collares" },
  { id: "accesorios", nombre: "Accesorios" },
];

// ⚠️ Productos de EJEMPLO: reemplazar por las piezas reales.
export const productos: Producto[] = [
  { id: "dije-amatista", nombre: "Dije punta de amatista", categoria: "dijes", piedra: "Amatista", imagen: null },
  { id: "dije-cuarzo-rosa", nombre: "Dije corazón de cuarzo rosa", categoria: "dijes", piedra: "Cuarzo rosa", imagen: null },
  { id: "dije-cuarzo-cristal", nombre: "Dije de cuarzo cristal", categoria: "dijes", piedra: "Cuarzo cristal", imagen: null },
  { id: "collar-ojo-tigre", nombre: "Collar de ojo de tigre", categoria: "collares", piedra: "Ojo de tigre", imagen: null },
  { id: "collar-turmalina", nombre: "Collar de turmalina negra", categoria: "collares", piedra: "Turmalina negra", imagen: null },
  { id: "collar-mix", nombre: "Collar mix de piedras", categoria: "collares", imagen: null },
  { id: "pulsera-amatista", nombre: "Pulsera de amatista", categoria: "accesorios", piedra: "Amatista", imagen: null },
  { id: "pulsera-ojo-tigre", nombre: "Pulsera de ojo de tigre", categoria: "accesorios", piedra: "Ojo de tigre", imagen: null },
];
