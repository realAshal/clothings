import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartItems, selectCartTotal, selectCartOpen,
  setCartOpen, removeFromCart, updateQuantity
} from '../../store/cartSlice'

export default function CartDrawer() {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectCartOpen)
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  const formatPrice = (price) => `PKR ${price.toLocaleString()}`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setCartOpen(false))}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-navy shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <FiShoppingBag className="text-navy dark:text-white" />
                <h2 className="font-body font-semibold text-navy dark:text-white tracking-wide">
                  Your Bag ({items.length})
                </h2>
              </div>
              <button
                onClick={() => dispatch(setCartOpen(false))}
                className="p-2 hover:bg-slate-100 dark:hover:bg-navy-light text-navy dark:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-20">
                  <FiShoppingBag size={48} className="text-slate-300" />
                  <p className="font-body text-slate-brand">Your bag is empty</p>
                  <button
                    onClick={() => dispatch(setCartOpen(false))}
                    className="btn-primary"
                  >
                    <Link to="/shop">Start Shopping</Link>
                  </button>
                </div>
              ) : (
                items.map((item, i) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4"
                  >
                    <Link to={`/product/${item.id}`} onClick={() => dispatch(setCartOpen(false))}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-24 object-cover bg-slate-100 dark:bg-navy-light flex-shrink-0"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-body font-medium text-sm text-navy dark:text-white leading-snug truncate">{item.title}</h4>
                      <p className="text-xs text-slate-brand mt-0.5">Size: {item.size}</p>
                      <p className="font-body font-semibold text-sm text-navy dark:text-white mt-1">{formatPrice(item.price * item.quantity)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-slate-200 dark:border-slate-600">
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, color: item.color, quantity: item.quantity - 1 }))}
                            className="p-1.5 text-navy dark:text-white hover:bg-slate-100 dark:hover:bg-navy-light transition-colors"
                          >
                            <FiMinus size={11} />
                          </button>
                          <span className="px-3 text-xs font-body text-navy dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, color: item.color, quantity: item.quantity + 1 }))}
                            className="p-1.5 text-navy dark:text-white hover:bg-slate-100 dark:hover:bg-navy-light transition-colors"
                          >
                            <FiPlus size={11} />
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                          className="text-slate-400 hover:text-rose-brand transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-slate-brand">Subtotal</span>
                  <span className="font-body font-semibold text-navy dark:text-white">{formatPrice(total)}</span>
                </div>
                <p className="text-xs font-body text-slate-brand">Shipping calculated at checkout</p>
                <Link
                  to="/cart"
                  onClick={() => dispatch(setCartOpen(false))}
                  className="block text-center btn-primary w-full"
                >
                  View Cart & Checkout
                </Link>
                <button
                  onClick={() => dispatch(setCartOpen(false))}
                  className="w-full text-center text-xs font-body text-slate-brand hover:text-navy dark:hover:text-white transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
