function GunCard({ gun, onAddToCart }) {
  return (
    <li className="gun-card">
      <div className="gun-image-container">
        <img src={gun.image} alt={gun.name} />
      </div>
      <div className="gun-info">
        <div className="gun-head">
          <h3 className="gun-name">{gun.name}</h3>
          <span className="gun-price">${gun.price}</span>
        </div>
        <p className="gun-type">{gun.type} &bull; {gun.caliber}</p>
        <p className="gun-desc">{gun.description}</p>
        <button
          className="btn-add-cart"
          onClick={() => onAddToCart(gun)}
        >
          + Tambah ke Keranjang
        </button>
      </div>
    </li>
  )
}

export default GunCard