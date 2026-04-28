import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiShoppingBag, FiHeart, FiSearch, FiMoon, FiSun,
  FiMenu, FiX, FiChevronDown
} from 'react-icons/fi'

import { selectCartCount, toggleCart } from '../../store/cartSlice'
import { selectWishlistItems } from '../../store/wishlistSlice'
import { toggleDarkMode, toggleSearch, selectDarkMode } from '../../store/uiSlice'

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'Shop', path: '/shop',
    dropdown: [
      { label: 'All Products', path: '/shop' },
      { label: "Men's Collection", path: '/men' },
      { label: "Women's Collection", path: '/women' },
      { label: 'New Arrivals', path: '/shop?tag=new' },
      { label: 'Sale', path: '/shop?tag=sale' },
    ]
  },
  { label: 'Men', path: '/men' },
  { label: 'Women', path: '/women' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const cartCount = useSelector(selectCartCount)
  const wishlistItems = useSelector(selectWishlistItems)
  const darkMode = useSelector(selectDarkMode)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const isHome = location.pathname === '/'

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy dark:bg-navy-dark text-white text-xs font-body tracking-widest text-center py-2.5 px-4">
        FREE SHIPPING ON ORDERS ABOVE PKR 5,000 · USE CODE: <span className="text-rose-brand font-semibold">NOIR10</span>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 dark:bg-navy/95 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-navy'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl font-bold tracking-[0.15em] text-navy dark:text-white">
            NOIR
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`nav-link flex items-center gap-1 text-navy dark:text-slate-200 pb-1 ${
                    location.pathname === link.path ? 'text-rose-brand dark:text-rose-brand after:w-full' : ''
                  }`}
                >
                  {link.label}
                  {link.dropdown && <FiChevronDown size={12} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-navy-light shadow-2xl border border-slate-100 dark:border-slate-700"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-5 py-3 text-sm font-body text-navy dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-dark hover:text-rose-brand transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleSearch())}
              className="p-2 text-navy dark:text-white hover:text-rose-brand dark:hover:text-rose-brand transition-colors"
              aria-label="Search"
            >
              <FiSearch size={18} />
            </button>

            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 text-navy dark:text-white hover:text-rose-brand dark:hover:text-rose-brand transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            <Link
              to="/wishlist"
              className="p-2 text-navy dark:text-white hover:text-rose-brand dark:hover:text-rose-brand transition-colors relative"
            >
              <FiHeart size={18} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => dispatch(toggleCart())}
              className="p-2 text-navy dark:text-white hover:text-rose-brand dark:hover:text-rose-brand transition-colors relative"
            >
              <FiShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy dark:text-white"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-navy border-t border-slate-100 dark:border-slate-800"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className="block py-3 text-sm font-medium text-navy dark:text-white border-b border-slate-100 dark:border-slate-800"
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <div className="pl-4 py-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block py-2 text-sm text-slate-brand hover:text-rose-brand transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-2 flex gap-4">
                  <Link to="/cart" className="flex items-center gap-2 text-sm text-navy dark:text-white">
                    <FiShoppingBag /> Cart ({cartCount})
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-2 text-sm text-navy dark:text-white">
                    <FiHeart /> Wishlist ({wishlistItems.length})
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
