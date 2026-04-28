import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiShoppingBag, FiHeart } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuickViewProduct, setQuickViewProduct } from '../../store/uiSlice'
import { addToCart } from '../../store/cartSlice'
import { toggleWishlist } from '../../store/wishlistSlice'
import { selectWishlistItems } from '../../store/wishlistSlice'

export default function QuickViewModal() {
  const dispatch = useDispatch()
  const product = useSelector(selectQuickViewProduct)
  const wishlistItems = useSelector(selectWishlistItems)
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)

  if (!product) return null

  const isWishlisted = wishlistItems.some(item => item.id === product.id)
  const formatPrice = (price) => `PKR ${price.toLocaleString()}`

  const handleAddToCart = () => {
    dispatch(addToCart({ product, size: selectedSize || product.sizes[0], color: product.colors[0] }))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setQuickViewProduct(null))}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[720px] bg-white dark:bg-navy z-[90] max-h-[85vh] overflow-auto"
          >
            <button
              onClick={() => dispatch(setQuickViewProduct(null))}
              className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-navy-light hover:bg-slate-100 dark:hover:bg-navy-dark text-navy dark:text-white transition-colors"
            >
              <FiX size={18} />
            </button>

            <div className="grid md:grid-cols-2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-72 md:h-full object-cover bg-slate-100"
              />
              <div className="p-6 md:p-8 flex flex-col gap-4">
                <div>
                  <p className="text-xs text-slate-brand font-body tracking-widest uppercase mb-1">{product.category}</p>
                  <h2 className="font-display text-xl font-semibold text-navy dark:text-white">{product.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-body font-bold text-lg text-navy dark:text-white">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="font-body text-sm text-slate-brand line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>

                <p className="text-sm font-body text-slate-brand dark:text-slate-400 leading-relaxed">{product.description}</p>

                {/* Sizes */}
                <div>
                  <p className="text-xs font-body font-medium tracking-widest uppercase text-navy dark:text-white mb-2">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-body border transition-all ${
                          selectedSize === size
                            ? 'border-navy dark:border-white bg-navy dark:bg-white text-white dark:text-navy'
                            : 'border-slate-200 dark:border-slate-600 text-navy dark:text-white hover:border-navy dark:hover:border-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-body font-medium tracking-widest uppercase transition-all ${
                      added
                        ? 'bg-green-600 text-white'
                        : 'bg-navy dark:bg-white text-white dark:text-navy hover:bg-rose-brand dark:hover:bg-rose-brand dark:hover:text-white'
                    }`}
                  >
                    <FiShoppingBag size={13} />
                    {added ? 'Added!' : 'Add to Bag'}
                  </button>
                  <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    className={`p-3 border transition-all ${
                      isWishlisted
                        ? 'border-rose-brand bg-rose-brand text-white'
                        : 'border-slate-200 dark:border-slate-600 text-navy dark:text-white hover:border-rose-brand hover:text-rose-brand'
                    }`}
                  >
                    <FiHeart size={16} className={isWishlisted ? 'fill-current' : ''} />
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={() => dispatch(setQuickViewProduct(null))}
                  className="text-center text-xs font-body text-slate-brand hover:text-navy dark:hover:text-white underline transition-colors"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
