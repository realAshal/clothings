import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'

const team = [
  { name: 'Zara Malik', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Ahmad Raza', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Sana Hussain', role: 'Brand Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
  { name: 'Bilal Khan', role: 'Head of Production', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
]

const stats = [
  { number: '2018', label: 'Founded' },
  { number: '150+', label: 'Products' },
  { number: '50,000+', label: 'Customers' },
  { number: '12', label: 'Artisan Partners' },
]

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85"
          alt="About NOIR"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-subtitle text-rose-brand mb-4">Our Story</p>
            <h1 className="font-display text-5xl md:text-7xl text-white font-semibold">Crafted with<br />Purpose</h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl text-navy dark:text-white leading-relaxed font-medium"
        >
          "NOIR was born from the belief that fashion should be a dialogue between the wearer and the world — quiet, confident, and enduring."
        </motion.p>
        <p className="font-body text-slate-brand text-sm mt-6">— Zara Malik, Founder & Creative Director</p>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-0 items-stretch">
          <div className="overflow-hidden aspect-square">
            <img
              src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80"
              alt="Our Studio"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-slate-50 dark:bg-navy-light flex items-center px-10 md:px-16 py-14">
            <div>
              <p className="section-subtitle text-rose-brand mb-4">How We Started</p>
              <h2 className="font-display text-3xl md:text-4xl text-navy dark:text-white font-semibold mb-6">From Lahore to the World</h2>
              <p className="font-body text-slate-brand text-sm leading-relaxed mb-5">
                NOIR was founded in 2018 in a small atelier in Lahore's old city. What began as a tailoring house for discerning local clients quickly evolved into a full fashion brand with a clear philosophy: that Pakistani craftsmanship deserves a global stage.
              </p>
              <p className="font-body text-slate-brand text-sm leading-relaxed">
                Today, we partner with 12 artisan workshops across Pakistan, employing over 200 craftspeople. Each piece bears the mark of human hands — tiny imperfections that speak to its authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy dark:bg-navy-dark py-16">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-display text-4xl font-bold text-white">{stat.number}</p>
              <p className="font-body text-slate-400 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="section-subtitle text-rose-brand mb-3">What We Stand For</p>
          <h2 className="section-title text-navy dark:text-white">Our Values</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Sustainability',
              desc: 'We use natural fibres, low-impact dyes, and zero-waste cutting techniques wherever possible. Our packaging is 100% recyclable.',
              img: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&q=75',
            },
            {
              title: 'Craftsmanship',
              desc: 'Every stitch matters. We invest in master craftspeople and refuse to cut corners, even when it costs us more.',
              img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
            },
            {
              title: 'Inclusivity',
              desc: "Fashion shouldn't be exclusive. We offer extended sizing and design for diverse body types, celebrating individuality.",
              img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=75',
            },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden aspect-[4/3] mb-5">
                <img
                  src={v.img}
                  alt={v.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-xl text-navy dark:text-white font-semibold mb-3">{v.title}</h3>
              <p className="font-body text-slate-brand text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-slate-50 dark:bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle text-rose-brand mb-3">The People Behind the Brand</p>
            <h2 className="section-title text-navy dark:text-white">Our Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="overflow-hidden aspect-square mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-body font-semibold text-navy dark:text-white">{member.name}</h4>
                <p className="font-body text-xs text-slate-brand mt-1 tracking-wide">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="font-display text-3xl md:text-4xl text-navy dark:text-white font-semibold mb-5">Join the NOIR Community</h2>
        <p className="font-body text-slate-brand text-sm max-w-md mx-auto mb-8">
          Discover fashion that respects both you and the world. Browse our latest collection or get in touch.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/shop" className="btn-primary">Shop Now</Link>
          <Link to="/contact" className="btn-outline">Contact Us</Link>
        </div>
      </section>
    </PageTransition>
  )
}
