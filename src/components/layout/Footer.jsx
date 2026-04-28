import React from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-navy dark:bg-navy-dark text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="section-subtitle text-rose-brand mb-3">Stay in the loop</p>
            <h3 className="font-display text-3xl text-white">Join the NOIR Circle</h3>
            <p className="text-slate-400 text-sm mt-2 font-body">Early access to collections, exclusive offers, and style notes.</p>
          </div>
          <div className="flex gap-0">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 px-5 py-3.5 text-sm font-body text-white placeholder-slate-400 focus:outline-none focus:border-rose-brand transition-colors"
            />
            <button className="bg-rose-brand px-7 py-3.5 text-xs font-body font-medium tracking-widest uppercase text-white hover:bg-rose-dark transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-2xl font-bold tracking-widest mb-6">NOIR</p>
          <p className="text-slate-400 text-sm font-body leading-relaxed max-w-xs">
            Premium fashion for the discerning individual. Crafted with intention, designed to endure.
          </p>
          <div className="flex gap-4 mt-6">
            {[
              { Icon: FiInstagram, href: '#' },
              { Icon: FiFacebook, href: '#' },
              { Icon: FiTwitter, href: '#' },
              { Icon: FiYoutube, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-rose-brand hover:bg-rose-brand/10 transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-white mb-5">Shop</p>
          <ul className="space-y-3 text-sm font-body text-slate-400">
            {[
              ['All Products', '/shop'],
              ["Men's", '/men'],
              ["Women's", '/women'],
              ['New Arrivals', '/shop?tag=new'],
              ['Sale', '/shop?tag=sale'],
            ].map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-white mb-5">Information</p>
          <ul className="space-y-3 text-sm font-body text-slate-400">
            {[
              ['About Us', '/about'],
              ['Blog / Lookbook', '/blog'],
              ['Contact', '/contact'],
              ['Size Guide', '#'],
              ['Sustainability', '#'],
            ].map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-white mb-5">Customer Care</p>
          <ul className="space-y-3 text-sm font-body text-slate-400">
            {[
              ['Returns & Exchanges', '#'],
              ['Shipping Policy', '#'],
              ['Privacy Policy', '#'],
              ['Terms of Service', '#'],
              ['FAQ', '#'],
            ].map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs font-body">© 2024 NOIR. All rights reserved.</p>
          <div className="flex gap-6 text-xs font-body text-slate-500">
            <span>PKR · Pakistan</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
