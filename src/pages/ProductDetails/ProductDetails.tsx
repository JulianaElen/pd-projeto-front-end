import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { Product } from "../../types/Product"

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) {
      setError("Produto invalido.")
      setLoading(false)
      return
    }

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Nao foi possivel carregar o produto.")
        }
        return res.json()
      })
      .then((data: Product) => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Nao foi possivel carregar o produto.")
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <main className="w-full px-3 py-6 sm:px-4">
        <p className="text-lg font-semibold text-orange-700">Carregando produto...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="w-full px-3 py-6 sm:px-4">
        <p className="text-lg font-semibold text-rose-700">{error || "Produto nao encontrado."}</p>
        <Link to="/" className="mt-4 inline-block text-orange-700 underline">
          Voltar para a home
        </Link>
      </main>
    )
  }

  return (
    <main className="w-full px-3 py-6 sm:px-4">
      <Link to="/" className="text-sm font-semibold text-orange-700 underline">
        Voltar para a home
      </Link>

      <section className="mt-4 rounded-2xl border border-orange-100 bg-white/90 p-5 shadow-md shadow-orange-100/70">
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-64 w-full max-w-sm object-contain"
          />

          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">{product.title}</h2>
            <p className="mt-3 text-3xl font-extrabold text-rose-600">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">{product.description}</p>
            <p className="mt-4 inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
              Categoria: {product.category}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails
