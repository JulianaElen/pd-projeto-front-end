import Header from "./components/Header/Header"
import Home from "./pages/Home/Home.tsx"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App