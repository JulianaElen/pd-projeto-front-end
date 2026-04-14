import type { Product } from "../../types/Product"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"

interface ProductCardProps {
  readonly product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  function handleAddToCart(event: React.MouseEvent) {
    event.preventDefault()
    addToCart(product)
  }

  return (
    <div className="flex h-full w-full flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-600">

      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        <img
          src={product.image}
          alt={product.title}
          className="mx-auto h-32 object-contain sm:h-36 lg:h-40"
        />

        <h3 className="mt-4 text-sm font-semibold text-zinc-100 line-clamp-2">
          {product.title}
        </h3>

        <p className="mt-2 text-lg font-extrabold text-red-400">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </p>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full rounded-lg bg-red-900 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-red-800 active:scale-95"
      >
        Adicionar ao carrinho
      </button>

    </div>
  )
}

export default ProductCard
