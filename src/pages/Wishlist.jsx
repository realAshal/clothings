import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiX, FiArrowRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { selectWishlistItems, removeFromWishlist } from '../store/wishlistSlice'
import { addToCart } from '../store/cartSlice'
import PageTransition from '../components/ui/PageTransition'
import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'

export default function Wishlist() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)
  const formatPrice = (p) => `PKR ${p.toLocaleString()}`

  const suggestions = products
    .filter(p => !wishlistItems.find(w => w.id === p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ product: item, size: item.sizes[0], color: item.colors[0] }))
    dispatch(removeFromWishlist(item.id))
  }

  return (
    <PageTransition>
      <div className="bg-navy dark:bg-navy-dark py-12 text-center px-6">
        <p className="section-subtitle text-rose-brand mb-3">Saved Items</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-semibold">Wishlist</h1>
        {wishlistItems.length > 0 && (
          <p className="text-slate-400 font-body text-sm mt-3">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 flex flex-col items-center gap-6"
          >
            <FiHeart size={64} className="text-slate-200 dark:text-slate-700" />
            <h2 className="font-display text-2xl text-navy dark:text-white">Your wishlist is empty</h2>
            <p className="font-body text-sm text-slate-brand max-w-xs">
              Save your favourite pieces here and revisit them whenever you're ready.
            </p>
            <Link to="/shop" className="btn-primary">Explore Products</Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {wishlistItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      className="absolute top-3 right-3 z-10 w-7 h-7 bg-white dark:bg-navy shadow flex items-center justify-center text-slate-400 hover:text-rose-brand hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
                    >
                      <FiX size={13} />
                    </button>

                    <Link to={`/product/${item.id}`}>
                      <div className="overflow-hidden aspect-[3/4] bg-slate-100 dark:bg-navy-light">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    <div className="p-4">
                      <p className="text-[10px] font-body text-slate-brand tracking-widest uppercase mb-1">{item.category}</p>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-body font-medium text-navy dark:text-white text-sm hover:text-rose-brand transition-colors leading-snug">{item.title}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5 mb-4">
                        <span className="font-body font-semibold text-navy dark:text-white text-sm">{formatPrice(item.price)}</span>
                        {item.originalPrice && (
                          <span className="font-body text-xs text-slate-brand line-through">{formatPrice(item.originalPrice)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-navy dark:bg-white text-white dark:text-navy text-xs font-body font-medium tracking-widest uppercase hover:bg-rose-brand dark:hover:bg-rose-brand dark:hover:text-white transition-colors"
                      >
                        <FiShoppingBag size={13} />
                        Move to Bag
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Share wishlist & total */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-slate-50 dark:bg-navy-light border border-slate-100 dark:border-slate-700">
              <div>
                <p className="font-body font-medium text-navy dark:text-white text-sm">
                  Total saved value: <span className="text-rose-brand font-semibold">{formatPrice(wishlistItems.reduce((s, i) => s + i.price, 0))}</span>
                </p>
                <p className="font-body text-xs text-slate-brand mt-1">
                  {wishlistItems.filter(i => i.originalPrice).length} items are currently on sale
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    wishlistItems.forEach(item => dispatch(addToCart({ product: item, size: item.sizes[0], color: item.colors[0] })))
                    wishlistItems.forEach(item => dispatch(removeFromWishlist(item.id)))
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  <FiShoppingBag size={13} />
                  Move All to Bag
                </button>
              </div>
            </div>
          </>
        )}

        {/* Suggestions */}
        <section className="mt-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-subtitle text-rose-brand mb-3">Picked for You</p>
              <h2 className="section-title text-navy dark:text-white">You Might Love</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-body text-slate-brand hover:text-rose-brand transition-colors group">
              View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {suggestions.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
