import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, get } from "firebase/database";

const TestFireBaseProducts = () => {
  const [productos, setProductos] = useState([]);

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
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Lista de Productos desde Firebase
      </h1>
      {productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              {producto.imagenUrl && (
                <img
                  src={producto.imagenUrl}
                  alt={producto.nombre}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {producto.nombre}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  Precio: ${producto.precio}
                </p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          Cargando productos...
        </p>
      )}
    </div>
  );
};

export default TestFireBaseProducts;
