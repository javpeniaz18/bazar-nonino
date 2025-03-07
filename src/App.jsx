import "./App.css";
import DetailProduct from "./components/DetailProduct";
import { Navbar } from "./components/Navbar";
import Productos from "./components/Productos";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ProductProvider } from "./components/context/ProductContext"; // Importamos el Provider
import TestFireBaseProducts from "./components/TestFireBaseProducts";
import AddFireBaseProducts from "./components/AddFireBaseProducts";

function App() {
  const [cart, setCart] = useState([]); // Estado del carrito en App

  return (
    <ProductProvider>
      <Navbar cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Productos cart={cart} setCart={setCart} />} />
        <Route path="/productos/:id" element={<DetailProduct />} />
        <Route path="/test-products" element={<TestFireBaseProducts />}></Route>
        <Route
          path="/test-add-products"
          element={<AddFireBaseProducts />}
        ></Route>
      </Routes>
    </ProductProvider>
  );
}

export default App;
