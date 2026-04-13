import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"

function formatCardNumber(value: string) {
  return value.replaceAll(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
}

function formatExpiry(value: string) {
  const digits = value.replaceAll(/\D/g, "").slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

function formatCVV(value: string) {
  return value.replaceAll(/\D/g, "").slice(0, 3)
}

function Cart() {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [success, setSuccess] = useState(false)

  function handleFinalize() {
    setSuccess(true)
    setTimeout(() => {
      setShowModal(false)
      setSuccess(false)
      setCardNumber("")
      setCardName("")
      setExpiry("")
      setCvv("")
      clearCart()
    }, 2000)
  }

  const isFormValid = cardNumber.replaceAll(" ", "").length === 16 && cardName.trim().length > 0 && expiry.length === 5 && cvv.length === 3

  if (cartItems.length === 0) {
    return (
      <main className="w-full px-3 py-6 sm:px-4">
        <h2 className="mb-6 text-2xl font-extrabold text-amber-300 sm:text-3xl">
          Carrinho
        </h2>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-400/30 bg-stone-900/85 p-8 text-center shadow-md shadow-black/40">
          <span className="text-4xl">🛒</span>
          <p className="text-lg font-semibold text-amber-100">Seu carrinho está vazio</p>
          <p className="text-sm text-amber-100/60">Adicione produtos para continuar</p>
          <Link to="/" className="mt-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-stone-900 transition hover:bg-amber-300">
            Ver produtos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full px-3 py-6 sm:px-4">
      <h2 className="mb-6 text-2xl font-extrabold text-amber-300 sm:text-3xl">
        Carrinho
      </h2>

      <ul className="flex flex-col gap-4">
        {cartItems.map(item => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-amber-400/40 bg-stone-900/85 p-4 shadow-md shadow-black/40"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-16 object-contain shrink-0"
            />

            <div className="flex flex-1 flex-col gap-1">
              <p className="text-sm font-semibold text-amber-100 line-clamp-2">{item.title}</p>
              <p className="text-sm text-amber-100/60">
                Quantidade: <span className="font-bold text-amber-100">{item.quantity}</span>
              </p>
              <p className="text-sm font-extrabold text-amber-400">
                {(item.price * item.quantity).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-1.5 text-sm font-semibold text-red-400 transition hover:bg-red-400/20"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-amber-400/40 bg-stone-900/85 p-5 shadow-lg shadow-black/40 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-extrabold text-amber-100">
          Total:{" "}
          <span className="text-amber-400">
            {totalPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20"
          >
            Limpar carrinho
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-stone-900 shadow-sm transition hover:bg-amber-300 active:scale-95"
          >
            Finalizar compra
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-amber-400/30 bg-stone-900 p-6 shadow-2xl shadow-black/60">
            {success ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <span className="text-5xl">✅</span>
                <p className="text-xl font-extrabold text-amber-300">Compra realizada!</p>
                <p className="text-sm text-amber-100/60">Obrigado pela sua compra.</p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-amber-300">Dados do cartão</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-amber-100/50 transition hover:text-amber-100"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-amber-100/70">Número do cartão</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                      className="rounded-lg border border-amber-400/30 bg-stone-800 px-3 py-2 text-sm text-amber-100 placeholder-amber-100/30 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-amber-100/70">Nome no cartão</label>
                    <input
                      type="text"
                      placeholder="NOME SOBRENOME"
                      value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                      className="rounded-lg border border-amber-400/30 bg-stone-800 px-3 py-2 text-sm text-amber-100 placeholder-amber-100/30 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-1 flex-col gap-1">
                      <label className="text-xs font-semibold text-amber-100/70">Validade</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                        className="rounded-lg border border-amber-400/30 bg-stone-800 px-3 py-2 text-sm text-amber-100 placeholder-amber-100/30 outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-amber-100/70">CVV</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        value={cvv}
                        onChange={e => setCvv(formatCVV(e.target.value))}
                        className="w-20 rounded-lg border border-amber-400/30 bg-stone-800 px-3 py-2 text-sm text-amber-100 placeholder-amber-100/30 outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] leading-tight text-amber-100/40">
                    *Não nos responsabilizamos por cartões clonados e dados inseridos indevidamente neste formulário. Insira suas informações por sua conta e risco.
                  </p>

                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm font-bold text-amber-100">
                      Total:{" "}
                      <span className="text-amber-400">
                        {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </p>
                    <button
                      onClick={handleFinalize}
                      disabled={!isFormValid}
                      className="rounded-lg bg-amber-400 px-5 py-2 text-sm font-bold text-stone-900 transition hover:bg-amber-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Pagar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default Cart
