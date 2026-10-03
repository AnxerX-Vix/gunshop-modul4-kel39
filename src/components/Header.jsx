function Header({ tab, onTab, cartCount, onOpenCart }) {
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
            className={`nav-btn ${tab === item ? 'active' : ''}`}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
        {/* Tombol Keranjang Belanja dengan Badge */}
        <button className="cart-header-btn" onClick={onOpenCart}>
          🛒 Keranjang
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  )
}

export default Header