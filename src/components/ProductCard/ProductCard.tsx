import type { Product } from "../../types/Product"

interface ProductCardProps {
  readonly product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="h-full w-full rounded-2xl border border-orange-100 bg-white/90 p-4 shadow-md shadow-orange-100/70 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-100">

      <img
        src={product.image}
        alt={product.title}
        className="mx-auto h-32 object-contain sm:h-36 lg:h-40"
      />

      <h3 className="mt-4 text-sm font-semibold text-slate-700 line-clamp-2">
        {product.title}
      </h3>

      <p className="mt-2 text-lg font-extrabold text-rose-600">
        {product.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
      </p>

    </div>
  )
}

export default ProductCard