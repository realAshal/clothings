import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiSend } from 'react-icons/fi'
import PageTransition from '../components/ui/PageTransition'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <PageTransition>
      {/* Header */}
      <div className="bg-navy dark:bg-navy-dark py-16 text-center px-6">
        <p className="section-subtitle text-rose-brand mb-3">We'd Love to Hear</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-semibold">Get in Touch</h1>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid lg:grid-cols-5 gap-14">
        {/* Info */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <p className="section-subtitle text-rose-brand mb-4">Contact Information</p>
            <div className="space-y-5">
              {[
                { Icon: FiMapPin, label: 'Visit Us', value: '42 MM Alam Road, Gulberg III, Lahore, Pakistan' },
                { Icon: FiPhone, label: 'Call Us', value: '+92 42 3578 0000' },
                { Icon: FiMail, label: 'Email Us', value: 'hello@noirpk.com' },
                { Icon: FiInstagram, label: 'Instagram', value: '@noirpk' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-rose-brand/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-rose-brand" size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-body text-slate-brand tracking-widest uppercase">{label}</p>
                    <p className="font-body text-sm text-navy dark:text-white mt-1">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="section-subtitle text-rose-brand mb-4">Store Hours</p>
            <div className="space-y-2 font-body text-sm text-slate-brand">
              <div className="flex justify-between"><span>Monday – Thursday</span><span>10:00 – 20:00</span></div>
              <div className="flex justify-between"><span>Friday – Saturday</span><span>11:00 – 21:00</span></div>
              <div className="flex justify-between"><span>Sunday</span><span>12:00 – 19:00</span></div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-navy-light p-6">
            <p className="font-body font-medium text-navy dark:text-white text-sm mb-2">Customer Support</p>
            <p className="font-body text-xs text-slate-brand leading-relaxed">
              We aim to respond to all enquiries within 24 hours. For urgent matters, please call us directly.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <p className="section-subtitle text-rose-brand mb-4">Send a Message</p>
          <h2 className="font-display text-2xl text-navy dark:text-white mb-8">We'll get back to you within 24 hours</h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-8 text-center"
            >
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-display text-xl text-navy dark:text-white mb-2">Message Sent!</h3>
              <p className="font-body text-sm text-slate-brand">Thank you for reaching out. We'll reply shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-body font-medium tracking-widest uppercase text-navy dark:text-white mb-2">Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full border border-slate-200 dark:border-slate-600 bg-transparent text-navy dark:text-white placeholder-slate-400 font-body text-sm px-4 py-3 focus:outline-none focus:border-navy dark:focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-medium tracking-widest uppercase text-navy dark:text-white mb-2">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full border border-slate-200 dark:border-slate-600 bg-transparent text-navy dark:text-white placeholder-slate-400 font-body text-sm px-4 py-3 focus:outline-none focus:border-navy dark:focus:border-white transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-medium tracking-widest uppercase text-navy dark:text-white mb-2">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-navy text-navy dark:text-white font-body text-sm px-4 py-3 focus:outline-none focus:border-navy dark:focus:border-white transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option>Order Enquiry</option>
                  <option>Returns & Exchanges</option>
                  <option>Product Information</option>
                  <option>General Enquiry</option>
                  <option>Press & Partnerships</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-body font-medium tracking-widest uppercase text-navy dark:text-white mb-2">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="How can we help you?"
                  className="w-full border border-slate-200 dark:border-slate-600 bg-transparent text-navy dark:text-white placeholder-slate-400 font-body text-sm px-4 py-3 focus:outline-none focus:border-navy dark:focus:border-white transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-3 btn-primary"
              >
                <FiSend size={14} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
