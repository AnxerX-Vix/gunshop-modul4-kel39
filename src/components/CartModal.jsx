function CartModal({ cart = [], onClose = () => {}, onUpdateQuantity = () => {} }) {
  // Proteksi defensif memastikan cart selalu array yang valid
  const safeCart = Array.isArray(cart) ? cart : []

  // Menghitung total harga secara aman
  const totalPrice = safeCart.reduce(
    (sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 0),
    0
  )

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h3>Keranjang Belanja</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>

        {safeCart.length === 0 ? (
          <div className="cart-empty">
            <p>Keranjang belanja masih kosong.</p>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {safeCart.map((item, index) => (
                <li key={item?.name || index} className="cart-item">
                  <div className="cart-item-detail">
                    <strong>{item?.name}</strong>
                    <span>${item?.price} x {item?.quantity}</span>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="btn-qty"
                      onClick={() => onUpdateQuantity(item?.name, -1)}
                    >
                      -
                    </button>
                    <span className="qty-count">{item?.quantity}</span>
                    <button
                      type="button"
                      className="btn-qty"
                      onClick={() => onUpdateQuantity(item?.name, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    ${(Number(item?.price) || 0) * (Number(item?.quantity) || 0)}
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
                type="button"
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