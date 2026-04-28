import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiHeart, FiShare2, FiChevronDown, FiArrowLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, toggleCart } from '../store/cartSlice'
import { toggleWishlist } from '../store/wishlistSlice'
import { selectWishlistItems } from '../store/wishlistSlice'
import ProductCard from '../components/ui/ProductCard'
import PageTransition from '../components/ui/PageTransition'
import { products } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = products.find(p => p.id === parseInt(id))
  const wishlistItems = useSelector(selectWishlistItems)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0])
      setSelectedColor(product.colors[0])
    }
    window.scrollTo(0, 0)
  }, [id, product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-navy dark:text-white">Product not found</p>
          <Link to="/shop" className="mt-4 inline-block btn-primary">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const images = [product.image, product.hoverImage || product.image, product.image]
  const isWishlisted = wishlistItems.some(item => item.id === product.id)
  const formatPrice = (price) => `PKR ${price.toLocaleString()}`
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const related = products
    .filter(p => (p.gender === product.gender || p.category === product.category) && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    dispatch(addToCart({ product, size: selectedSize, color: selectedColor }))
    dispatch(toggleCart())
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-body text-slate-brand mb-8">
          <Link to="/" className="hover:text-rose-brand transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-rose-brand transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-navy dark:text-white">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-navy dark:border-white' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative overflow-hidden bg-slate-100 dark:bg-navy-light aspect-[3/4]">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {discount && (
                <div className="absolute top-4 left-4 bg-rose-brand text-white text-xs font-body font-medium px-3 py-1 tracking-widest">
                  -{discount}%
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-body text-slate-brand tracking-widest uppercase mb-2">{product.category} · {product.gender}</p>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy dark:text-white leading-tight">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-base ${i < Math.round(product.rating) ? 'text-amber-400' : 'text-slate-300'}`}>★</span>
                  ))}
                </div>
                <span className="text-xs font-body text-slate-brand">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-body font-bold text-2xl text-navy dark:text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="font-body text-lg text-slate-brand line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="bg-rose-100 text-rose-brand text-xs font-body px-2 py-0.5">Save {discount}%</span>
                </>
              )}
            </div>

            <hr className="border-slate-100 dark:border-slate-700" />

            {/* Colors */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-body font-semibold tracking-widest uppercase text-navy dark:text-white">Colour</p>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-navy dark:border-white scale-110' : 'border-transparent'
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-body font-semibold tracking-widest uppercase text-navy dark:text-white">Size</p>
                <button className="text-xs font-body text-slate-brand hover:text-rose-brand transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-3 py-2.5 text-xs font-body font-medium border transition-all ${
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

            {/* Add to Cart */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 text-sm font-body font-medium tracking-widest uppercase transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-navy dark:bg-white text-white dark:text-navy hover:bg-rose-brand dark:hover:bg-rose-brand dark:hover:text-white'
                }`}
              >
                <FiShoppingBag size={16} />
                {added ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className={`p-4 border transition-all ${
                  isWishlisted
                    ? 'border-rose-brand bg-rose-brand text-white'
                    : 'border-slate-200 dark:border-slate-600 text-navy dark:text-white hover:border-rose-brand hover:text-rose-brand'
                }`}
              >
                <FiHeart size={18} className={isWishlisted ? 'fill-current' : ''} />
              </button>
              <button className="p-4 border border-slate-200 dark:border-slate-600 text-navy dark:text-white hover:border-rose-brand hover:text-rose-brand transition-all">
                <FiShare2 size={18} />
              </button>
            </div>

            {/* Delivery info */}
            <div className="bg-slate-50 dark:bg-navy-light p-4 space-y-2">
              {[
                '🚚 Free delivery on orders above PKR 5,000',
                '↩️ Easy 14-day returns',
                '🔒 Secure payment',
              ].map(text => (
                <p key={text} className="text-xs font-body text-slate-brand">{text}</p>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
              {[
                { id: 'description', label: 'Description' },
                { id: 'details', label: 'Product Details' },
                { id: 'care', label: 'Care Instructions' },
              ].map(tab => (
                <div key={tab.id} className="border-b border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                    className="w-full flex items-center justify-between py-4 text-sm font-body font-medium text-navy dark:text-white text-left"
                  >
                    {tab.label}
                    <FiChevronDown className={`transition-transform ${activeTab === tab.id ? 'rotate-180' : ''}`} />
                  </button>
                  {activeTab === tab.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="overflow-hidden pb-4"
                    >
                      <p className="text-sm font-body text-slate-brand leading-relaxed">
                        {tab.id === 'description' && product.description}
                        {tab.id === 'details' && `Fabric: Premium quality blend\nFit: Regular\nOrigin: Crafted in Pakistan\nSKU: NOIR-${product.id.toString().padStart(4, '0')}`}
                        {tab.id === 'care' && 'Dry clean recommended. If machine washing, use cold water on a delicate cycle. Do not tumble dry. Iron on low heat. Store folded to maintain shape.'}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-10">
              <p className="section-subtitle text-rose-brand mb-3">You May Also Like</p>
              <h2 className="section-title text-navy dark:text-white">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
