import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import PageTransition from '../components/ui/PageTransition'
import { products } from '../data/products'

const menCategories = ['All', 'Shirts', 'Blazers', 'Trousers', 'Knitwear', 'Outerwear']

export default function MenCollection() {
  const [active, setActive] = useState('All')

  const menProducts = products.filter(p => p.gender === 'men')
  const filtered = active === 'All'
    ? menProducts
    : menProducts.filter(p => p.category === active.toLowerCase())

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[55vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&q=85"
          alt="Men's Collection"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/30" />
        <div className="absolute inset-0 flex items-end pb-14 px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle text-rose-brand mb-3">NOIR</p>
            <h1 className="font-display text-5xl md:text-7xl text-white font-semibold">Men's</h1>
            <p className="text-slate-300 font-body mt-3 max-w-md">Precision tailoring meets modern sensibility. Crafted for the contemporary man.</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white dark:bg-navy border-b border-slate-100 dark:border-slate-700 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-0 overflow-x-auto scrollbar-hide">
          {menCategories.map(cat => (
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

      {/* Banner */}
      <section className="bg-slate-50 dark:bg-navy-light py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-subtitle text-rose-brand mb-3">Style Guide</p>
          <h2 className="font-display text-3xl md:text-4xl text-navy dark:text-white mb-6">Build Your Capsule Wardrobe</h2>
          <p className="font-body text-slate-brand text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Our curated guide helps you select the essential pieces that form a complete, versatile wardrobe built to last seasons.
          </p>
          <Link to="/blog" className="btn-primary inline-block">Read the Guide</Link>
        </div>
      </section>
    </PageTransition>
  )
}
