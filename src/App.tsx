import Header from "./components/Header/Header"
import Home from "./pages/Home/Home.tsx"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
      <Header />
      <Home />
    </div>
  )
}

export default App