import { useState, useEffect } from "react";
import { useProducts } from "../components/context/ProductContext"; // Importamos el contexto
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme } from "@mui/material/styles";
import "./Productos.css";

const ITEMS_PER_PAGE = 10;

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          backgroundColor: "white !important",
        },
      },
    },
  },
});

const Productos = ({ cart, setCart }) => {
  const { filteredItemsData, setCategoryFilter } = useProducts(); // Usamos el contexto
  const [counts, setCounts] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCounts(
      filteredItemsData.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
    );
  }, [filteredItemsData]);

  const handleIncrement = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max(0, prevCounts[id] - 1),
    }));
  };

  const handleAddToCart = (item) => {
    if (counts[item.id] > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === item.id
        );
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, cantidad: cartItem.cantidad + counts[item.id] }
              : cartItem
          );
        } else {
          return [
            ...prevCart,
            {
              id: item.id,
              nombre: item.nombre,
              precio: item.precio,
              cantidad: counts[item.id],
              imagen: item.image,
            },
          ];
        }
      });
      setCounts((prevCounts) => ({ ...prevCounts, [item.id]: 0 }));
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const itemsToShow = filteredItemsData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-3">
      <div className="grid grid-cols-2 gap-3">
        {itemsToShow.map((item) => (
          <div key={item.id} className="w-full">
            <Card>
              <div className="font-semibold text-sm text-center p-2 truncate">
                {item.nombre}
              </div>
              <div className="relative">
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.image}
                  title={item.nombre}
                />
                {/* Círculo con el precio */}
                <div className="absolute top-2 right-2 bg-white text-black rounded-full p-2 font-semibold">
                  ${item.precio}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 pt-3 pb-2">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </Button>
                <span className="font-bold text-md">{counts[item.id]}</span>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </Button>
              </div>
              <div className="p-2">
                {counts[item.id] > 0 ? (
                  <Button
                    variant="contained"
                    className="w-full"
                    onClick={() => handleAddToCart(item)}
                  >
                    AGREGAR
                  </Button>
                ) : (
                  <Button variant="contained" disabled className="w-full">
                    Deshabilitado
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredItemsData.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Productos;
