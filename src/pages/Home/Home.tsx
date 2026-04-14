import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import type { Product } from "../../types/Product"
import banner from "../../figures/Gemini_Generated_Image_jrauk6jrauk6jrau.png"

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const categories = [
    "all",
    ...Array.from(new Set(products.map(product => product.category))).sort((a, b) =>
      a.localeCompare(b, "pt-BR")
    )
  ]

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(product => product.category === selectedCategory)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        if (!res.ok) {
          throw new Error("Não foi possível carregar os produtos.")
        }
        return res.json()
      })
      .then((data: Product[]) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Não foi possível carregar os produtos. Tente novamente mais tarde.")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="mt-10 w-full px-3 text-center text-lg font-semibold text-zinc-400 sm:px-4">
        Carregando produtos...
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-10 w-full px-3 text-center sm:px-4">
        <p className="text-lg font-semibold text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <main className="w-full px-3 py-6 sm:px-4">

      <img
        src={banner}
        alt="Super Promoção de Aniversário - até 40% de desconto"
        className="mb-6 w-full rounded-2xl object-cover shadow-md shadow-black/40"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition active:scale-95 ${
              selectedCategory === category
                ? "border-red-800 bg-red-900 text-white"
                : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
            }`}
          >
            {category === "all" ? "Todas" : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {!filteredProducts.length && (
        <p className="mt-6 text-sm font-semibold text-zinc-400">
          Nenhum produto encontrado para a categoria selecionada.
        </p>
      )}

    </main>
  )
}

export default Home
