import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi'
import ProductCard from '../components/ui/ProductCard'
import PageTransition from '../components/ui/PageTransition'
import { products, categories } from '../data/products'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
]

const priceRanges = [
  { label: 'Under 5,000', min: 0, max: 5000 },
  { label: '5,000 – 10,000', min: 5000, max: 10000 },
  { label: '10,000 – 20,000', min: 10000, max: 20000 },
  { label: 'Over 20,000', min: 20000, max: Infinity },
]

export default function Shop() {
  const [searchParams] = useSearchParams()
  const tagFilter = searchParams.get('tag')

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedGender, setSelectedGender] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [sortBy, setSortBy] = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)
  const [view, setView] = useState('grid')

  const filtered = useMemo(() => {
    let result = [...products]
    if (tagFilter) result = result.filter(p => p.tags.includes(tagFilter))
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory)
    if (selectedGender !== 'all') result = result.filter(p => p.gender === selectedGender)
    if (selectedPrice) result = result.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max)

    switch (sortBy) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price)
      case 'price-desc': return result.sort((a, b) => b.price - a.price)
      case 'newest': return result.sort((a, b) => (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0))
      case 'rating': return result.sort((a, b) => b.rating - a.rating)
      default: return result
    }
  }, [selectedCategory, selectedGender, selectedPrice, sortBy, tagFilter])

  const activeFilters = [
    selectedCategory !== 'all' && selectedCategory,
    selectedGender !== 'all' && selectedGender,
    selectedPrice && selectedPrice.label,
  ].filter(Boolean)

  return (
    <PageTransition>
      {/* Header */}
      <div className="bg-navy dark:bg-navy-dark py-14 px-6 text-center">
        <p className="section-subtitle text-rose-brand mb-3">
          {tagFilter ? tagFilter.toUpperCase() : 'All Products'}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-semibold">
          {tagFilter === 'new' ? 'New Arrivals' : tagFilter === 'sale' ? 'Sale' : 'Shop All'}
        </h1>
        <p className="text-slate-400 font-body text-sm mt-3">{filtered.length} products</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-7 gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 text-sm font-body text-navy dark:text-white hover:border-navy dark:hover:border-white transition-colors"
            >
              <FiFilter size={14} /> Filters
              {activeFilters.length > 0 && (
                <span className="bg-rose-brand text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{activeFilters.length}</span>
              )}
            </button>

            {/* Active filter chips */}
            {activeFilters.map(f => (
              <span key={f} className="flex items-center gap-1 px-3 py-1.5 bg-navy dark:bg-white text-white dark:text-navy text-xs font-body">
                {f}
                <button onClick={() => {
                  if (f === selectedCategory) setSelectedCategory('all')
                  if (f === selectedGender) setSelectedGender('all')
                  if (f === selectedPrice?.label) setSelectedPrice(null)
                }} className="ml-1">
                  <FiX size={10} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm font-body border border-slate-200 dark:border-slate-600 text-navy dark:text-white bg-transparent px-3 py-2 focus:outline-none focus:border-rose-brand"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <div className="flex gap-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 transition-colors ${view === 'grid' ? 'text-rose-brand' : 'text-slate-brand hover:text-navy dark:hover:text-white'}`}
              >
                <FiGrid size={16} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 transition-colors ${view === 'list' ? 'text-rose-brand' : 'text-slate-brand hover:text-navy dark:hover:text-white'}`}
              >
                <FiList size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={false}
            animate={{ width: filterOpen ? 240 : 0, opacity: filterOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex-shrink-0"
          >
            {filterOpen && (
              <div className="w-60 space-y-8">
                {/* Category */}
                <div>
                  <p className="text-xs font-body font-semibold tracking-widest uppercase text-navy dark:text-white mb-4">Category</p>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`block w-full text-left text-sm font-body py-1.5 transition-colors ${
                          selectedCategory === cat.id
                            ? 'text-rose-brand font-medium'
                            : 'text-slate-brand hover:text-navy dark:hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <p className="text-xs font-body font-semibold tracking-widest uppercase text-navy dark:text-white mb-4">Gender</p>
                  <div className="space-y-2">
                    {['all', 'men', 'women'].map(g => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`block w-full text-left text-sm font-body py-1.5 transition-colors capitalize ${
                          selectedGender === g
                            ? 'text-rose-brand font-medium'
                            : 'text-slate-brand hover:text-navy dark:hover:text-white'
                        }`}
                      >
                        {g === 'all' ? 'All' : g === 'men' ? "Men's" : "Women's"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-xs font-body font-semibold tracking-widest uppercase text-navy dark:text-white mb-4">Price Range</p>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <button
                        key={range.label}
                        onClick={() => setSelectedPrice(selectedPrice?.label === range.label ? null : range)}
                        className={`block w-full text-left text-sm font-body py-1.5 transition-colors ${
                          selectedPrice?.label === range.label
                            ? 'text-rose-brand font-medium'
                            : 'text-slate-brand hover:text-navy dark:hover:text-white'
                        }`}
                      >
                        PKR {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedGender('all'); setSelectedPrice(null) }}
                  className="text-xs font-body text-slate-brand hover:text-rose-brand transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-2xl text-navy dark:text-white mb-3">No products found</p>
                <p className="font-body text-slate-brand text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={`grid gap-5 md:gap-7 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                {filtered.map((product, i) => (
                  view === 'list' ? (
                    <ListProductCard key={product.id} product={product} index={i} />
                  ) : (
                    <ProductCard key={product.id} product={product} index={i} />
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

function ListProductCard({ product, index }) {
  const formatPrice = (price) => `PKR ${price.toLocaleString()}`
  const dispatch = null
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-5 border border-slate-100 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-500 transition-colors group"
    >
      <a href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-24 h-28 object-cover bg-slate-100 flex-shrink-0 group-hover:opacity-90 transition-opacity"
        />
      </a>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <p className="text-[10px] font-body text-slate-brand tracking-widest uppercase">{product.category}</p>
          <h3 className="font-body font-medium text-navy dark:text-white mt-1">{product.title}</h3>
          <p className="text-xs font-body text-slate-brand mt-2 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-body font-semibold text-navy dark:text-white">{formatPrice(product.price)}</span>
          <a
            href={`/product/${product.id}`}
            className="text-xs font-body text-rose-brand hover:text-rose-dark transition-colors"
          >
            View →
          </a>
        </div>
      </div>
    </motion.div>
  )
}
