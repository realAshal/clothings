import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiClock, FiUser } from 'react-icons/fi'
import PageTransition from '../components/ui/PageTransition'
import { blogPosts } from '../data/products'

const blogCategories = ['All', 'Style Guide', 'Lookbook', 'Behind the Brand']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  const featured = blogPosts[0]
  const rest = filtered.slice(1)

  return (
    <PageTransition>
      {/* Header */}
      <div className="bg-navy dark:bg-navy-dark py-16 text-center px-6">
        <p className="section-subtitle text-rose-brand mb-3">NOIR Journal</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-semibold">Blog & Lookbook</h1>
        <p className="text-slate-400 font-body text-sm mt-3 max-w-md mx-auto">
          Style stories, behind-the-scenes, trend reports, and seasonal lookbooks.
        </p>
      </div>

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <Link to={`/blog/${featured.id}`} className="group grid md:grid-cols-2 gap-0 overflow-hidden border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-colors">
          <div className="overflow-hidden aspect-video md:aspect-auto md:min-h-[400px]">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center px-8 md:px-12 py-10 bg-white dark:bg-navy-light">
            <span className="inline-block text-[10px] font-body font-medium tracking-widest uppercase text-rose-brand mb-3 bg-rose-50 dark:bg-rose-900/20 px-3 py-1 self-start">
              {featured.category}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy dark:text-white leading-tight group-hover:text-rose-brand transition-colors">
              {featured.title}
            </h2>
            <p className="font-body text-sm text-slate-brand mt-4 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center gap-5 mt-6 text-xs font-body text-slate-brand">
              <span className="flex items-center gap-1.5"><FiUser size={11} /> {featured.author}</span>
              <span className="flex items-center gap-1.5"><FiClock size={11} /> {featured.readTime}</span>
              <span>{featured.date}</span>
            </div>
            <div className="flex items-center gap-2 mt-6 text-sm font-body font-medium text-navy dark:text-white group-hover:text-rose-brand transition-colors">
              Read Article <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </section>

      {/* Category Filter */}
      <div className="border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-navy sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-0 overflow-x-auto scrollbar-hide">
          {blogCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-4 text-xs font-body font-medium tracking-widest uppercase transition-all border-b-2 ${
                activeCategory === cat
                  ? 'border-rose-brand text-rose-brand'
                  : 'border-transparent text-slate-brand hover:text-navy dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/blog/${post.id}`} className="group block">
                <div className="overflow-hidden aspect-[16/10] mb-5 bg-slate-100 dark:bg-navy-light">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-body font-medium tracking-widest uppercase text-rose-brand bg-rose-50 dark:bg-rose-900/20 px-2.5 py-1">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-body text-slate-brand flex items-center gap-1">
                    <FiClock size={10} /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold text-navy dark:text-white leading-snug group-hover:text-rose-brand transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-slate-brand mt-2 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-xs font-body text-slate-brand">
                    <FiUser size={11} />
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <span className="text-xs font-body text-rose-brand group-hover:text-rose-dark transition-colors flex items-center gap-1">
                    Read <FiArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-navy dark:text-white">No posts in this category yet</p>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-navy dark:bg-navy-dark py-16 px-6 text-center">
        <p className="section-subtitle text-rose-brand mb-3">Never Miss a Story</p>
        <h2 className="font-display text-3xl md:text-4xl text-white font-semibold mb-4">Subscribe to the Journal</h2>
        <p className="font-body text-slate-400 text-sm max-w-md mx-auto mb-8">
          Get our latest style guides, lookbooks, and brand stories delivered to your inbox every two weeks.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-white/10 border border-white/20 px-5 py-3.5 text-sm font-body text-white placeholder-slate-400 focus:outline-none focus:border-rose-brand transition-colors"
          />
          <button className="bg-rose-brand px-6 py-3.5 text-xs font-body font-semibold tracking-widest uppercase text-white hover:bg-rose-dark transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </section>
    </PageTransition>
  )
}
