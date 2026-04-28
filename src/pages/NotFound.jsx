import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <p className="font-mono text-[10rem] font-bold text-slate-100 dark:text-slate-800 leading-none select-none">
            404
          </p>
          <div className="-mt-8">
            <p className="section-subtitle text-rose-brand mb-4">Page Not Found</p>
            <h1 className="font-display text-3xl md:text-4xl text-navy dark:text-white font-semibold">
              This page doesn't exist
            </h1>
            <p className="font-body text-sm text-slate-brand mt-4 leading-relaxed">
              The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.
            </p>
            <div className="flex gap-4 justify-center mt-10 flex-wrap">
              <Link to="/" className="btn-primary">Back to Home</Link>
              <Link to="/shop" className="btn-outline">Browse Shop</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
