import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import logo from "../../figures/Gemini_Generated_Image_9ocm3l9ocm3l9ocm-removebg-preview.png"

function Header() {
  const { totalItems } = useCart()

  return (
    <header className="bg-black/80 backdrop-blur-xl border-b border-amber-400/50 px-3 py-4 shadow-lg sm:px-4">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/">
          <img src={logo} alt="A Lojinha" className="h-10 w-auto" />
        </Link>

        <nav aria-label="Menu principal" className="flex flex-wrap items-center gap-3 text-sm font-semibold sm:gap-5">
          <Link to="/" className="text-amber-100 hover:text-amber-300 transition-colors">
            Inicio
          </Link>
          <Link
            to="/cart"
            aria-label="Carrinho"
            className="relative flex items-center gap-2 rounded-md border border-amber-400/70 bg-amber-400/30 px-3 py-1.5 text-amber-100 hover:bg-amber-400/50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.836L5.88 7.5m0 0H18.75a1.5 1.5 0 0 1 1.474 1.778l-1.2 6A1.5 1.5 0 0 1 17.55 16.5H8.25a1.5 1.5 0 0 1-1.474-1.222L5.88 7.5Zm0 0L4.723 3.836M9.75 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm8.25 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="leading-none">Carrinho</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-stone-900">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
