import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiEye, FiShoppingBag } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import { toggleWishlist } from '../../store/wishlistSlice'
import { setQuickViewProduct } from '../../store/uiSlice'
import { selectWishlistItems } from '../../store/wishlistSlice'

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)
  const isWishlisted = wishlistItems.some(item => item.id === product.id)

  const formatPrice = (price) => `PKR ${price.toLocaleString()}`
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart({ product, size: product.sizes[0], color: product.colors[0] }))
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    dispatch(toggleWishlist(product))
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    dispatch(setQuickViewProduct(product))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden bg-slate-100 dark:bg-navy-light aspect-[3/4]">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          <img
            src={hovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.tags.includes('new') && (
              <span className="bg-navy text-white text-[10px] tracking-widest uppercase px-2.5 py-1 font-body">New</span>
            )}
            {discount && (
              <span className="bg-rose-brand text-white text-[10px] tracking-widest uppercase px-2.5 py-1 font-body">-{discount}%</span>
            )}
            {product.tags.includes('bestseller') && (
              <span className="bg-white text-navy text-[10px] tracking-widest uppercase px-2.5 py-1 font-body">Best Seller</span>
            )}
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-navy p-3 flex gap-2"
          >
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-navy dark:bg-white text-white dark:text-navy text-xs font-body font-medium tracking-widest uppercase py-2.5 hover:bg-rose-brand dark:hover:bg-rose-brand dark:hover:text-white transition-colors"
            >
              <FiShoppingBag size={13} />
              Add to Bag
            </button>
            <button
              onClick={handleQuickView}
              className="p-2.5 border border-slate-200 dark:border-slate-600 text-navy dark:text-white hover:border-rose-brand hover:text-rose-brand transition-colors"
              title="Quick View"
            >
              <FiEye size={14} />
            </button>
          </motion.div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200 ${
              isWishlisted
                ? 'bg-rose-brand text-white'
                : 'bg-white/80 dark:bg-navy/80 text-navy dark:text-white hover:bg-rose-brand hover:text-white'
            }`}
          >
            <FiHeart size={13} className={isWishlisted ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <p className="text-[10px] font-body text-slate-brand dark:text-slate-500 tracking-widest uppercase mb-1">{product.category}</p>
          <h3 className="font-body text-sm font-medium text-navy dark:text-white leading-snug group-hover:text-rose-brand transition-colors">{product.title}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-body font-semibold text-navy dark:text-white text-sm">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="font-body text-slate-brand text-xs line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-[10px] ${i < Math.round(product.rating) ? 'text-amber-400' : 'text-slate-300'}`}>★</span>
              ))}
            </div>
            <span className="text-[10px] text-slate-brand font-body">({product.reviews})</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
