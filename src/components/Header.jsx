function Header({ tab = 'Catalog', onTab = () => {}, cartCount = 0, onOpenCart = () => {} }) {
  const safeCartCount = Number(cartCount) || 0

  return (
    <header className="header">
      <div className="brand">
        <span className="brand-title">Bore &amp; Barrel</span>
        <span className="brand-sub">Kelompok 39</span>
      </div>
      <nav className="nav">
        {['Catalog', 'About', 'Contact'].map((item) => (
          <button
            key={item}
            type="button"
            className={`nav-btn ${tab === item ? 'active' : ''}`}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
        {/* Tombol Keranjang Belanja dengan Badge */}
        <button type="button" className="cart-header-btn" onClick={onOpenCart}>
          🛒 Keranjang
          {safeCartCount > 0 && <span className="cart-badge">{safeCartCount}</span>}
        </button>
      </nav>
    </header>
  )
}

export default Header