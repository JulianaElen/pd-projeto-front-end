import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { Product } from "../../types/Product"
import { useCart } from "../../context/CartContext"

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [addedFeedback, setAddedFeedback] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    if (!id) {
      setError("Produto inválido.")
      setLoading(false)
      return
    }

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Não foi possível carregar o produto.")
        }
        return res.json()
      })
      .then((data: Product) => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Não foi possível carregar o produto.")
        setLoading(false)
      })
  }, [id])

  function handleAddToCart() {
    if (!product) return
    addToCart(product)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  if (loading) {
    return (
      <main className="w-full px-3 py-6 sm:px-4">
        <p className="text-lg font-semibold text-zinc-400">Carregando produto...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="w-full px-3 py-6 sm:px-4">
        <p className="text-lg font-semibold text-red-400">{error || "Produto não encontrado."}</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Voltar para a home
        </Link>
      </main>
    )
  }

  return (
    <main className="w-full px-3 py-6 sm:px-4">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Voltar para a home
      </Link>

      <section className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-64 w-full max-w-sm object-contain"
          />

          <div>
            <h2 className="text-2xl font-extrabold text-zinc-100">{product.title}</h2>
            <p className="mt-3 text-3xl font-extrabold text-red-400">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">{product.description}</p>
            <p className="mt-4 inline-block rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300">
              {product.category}
            </p>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full rounded-lg bg-red-900 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-800 active:scale-95"
            >
              {addedFeedback ? "Adicionado ✓" : "Adicionar ao carrinho"}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails
