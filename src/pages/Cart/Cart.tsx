import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"

function formatCardNumber(value: string) {
  return value.replaceAll(/\D/g, "").slice(0, 16).replaceAll(/(.{4})/g, "$1 ").trim()
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
        <h2 className="mb-6 text-2xl font-extrabold text-zinc-100 sm:text-3xl">
          Carrinho
        </h2>
        <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-sm">
          <span className="text-4xl">🛒</span>
          <p className="text-lg font-semibold text-zinc-100">Seu carrinho está vazio</p>
          <p className="text-sm text-zinc-500">Adicione produtos para continuar</p>
          <Link to="/" className="mt-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-800">
            Ver produtos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full px-3 py-6 sm:px-4">
      <h2 className="mb-6 text-2xl font-extrabold text-zinc-100 sm:text-3xl">
        Carrinho
      </h2>

      <ul className="flex flex-col gap-4">
        {cartItems.map(item => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-16 object-contain shrink-0"
            />

            <div className="flex flex-1 flex-col gap-1">
              <p className="text-sm font-semibold text-zinc-100 line-clamp-2">{item.title}</p>
              <p className="text-sm text-zinc-500">
                Quantidade: <span className="font-bold text-zinc-300">{item.quantity}</span>
              </p>
              <p className="text-sm font-extrabold text-red-400">
                {(item.price * item.quantity).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-extrabold text-zinc-100">
          Total:{" "}
          <span className="text-red-400">
            {totalPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-700"
          >
            Limpar carrinho
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-red-900 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-red-800 active:scale-95"
          >
            Finalizar compra
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            {success ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <span className="text-5xl">✅</span>
                <p className="text-xl font-extrabold text-zinc-100">Compra realizada!</p>
                <p className="text-sm text-zinc-500">Obrigado pela sua compra.</p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-zinc-100">Dados do cartão</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-zinc-500 transition hover:text-zinc-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="cardNumber" className="text-xs font-semibold text-zinc-400">Número do cartão</label>
                    <input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                      className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-red-800"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="cardName" className="text-xs font-semibold text-zinc-400">Nome no cartão</label>
                    <input
                      id="cardName"
                      type="text"
                      placeholder="NOME SOBRENOME"
                      value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                      className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-red-800"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-1 flex-col gap-1">
                      <label htmlFor="expiry" className="text-xs font-semibold text-zinc-400">Validade</label>
                      <input
                        id="expiry"
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-red-800"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="cvv" className="text-xs font-semibold text-zinc-400">CVV</label>
                      <input
                        id="cvv"
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        value={cvv}
                        onChange={e => setCvv(formatCVV(e.target.value))}
                        className="w-20 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-red-800"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] leading-tight text-zinc-600">
                    *Não nos responsabilizamos por cartões clonados e dados inseridos indevidamente neste formulário. Insira suas informações por sua conta e risco.
                  </p>

                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm font-bold text-zinc-100">
                      Total:{" "}
                      <span className="text-red-400">
                        {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </p>
                    <button
                      onClick={handleFinalize}
                      disabled={!isFormValid}
                      className="rounded-lg bg-red-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
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
