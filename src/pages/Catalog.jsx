import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [selectedGun, setSelectedGun] = useState(null)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  // Ekstrak kategori secara dinamis dari data
  const categories = ['All', ...new Set(GUNS.map((gun) => gun.type))]

  // Filter pencarian dan tipe
  const filteredGuns = GUNS.filter((gun) => {
    const matchSearch = gun.name.toLowerCase().includes(search.toLowerCase()) ||
                        gun.caliber.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'All' || gun.type === filterType
    return matchSearch && matchType
  })

  const handleOpenCheckout = (gun) => {
    setSelectedGun(gun)
    setCheckoutSuccess(false)
  }

  const handleConfirmCheckout = (e) => {
    e.preventDefault()
    setCheckoutSuccess(true)
  }

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        {/* Toolbar: Search & Filter Tipe */}
        <div className="catalog-toolbar">
          <input
            type="text"
            placeholder="Search by gun name or caliber..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="toolbar-input"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="toolbar-select"
          >
            {categories.map((type) => (
              <option key={type} value={type}>
                {type === 'All' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filteredGuns.length} pieces</span>
        </div>

        {/* Tampilan Kondisi: Ada Data vs 'no guns match' */}
        {filteredGuns.length > 0 ? (
          <ul className="stock">
            {filteredGuns.map((gun) => (
              <GunCard 
                key={gun.name} 
                gun={gun} 
                onCheckout={handleOpenCheckout} 
              />
            ))}
          </ul>
        ) : (
          <div className="empty-notice">
            <p>no guns match</p>
          </div>
        )}
      </section>

      {/* Modal / Dialog Fitur Checkout */}
      {selectedGun && (
        <div className="checkout-overlay" onClick={() => setSelectedGun(null)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close" onClick={() => setSelectedGun(null)}>&times;</button>
            
            {!checkoutSuccess ? (
              <form onSubmit={handleConfirmCheckout} className="checkout-form">
                <h3>Checkout Order</h3>
                <div className="checkout-summary">
                  <p><strong>Item:</strong> {selectedGun.name}</p>
                  <p><strong>Caliber:</strong> {selectedGun.caliber}</p>
                  <p><strong>Total:</strong> ${selectedGun.price}</p>
                </div>
                
                <label>Nama Pemesan:</label>
                <input type="text" required placeholder="Masukkan nama lengkap..." />
                
                <label>Alamat Pengiriman:</label>
                <input type="text" required placeholder="Masukkan alamat..." />

                <button type="submit" className="btn-submit-order">
                  Konfirmasi Pembelian (${selectedGun.price})
                </button>
              </form>
            ) : (
              <div className="checkout-success-view">
                <h3>Order Confirmed!</h3>
                <p>Pesanan untuk <strong>{selectedGun.name}</strong> berhasil diproses.</p>
                <p className="success-badge">Status: Berhasil</p>
                <button 
                  className="btn-submit-order"
                  onClick={() => setSelectedGun(null)}
                >
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Catalog