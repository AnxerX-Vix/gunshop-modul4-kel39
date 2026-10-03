// Tambahkan "= []" pada parameter props cart
function CartModal({ cart = [], onClose, onUpdateQuantity }) {
  // Tambahkan pelindung (cart || []) sebelum memanggil .reduce
  const totalPrice = (cart || []).reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h3>Keranjang Belanja</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Keranjang belanja masih kosong.</p>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.name} className="cart-item">
                  <div className="cart-item-detail">
                    <strong>{item.name}</strong>
                    <span>${item.price} x {item.quantity}</span>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="btn-qty"
                      onClick={() => onUpdateQuantity(item.name, -1)}
                    >
                      -
                    </button>
                    <span className="qty-count">{item.quantity}</span>
                    <button
                      className="btn-qty"
                      onClick={() => onUpdateQuantity(item.name, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    ${item.price * item.quantity}
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Total Pembayaran:</span>
                <strong className="cart-total-price">${totalPrice}</strong>
              </div>
              <button
                className="btn-checkout-action"
                onClick={() => {
                  alert(`Pesanan berhasil diproses dengan total $${totalPrice}!`)
                  onClose()
                }}
              >
                Checkout Sekarang
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartModal