import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import CartModal from './components/CartModal.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Fungsi menambah barang ke keranjang belanja
  const handleAddToCart = (gun) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === gun.name)
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === gun.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...gun, quantity: 1 }]
    })
  }

  // Fungsi mengatur kuantitas item (+ / -)
  const handleUpdateQuantity = (gunName, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.name === gunName) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  // Menghitung total seluruh kuantitas item untuk badge di Header
  const totalItemCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        cartCount={totalItemCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main className="main">
        {tab === 'Catalog' && <Catalog onAddToCart={handleAddToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>
      <Footer />

      {/* Modal Keranjang Belanja */}
      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </div>
  )
}

export default App