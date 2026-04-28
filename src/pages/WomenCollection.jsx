import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import PageTransition from '../components/ui/PageTransition'
import { products } from '../data/products'

const womenCategories = ['All', 'Dresses', 'Tops', 'Trousers', 'Bottoms', 'Outerwear']

export default function WomenCollection() {
  const [active, setActive] = useState('All')

  const womenProducts = products.filter(p => p.gender === 'women')
  const filtered = active === 'All'
    ? womenProducts
    : womenProducts.filter(p => p.category === active.toLowerCase())

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[55vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=85"
          alt="Women's Collection"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/80 to-navy/20" />
        <div className="absolute inset-0 flex items-end justify-end pb-14 px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-right"
          >
            <p className="section-subtitle text-rose-brand mb-3">NOIR</p>
            <h1 className="font-display text-5xl md:text-7xl text-white font-semibold">Women's</h1>
            <p className="text-slate-300 font-body mt-3 max-w-md ml-auto">
              Fluid femininity with refined structure. For women who define their own aesthetic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white dark:bg-navy border-b border-slate-100 dark:border-slate-700 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-0 overflow-x-auto scrollbar-hide">
          {womenCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-5 py-4 text-xs font-body font-medium tracking-widest uppercase transition-all border-b-2 ${
                active === cat
                  ? 'border-rose-brand text-rose-brand'
                  : 'border-transparent text-slate-brand hover:text-navy dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-body text-slate-brand">{filtered.length} products</p>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-navy dark:text-white">Coming Soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </section>

      {/* Editorial Feature */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-0 items-stretch">
          <div className="overflow-hidden aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80"
              alt="Editorial"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="bg-navy dark:bg-navy-light flex items-center px-10 py-14">
            <div>
              <p className="section-subtitle text-rose-brand mb-4">AW24 Lookbook</p>
              <h2 className="font-display text-3xl md:text-4xl text-white font-semibold leading-tight">
                Desert Modernism — The Season in Looks
              </h2>
              <p className="text-slate-400 font-body text-sm mt-4 leading-relaxed">
                Our autumn-winter collection draws from the sculpted terrains of the Pakistani desert — austere, beautiful, and enduring.
              </p>
              <Link to="/blog/2" className="mt-8 inline-flex items-center gap-2 text-xs font-body text-white tracking-widest uppercase border-b border-white/30 pb-1 hover:border-rose-brand hover:text-rose-brand transition-all">
                View Lookbook →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
