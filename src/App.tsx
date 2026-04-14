import Header from "./components/Header/Header"
import Home from "./pages/Home/Home.tsx"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Cart from "./pages/Cart/Cart"
import { Route, Routes } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-zinc-950">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartProvider>
  )
}

export default App
