import { createContext, useContext, useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebaseConfig"; // Asegúrate de que la configuración de Firebase sea correcta

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para saber si estamos cargando los productos

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosRef = ref(db, "productos"); // Ruta en la base de datos
        const snapshot = await get(productosRef);

        if (snapshot.exists()) {
          const productosData = snapshot.val();
          // Convertir objeto en array
          const productosArray = Object.keys(productosData).map((key) => ({
            id: key,
            ...productosData[key],
          }));
          setProductos(productosArray);
        } else {
          console.log("No hay productos disponibles");
        }
      } catch (error) {
        console.error("Error obteniendo productos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Filtrar productos por categoría, si hay un filtro
  const filteredItemsData = categoryFilter
    ? productos.filter((item) => item.categoria === categoryFilter)
    : productos;

  return (
    <ProductContext.Provider
      value={{ filteredItemsData, setCategoryFilter, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
