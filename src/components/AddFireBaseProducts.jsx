import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom"; // Para la navegación

const AddRealtimeProducts = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [codigo, setCodigo] = useState(""); // Nuevo estado para el código de producto
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Para navegar entre rutas

  const agregarProducto = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !imagenUrl || !codigo) {
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
        codigo, // Añadimos el código al objeto de producto
      });

      alert("Producto agregado correctamente");
      setNombre("");
      setPrecio("");
      setImagenUrl("");
      setCodigo(""); // Limpiamos el campo de código
    } catch (error) {
      console.error("Error al agregar producto: ", error);
      alert("Hubo un error al agregar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 space-y-6">
      {/* Botones para navegación */}
      <div className="flex items-center gap-2 m-0">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white rounded hover:bg-green-700 transition p-2"
        >
          TODOS LOS PRODUCTOS
        </button>
        <button
          onClick={() => navigate("/test-products")}
          className="bg-yellow-600 text-white rounded hover:bg-yellow-700 transition p-2"
        >
          BASE DE DATOS
        </button>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <form onSubmit={agregarProducto} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nombre del producto</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Ej: Camisa"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Ej: 29.99"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">URL de la imagen</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Ej: https://imagen.com/foto.jpg"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
            />
          </div>
          {/* Nuevo campo de código de producto */}
          <div>
            <label className="block text-gray-700">Código del producto</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Ej: 12345"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)} // Manejamos el estado de 'codigo'
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
