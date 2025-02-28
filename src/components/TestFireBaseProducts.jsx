import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom"; // Para la navegación

// Importación de Card de Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TestFireBaseProducts = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate(); // Para navegar entre rutas

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

          console.log("Productos obtenidos de Firebase: ", productosArray); // Console log para ver toda la información de los productos

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
      <div className="mb-6">
        <button
          onClick={() => navigate("/test-add-products")}
          className="bg-yellow-600 text-white rounded hover:bg-yellow-700 transition p-2"
        >
          <i className="fa-solid fa-arrow-left"></i> Volver
        </button>
      </div>
      <h5 className="text-3xl font-bold text-center text-white mb-5">
        Lista de Productos de la base de datos
      </h5>
      {productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <Card
              key={producto.id}
              sx={{ maxWidth: 345 }}
              className="border rounded-lg shadow-lg"
            >
              {producto.imagenUrl && (
                <CardMedia
                  sx={{ height: 140 }}
                  image={producto.imagenUrl}
                  title={producto.nombre}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Nombre: {producto.nombre}
                </Typography>
                <Typography variant="body2">
                  <text className="font-bold">Precio:</text>{" "}
                  <text className="font-bold">${producto.precio}</text>
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Agregar al carrito</Button>
                <Button size="small">Ver más</Button>
              </CardActions> */}
            </Card>
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
