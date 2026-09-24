/* ==========================================================================
 *  CATÁLOGO DE BIJOU  (capítulo 03)
 *  El contenido real vive en /content/productos.json (editable a mano o
 *  desde /admin — ahí también se sube la foto de cada pieza).
 *   - id:        único, sin espacios (ej. "dije-amatista-2")
 *   - categoria: "dijes" | "collares" | "accesorios"
 *   - imagen:    ruta dentro de /public o null
 *  Sin precios: el valor se consulta por WhatsApp (el botón ya lleva el
 *  nombre de la pieza).
 * ========================================================================== */
import productosJson from "../../content/productos.json";

export type Categoria = "dijes" | "collares" | "accesorios";

export type Producto = {
  id: string;
  nombre: string;
  categoria: Categoria;
  piedra?: string;
  imagen: string | null;
};

const data = productosJson as { categorias: { id: Categoria; nombre: string }[]; productos: Producto[] };

export const categorias = data.categorias;
export const productos = data.productos;
