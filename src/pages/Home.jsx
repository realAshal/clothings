import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import ProductCard from '../components/ui/ProductCard'
import PageTransition from '../components/ui/PageTransition'
import { products, blogPosts } from '../data/products'

const heroSlides = [
  {
    id: 1,
    headline: "The New\nNoir Season",
    sub: "FW24 Collection — Where architecture meets wearable art",
    cta: "Explore Collection",
    ctaPath: "/shop",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&q=85",
    align: "left",
  },
  {
    id: 2,
    headline: "Women's\nEditorial",
    sub: "Fluid silhouettes for the modern woman",
    cta: "Shop Women",
    ctaPath: "/women",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=85",
    align: "right",
  },
  {
    id: 3,
    headline: "Refined\nMasculinity",
    sub: "Precision tailoring for the contemporary man",
    cta: "Shop Men",
    ctaPath: "/men",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1400&q=85",
    align: "left",
  },
]

function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [imageLoaded, setImageLoaded] = useState({})

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[current]

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background */}
      {heroSlides.map((s, i) => (
        <motion.div
          key={s.id}
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(prev => ({ ...prev, [i]: true }))}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/30 to-transparent" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        <div className={`max-w-xl ${slide.align === 'right' ? 'ml-auto text-right' : ''}`}>
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-body tracking-[0.3em] uppercase text-rose-brand mb-4"
          >
            {slide.sub}
          </motion.p>
          <motion.h1
            key={`head-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-6xl md:text-8xl font-semibold text-white leading-tight whitespace-pre-line"
          >
            {slide.headline}
          </motion.h1>
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
          >
            <Link
              to={slide.ctaPath}
              className="inline-flex items-center gap-3 bg-white text-navy px-8 py-4 text-xs font-body font-semibold tracking-widest uppercase hover:bg-rose-brand hover:text-white transition-all duration-300 group"
            >
              {slide.cta}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Nav Arrows */}
      <button
        onClick={() => setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-navy transition-all"
      >
        <FiChevronLeft />
      </button>
      <button
        onClick={() => setCurrent(c => (c + 1) % heroSlides.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-navy transition-all"
      >
        <FiChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 ${i === current ? 'w-8 h-1 bg-white' : 'w-2 h-1 bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  )
}

function CategoryStrip() {
  const categories = [
    { label: "Men's Collection", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80", path: "/men" },
    { label: "Women's Collection", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", path: "/women" },
    { label: "New Arrivals", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", path: "/shop?tag=new" },
    { label: "Sale", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&q=80", path: "/shop?tag=sale" },
  ]

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={cat.path} className="relative block group overflow-hidden aspect-[3/4]">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-body font-medium text-sm tracking-wide">{cat.label}</p>
                <p className="text-rose-brand text-xs font-body mt-1 group-hover:text-white transition-colors flex items-center gap-1">
                  Shop Now <FiArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const ref = useRef(null)
  const featured = products.filter(p => p.tags.includes('bestseller')).slice(0, 4)

  return (
    <section ref={ref} className="py-16 max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="section-subtitle text-rose-brand mb-3">Curated Picks</p>
          <h2 className="section-title text-navy dark:text-white">Best Sellers</h2>
        </div>
        <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-body text-slate-brand hover:text-rose-brand transition-colors group">
          View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
      <div className="text-center mt-10 md:hidden">
        <Link to="/shop" className="btn-outline inline-block">View All Products</Link>
      </div>
    </section>
  )
}

function NewArrivals() {
  const newProducts = products.filter(p => p.tags.includes('new')).slice(0, 3)

  return (
    <section className="bg-navy dark:bg-navy-dark py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-subtitle text-rose-brand mb-3">Just Dropped</p>
          <h2 className="section-title text-white">New Arrivals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white font-body text-xs tracking-widest uppercase flex items-center gap-2">
                      View Product <FiArrowRight size={11} />
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-body font-medium text-white text-sm">{product.title}</h3>
                  <p className="text-rose-brand font-body text-sm mt-1">PKR {product.price.toLocaleString()}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandValues() {
  const values = [
    { icon: '◈', title: 'Premium Materials', desc: 'Every fabric is sourced from certified mills across Europe and South Asia.' },
    { icon: '◉', title: 'Ethical Production', desc: 'Fair wages, safe conditions, and sustainable practices across our supply chain.' },
    { icon: '◫', title: 'Timeless Design', desc: 'We design for longevity — pieces that remain relevant season after season.' },
    { icon: '◍', title: 'Crafted in Pakistan', desc: 'Proudly supporting local artisans and master craftsmen.' },
  ]
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl text-rose-brand mb-4">{v.icon}</div>
            <h4 className="font-body font-semibold text-sm text-navy dark:text-white mb-2">{v.title}</h4>
            <p className="font-body text-xs text-slate-brand leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function LatestBlog() {
  const posts = blogPosts.slice(0, 3)
  return (
    <section className="py-16 bg-slate-50 dark:bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-subtitle text-rose-brand mb-3">From the Journal</p>
            <h2 className="section-title text-navy dark:text-white">Style Notes</h2>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-2 text-sm font-body text-slate-brand hover:text-rose-brand transition-colors group">
            All Posts <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block">
                <div className="overflow-hidden aspect-[16/10] mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-[10px] font-body text-rose-brand tracking-widest uppercase mb-2">{post.category} · {post.readTime}</p>
                <h3 className="font-display text-lg font-semibold text-navy dark:text-white leading-snug group-hover:text-rose-brand transition-colors">{post.title}</h3>
                <p className="text-sm font-body text-slate-brand mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <HeroCarousel />
      <CategoryStrip />
      <FeaturedProducts />
      <NewArrivals />
      <BrandValues />
      <LatestBlog />
    </PageTransition>
  )
}
