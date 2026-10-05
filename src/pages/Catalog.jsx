import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ onAddToCart = () => {} }) {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')
  
  // State 3 kondisi: 'none' | 'asc' | 'desc'
  const [sortPrice, setSortPrice] = useState('none')
  const [sortName, setSortName] = useState('none')

  const categories = ['All', ...new Set(GUNS.map((gun) => gun.type))]

  // Toggle Siklus Harga: none -> asc (termurah) -> desc (termahal) -> none
  const handleTogglePrice = () => {
    setSortName('none') // Matikan sort nama agar tidak bentrok
    if (sortPrice === 'none') {
      setSortPrice('asc')
    } else if (sortPrice === 'asc') {
      setSortPrice('desc')
    } else {
      setSortPrice('none')
    }
  }

  // Toggle Siklus Nama: none -> asc (A-Z) -> desc (Z-A) -> none
  const handleToggleName = () => {
    setSortPrice('none') // Matikan sort harga agar tidak bentrok
    if (sortName === 'none') {
      setSortName('asc')
    } else if (sortName === 'asc') {
      setSortName('desc')
    } else {
      setSortName('none')
    }
  }

  // 1. Filter Pencarian & Kategori
  const filteredGuns = GUNS.filter((gun) => {
    const matchSearch =
      gun.name.toLowerCase().includes(search.toLowerCase()) ||
      gun.caliber.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'All' || gun.type === filterType
    return matchSearch && matchType
  })

  // 2. Logika Pengurutan
  const processedGuns = [...filteredGuns].sort((a, b) => {
    // Pengurutan Harga
    if (sortPrice === 'asc') return a.price - b.price
    if (sortPrice === 'desc') return b.price - a.price

    // Pengurutan Nama
    if (sortName === 'asc') return a.name.localeCompare(b.name)
    if (sortName === 'desc') return b.name.localeCompare(a.name)

    return 0 // Urutan default bawaan
  })

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        {/* Toolbar Pencarian, Filter Kategori, dan 2 Tombol Sort */}
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

          {/* Tombol Toggle Harga */}
          <button
            className={`btn-sort-toggle ${sortPrice !== 'none' ? 'active-sort' : ''}`}
            onClick={handleTogglePrice}
          >
            {sortPrice === 'none' && 'Urutkan Harga'}
            {sortPrice === 'asc' && 'Harga: Termurah ↑'}
            {sortPrice === 'desc' && 'Harga: Termahal ↓'}
          </button>

          {/* Tombol Toggle Nama */}
          <button
            className={`btn-sort-toggle ${sortName !== 'none' ? 'active-sort' : ''}`}
            onClick={handleToggleName}
          >
            {sortName === 'none' && 'Urutkan Nama'}
            {sortName === 'asc' && 'Nama: A → Z ↑'}
            {sortName === 'desc' && 'Nama: Z → A ↓'}
          </button>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{processedGuns.length} pieces</span>
        </div>

        {/* Tampilan Kartu / Notifikasi Kosong */}
        {processedGuns.length > 0 ? (
          <ul className="stock">
            {processedGuns.map((gun) => (
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