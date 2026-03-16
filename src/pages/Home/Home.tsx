import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import type { Product } from "../../types/Product"

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">

        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </main>
  )
}

export default Home