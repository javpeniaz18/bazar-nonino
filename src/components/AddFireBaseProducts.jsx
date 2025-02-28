import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { ref, push, set } from "firebase/database";

const AddRealtimeProducts = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const agregarProducto = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !imagenUrl) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const precioNumero = parseFloat(precio);
    if (isNaN(precioNumero)) {
      alert("El precio debe ser un número válido.");
      return;
    }

    setLoading(true);

    try {
      const productosRef = ref(db, "productos");
      const nuevoProductoRef = push(productosRef);

      await set(nuevoProductoRef, {
        nombre,
        precio: precioNumero,
        imagenUrl,
      });

      alert("Producto agregado correctamente");
      setNombre("");
      setPrecio("");
      setImagenUrl("");
    } catch (error) {
      console.error("Error al agregar producto: ", error);
      alert("Hubo un error al agregar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <form onSubmit={agregarProducto} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nombre del producto</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Ej: Camisa"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Ej: 29.99"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">URL de la imagen</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Ej: https://imagen.com/foto.jpg"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Agregando..." : "Agregar Producto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRealtimeProducts;
