function Header() {
  return (
    <header className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-slate-900 px-3 py-4 shadow-md shadow-orange-200/80 sm:px-4">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-extrabold sm:text-xl"> A Lojinha (❁´◡`❁)</h1>

        <nav aria-label="Menu principal" className="flex flex-wrap items-center gap-3 text-sm font-semibold sm:gap-5">
          <a href="#" className="hover:text-rose-700 transition-colors">
            Início
          </a>
          <a href="#" className="hover:text-rose-700 transition-colors">
            Produtos
          </a>
          <a
            href="#"
            aria-label="Carrinho"
            className="flex items-center gap-2 rounded-md border border-slate-800/20 bg-white/35 px-3 py-1.5 hover:bg-white/60 transition-colors"
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
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header