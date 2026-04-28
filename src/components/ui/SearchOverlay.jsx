import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSearch, selectSearchOpen } from '../../store/uiSlice'
import { products } from '../../data/products'

export default function SearchOverlay() {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectSearchOpen)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && dispatch(toggleSearch())
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const results = query.length > 1
    ? products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : []

  const trending = ['Linen Shirts', 'Wool Coat', 'Silk Dress', 'Blazer', 'Trousers']

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white dark:bg-navy z-[100] flex flex-col"
        >
          <div className="max-w-3xl mx-auto w-full px-6 py-8 flex-1">
            <div className="flex items-center justify-between mb-10">
              <span className="font-display text-xl text-navy dark:text-white">Search</span>
              <button
                onClick={() => dispatch(toggleSearch())}
                className="p-2 text-navy dark:text-white hover:text-rose-brand transition-colors"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Input */}
            <div className="flex items-center border-b-2 border-navy dark:border-white pb-3 mb-10">
              <FiSearch className="text-slate-brand mr-3" size={20} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 text-xl font-body text-navy dark:text-white bg-transparent outline-none placeholder-slate-300"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-brand hover:text-navy dark:hover:text-white">
                  <FiX size={16} />
                </button>
              )}
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <div>
                <p className="text-xs font-body text-slate-brand tracking-widest uppercase mb-5">Results ({results.length})</p>
                <div className="space-y-4">
                  {results.map(p => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => dispatch(toggleSearch())}
                      className="flex items-center gap-4 group"
                    >
                      <img src={p.image} alt={p.title} className="w-14 h-16 object-cover bg-slate-100" />
                      <div>
                        <p className="font-body text-sm font-medium text-navy dark:text-white group-hover:text-rose-brand transition-colors">{p.title}</p>
                        <p className="text-xs text-slate-brand">PKR {p.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : query.length > 1 ? (
              <p className="font-body text-slate-brand">No results found for "{query}"</p>
            ) : (
              <div>
                <p className="text-xs font-body text-slate-brand tracking-widest uppercase mb-5">Trending Searches</p>
                <div className="flex flex-wrap gap-3">
                  {trending.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-600 text-sm font-body text-navy dark:text-white hover:border-rose-brand hover:text-rose-brand dark:hover:border-rose-brand transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
