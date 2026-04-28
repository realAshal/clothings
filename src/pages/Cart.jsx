import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/cartSlice'
import PageTransition from '../components/ui/PageTransition'
import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const formatPrice = (p) => `PKR ${p.toLocaleString()}`

  const shipping = total >= 5000 ? 0 : 350
  const grandTotal = total + shipping
  const suggested = products.filter(p => !items.find(i => i.id === p.id)).slice(0, 4)

  return (
    <PageTransition>
      <div className="bg-navy dark:bg-navy-dark py-12 text-center px-6">
        <p className="section-subtitle text-rose-brand mb-3">Your Selection</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-semibold">Shopping Bag</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 flex flex-col items-center gap-6"
          >
            <FiShoppingBag size={64} className="text-slate-200 dark:text-slate-700" />
            <h2 className="font-display text-2xl text-navy dark:text-white">Your bag is empty</h2>
            <p className="font-body text-sm text-slate-brand max-w-xs">
              Looks like you haven't added anything yet. Explore our collections to find something you love.
            </p>
            <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-sm text-slate-brand">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-xs font-body text-slate-brand hover:text-rose-brand transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-5 border-b border-slate-100 dark:border-slate-700 pb-6"
                    >
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-28 md:w-28 md:h-36 object-cover bg-slate-100 dark:bg-navy-light"
                        />
                      </Link>
                      <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[10px] font-body text-slate-brand tracking-widest uppercase mb-1">{item.category}</p>
                              <Link to={`/product/${item.id}`}>
                                <h3 className="font-body font-medium text-navy dark:text-white text-sm md:text-base hover:text-rose-brand transition-colors">{item.title}</h3>
                              </Link>
                            </div>
                            <button
                              onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                              className="text-slate-300 hover:text-rose-brand transition-colors flex-shrink-0"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                          <div className="flex gap-4 mt-2">
                            <p className="text-xs font-body text-slate-brand">Size: <span className="text-navy dark:text-white font-medium">{item.size}</span></p>
                            {item.color && (
                              <span
                                className="inline-block w-4 h-4 rounded-full border border-slate-200 mt-0.5"
                                style={{ backgroundColor: item.color }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-slate-200 dark:border-slate-600">
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, color: item.color, quantity: item.quantity - 1 }))}
                              className="p-2 text-navy dark:text-white hover:bg-slate-100 dark:hover:bg-navy-light transition-colors"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="px-4 text-sm font-body font-medium text-navy dark:text-white min-w-[2.5rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, color: item.color, quantity: item.quantity + 1 }))}
                              className="p-2 text-navy dark:text-white hover:bg-slate-100 dark:hover:bg-navy-light transition-colors"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                          <p className="font-body font-semibold text-navy dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 dark:bg-navy-light p-7 sticky top-24">
                <h3 className="font-display text-xl text-navy dark:text-white font-semibold mb-6">Order Summary</h3>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm font-body text-slate-brand">
                    <span>Subtotal</span>
                    <span className="text-navy dark:text-white">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body text-slate-brand">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-navy dark:text-white'}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px] font-body text-slate-brand bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-3 py-2">
                      Add {formatPrice(5000 - total)} more for free shipping
                    </p>
                  )}
                </div>

                <hr className="border-slate-200 dark:border-slate-600 mb-5" />

                <div className="flex justify-between font-body font-bold text-navy dark:text-white mb-6">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>

                {/* Promo code */}
                <div className="flex gap-0 mb-6">
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-600 px-3 flex-1">
                    <FiTag size={13} className="text-slate-brand flex-shrink-0" />
                    <input
                      placeholder="Promo code"
                      className="w-full text-sm font-body bg-transparent text-navy dark:text-white py-2.5 focus:outline-none placeholder-slate-400"
                    />
                  </div>
                  <button className="bg-navy dark:bg-white text-white dark:text-navy px-4 text-xs font-body font-medium tracking-wide uppercase hover:bg-rose-brand dark:hover:bg-rose-brand dark:hover:text-white transition-colors">
                    Apply
                  </button>
                </div>

                <button className="w-full flex items-center justify-center gap-3 bg-rose-brand text-white py-4 text-xs font-body font-semibold tracking-widest uppercase hover:bg-rose-dark transition-colors">
                  Proceed to Checkout
                  <FiArrowRight size={14} />
                </button>

                <Link
                  to="/shop"
                  className="block text-center mt-4 text-xs font-body text-slate-brand hover:text-navy dark:hover:text-white transition-colors"
                >
                  ← Continue Shopping
                </Link>

                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-600 space-y-2">
                  {['🔒 Secure SSL Checkout', '↩️ 14-day easy returns', '📦 Tracked delivery'].map(t => (
                    <p key={t} className="text-[11px] font-body text-slate-brand">{t}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like */}
        {suggested.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-10">
              <p className="section-subtitle text-rose-brand mb-3">Complete the Look</p>
              <h2 className="section-title text-navy dark:text-white">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {suggested.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
