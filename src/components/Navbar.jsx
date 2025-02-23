import { useState } from "react";
import "./Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useProducts } from "./context/ProductContext"; // Usamos el contexto de productos

export const Navbar = ({ cart, setCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Nuevo estado para mostrar el modal
  const [itemToRemove, setItemToRemove] = useState(null); // Estado para almacenar el item a eliminar
  const { filteredItemsData, setCategoryFilter } = useProducts(); // Usamos el contexto de productos

  const categories = Array.from(
    new Set(filteredItemsData.map((item) => item.categoria))
  ); // Extrae categorías únicas de los productos filtrados

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );

  const handleRemoveClick = (item) => {
    setItemToRemove(item); // Guardamos el item a eliminar
    setShowConfirmModal(true); // Mostramos el modal
  };

  const handleConfirmDelete = () => {
    setCart(cart.filter((item) => item.id !== itemToRemove.id)); // Eliminamos el item
    setShowConfirmModal(false); // Cerramos el modal
  };

  const handleCancelDelete = () => {
    setItemToRemove(null); // Limpiamos el item seleccionado
    setShowConfirmModal(false); // Cerramos el modal
  };

  const handleMakeOrder = () => {
    const orderDetails = cart
      .map(
        (item) =>
          `${item.cantidad} x ${item.nombre}: $${item.cantidad * item.precio}`
      )
      .join("\n");

    const total = `Total: $${totalAmount.toFixed(2)}`;
    const message = `Hola Victor Temperini, quisiera hacer este pedido:\n\n${orderDetails}\n\n${total}`;

    const whatsappUrl = `https://wa.me/543471323694?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Función para manejar la apertura del menú lateral
  const handleOpenMenu = () => {
    setMenuOpen(true); // Abrir el menú lateral
    setCategoryFilter(null); // Restablecer el filtro de categoría al abrir el menú (esto muestra todas las categorías)
  };

  // Función para cerrar el menú lateral
  const handleCloseMenu = () => {
    setMenuOpen(false); // Cierra el menú lateral
  };

  return (
    <>
      <div className="h-[60px] flex justify-between items-center text-center pl-[15px] relative">
        <i
          className="fa-solid fa-bars text-2xl cursor-pointer"
          onClick={handleOpenMenu} // Abre el menú y muestra todas las categorías
        ></i>
        <h4 className="text-xl font-medium">BAZAR VICTOR TEMPERINI</h4>
        <div
          className="flex items-center justify-center bg-blue-500 rounded-full w-10 h-10 mr-2 cursor-pointer relative"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCartIcon className="text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((acc, item) => acc + item.cantidad, 0)}
            </span>
          )}
        </div>
      </div>

      <div className="w-full h-[1px] bg-white mb-3"></div>

      {/* Menú lateral */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-start justify-start text-white z-50 transform ${
          menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } transition-all duration-300 ease-in-out`}
      >
        <button
          className="absolute top-5 right-5 text-2xl"
          onClick={handleCloseMenu} // Llama a la función para cerrar el menú
        >
          ✕
        </button>
        <ul className="text-xl space-y-2 text-left pt-12 w-full">
          <li
            className="cursor-pointer text-sm font-bold text-white mb-3 py-2 px-4 rounded-md bg-blue-500 mt-8"
            onClick={() => {
              setCategoryFilter(null); // Muestra todos los productos
              setMenuOpen(false); // Cierra el menú lateral
            }}
          >
            TODOS LOS ARTICULOS
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-gray-300"
              onClick={() => {
                setCategoryFilter(category); // Filtra por categoría
                setMenuOpen(false); // Cierra el menú lateral
                console.log("Categoría seleccionada:", category);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Menú del Carrito */}
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-gray-900 bg-opacity-90 text-white z-50 transform ${
          cartOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } transition-all duration-300 ease-in-out flex flex-col p-4`}
      >
        <button
          className="absolute top-5 right-5 text-2xl"
          onClick={() => setCartOpen(false)}
        >
          ✕
        </button>
        <h2
          className="text-xl font-semibold mb-10"
          style={{ marginBottom: "40px" }}
        >
          Tu Carrito
        </h2>

        {/* Verifica si el carrito está vacío */}
        {cart.length === 0 ? (
          <p className="text-gray-400">No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 bg-gray-800 p-3 border border-gray-700 w-full"
                  style={{
                    backgroundColor: "#2d3748", // Color de fondo uniforme
                    height: "74px", // Altura de todos los elementos
                    borderRadius: "5px", // Bordes redondeados con un valor de 5px
                  }}
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {item.cantidad} x {item.nombre}
                    </p>
                    <p className="text-xs text-gray-400">
                      ${item.cantidad * item.precio}
                    </p>
                  </div>

                  {/* Botón para eliminar el item */}
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveClick(item)} // Abre el modal de confirmación
                  >
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>

            {/* Línea blanca horizontal */}
            <hr className="border-t border-white my-4" />

            {/* Mostrar la cuenta */}
            <div className="text-sm font-semibold text-white">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {item.cantidad} x {item.nombre}
                  </span>
                  <span>${item.cantidad * item.precio}</span>
                </div>
              ))}
            </div>

            {/* Total con los nuevos estilos */}
            <div
              className="flex justify-between items-center text-sm font-semibold mt-4"
              style={{
                backgroundColor: "#454545", // Fondo gris oscuro
                padding: "10px", // Espaciado interno
                borderRadius: "5px", // Bordes redondeados
              }}
            >
              <span>Total:</span>
              <span className="text-xl">${totalAmount.toFixed(2)}</span>
            </div>

            {/* Línea blanca horizontal final */}
            <hr className="border-t border-white my-4" />

            {/* Botón de hacer pedido */}
            <button
              onClick={handleMakeOrder}
              className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
            >
              HACER PEDIDO
            </button>
          </>
        )}
      </div>

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white p-6 rounded-lg w-[300px]">
            <h3 className="text-lg font-semibold mb-4 text-black">
              ¿Estás seguro de eliminar este item?
            </h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Sí, eliminar
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
