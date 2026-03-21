import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import type { Product } from "../../types/Product"

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

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
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="mt-10 w-full px-3 text-center text-lg font-semibold text-orange-700 sm:px-4">
        Carregando produtos...
      </div>
    )
  }

  return (
    <main className="w-full px-3 py-6 sm:px-4">

      <h2 className="mb-6 text-2xl font-extrabold text-orange-700 sm:text-3xl">
        Produtos
      </h2>

      <div className="mb-6 flex flex-col gap-2 sm:max-w-xs">
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={event => setSelectedCategory(event.target.value)}
          className="rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
        >
          <option value="all">Todas as categorias</option>
          {categories
            .filter(category => category !== "all")
            .map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
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
        <p className="mt-6 text-sm font-semibold text-rose-700">
          Nenhum produto encontrado para a categoria selecionada.
        </p>
      )}

    </main>
  )
}

export default Home