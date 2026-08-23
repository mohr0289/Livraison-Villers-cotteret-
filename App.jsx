import { useState } from 'react'
import Header from './components/Header.jsx'
import BottomNav from './components/BottomNav.jsx'
import Home from './components/Home.jsx'
import ShopList from './components/ShopList.jsx'
import Cart from './components/Cart.jsx'
import OrderTracking from './components/OrderTracking.jsx'

export default function App() {
  const [screen, setScreen] = useState('home') // home | shop | cart | tracking
  const [selectedCommerce, setSelectedCommerce] = useState(null)
  const [cartItems, setCartItems] = useState([]) // [{ produit, quantite }]
  const [lastOrderId, setLastOrderId] = useState(null)

  function goToShop(commerce) {
    setSelectedCommerce(commerce)
    setScreen('shop')
  }

  function addToCart(produit) {
    setCartItems((prev) => {
      const existant = prev.find((item) => item.produit.identifiant === produit.identifiant)
      if (existant) {
        return prev.map((item) =>
          item.produit.identifiant === produit.identifiant
            ? { ...item, quantite: item.quantite + 1 }
            : item
        )
      }
      return [...prev, { produit, quantite: 1 }]
    })
  }

  function updateQuantity(produitId, delta) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.produit.identifiant === produitId
            ? { ...item, quantite: item.quantite + delta }
            : item
        )
        .filter((item) => item.quantite > 0)
    )
  }

  function clearCart() {
    setCartItems([])
  }

  function onOrderPlaced(orderId) {
    setLastOrderId(orderId)
    clearCart()
    setScreen('tracking')
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantite, 0)

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header screen={screen} selectedCommerce={selectedCommerce} />

      <main className="flex-1 pb-24 pt-4 px-4 max-w-md mx-auto w-full">
        {screen === 'home' && <Home onSelectCommerce={goToShop} />}
        {screen === 'shop' && selectedCommerce && (
          <ShopList commerce={selectedCommerce} onAddToCart={addToCart} />
        )}
        {screen === 'cart' && (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onOrderPlaced={onOrderPlaced}
          />
        )}
        {screen === 'tracking' && <OrderTracking orderId={lastOrderId} />}
      </main>

      <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} />
    </div>
  )
}
