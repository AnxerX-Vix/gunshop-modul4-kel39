import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ onAddToCart = () => {} }) {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [isSorted, setIsSorted] = useState(false)

  // Ekstrak kategori secara dinamis dari data senjata
  const categories = ['All', ...new Set((GUNS || []).map((gun) => gun.type))]

  // Filter pencarian dan tipe
  const filteredGuns = (GUNS || []).filter((gun) => {
    const query = search.toLowerCase()
    const matchSearch =
      (gun.name && gun.name.toLowerCase().includes(query)) ||
      (gun.caliber && gun.caliber.toLowerCase().includes(query))
    const matchType = filterType === 'All' || gun.type === filterType
    return matchSearch && matchType
  })

  // Pengurutan berdasarkan harga jika sort toggle aktif
  const displayedGuns = isSorted
    ? [...filteredGuns].sort((a, b) => (a.price || 0) - (b.price || 0))
    : filteredGuns

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        {/* Toolbar: Search, Filter Tipe, dan Toggle Sort */}
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

          <button
            type="button"
            className={`btn-sort-toggle ${isSorted ? 'active-sort' : ''}`}
            onClick={() => setIsSorted((prev) => !prev)}
          >
            {isSorted ? 'Harga: Termurah ↑' : 'Urutkan Harga'}
          </button>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{displayedGuns.length} pieces</span>
        </div>

        {/* Tampilan Kondisi: Ada Data vs 'no guns match' */}
        {displayedGuns.length > 0 ? (
          <ul className="stock">
            {displayedGuns.map((gun) => (
              <GunCard
                key={gun.name}
                gun={gun}
                onAddToCart={onAddToCart}
              />
            ))}
          </ul>
        ) : (
          <div className="empty-notice">
            <p>no guns match</p>
          </div>
        )}
      </section>
    </>
  )
}

export default Catalog