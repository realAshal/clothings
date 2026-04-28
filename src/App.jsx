import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectDarkMode } from './store/uiSlice'

import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import MenCollection from './pages/MenCollection'
import WomenCollection from './pages/WomenCollection'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

import CartDrawer from './components/ui/CartDrawer'
import QuickViewModal from './components/ui/QuickViewModal'
import SearchOverlay from './components/ui/SearchOverlay'

export default function App() {
  const location = useLocation()
  const darkMode = useSelector(selectDarkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/men" element={<MenCollection />} />
            <Route path="/women" element={<WomenCollection />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
    </>
  )
}
