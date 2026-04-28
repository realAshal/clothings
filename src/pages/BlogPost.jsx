import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiClock, FiUser, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi'
import PageTransition from '../components/ui/PageTransition'
import { blogPosts } from '../data/products'

const postContent = {
  1: [
    { type: 'lead', text: 'In a world overwhelmed by fast fashion and logo-heavy dressing, a quiet revolution is underway. The movement — often called "quiet luxury" or "old money aesthetic" — is a rejection of conspicuous consumption in favour of understated, high-quality dressing.' },
    { type: 'heading', text: 'What Is Quiet Luxury?' },
    { type: 'paragraph', text: 'Quiet luxury is not simply about wearing expensive things — it is about wearing things that speak of knowledge, care, and considered taste. A perfectly tailored cashmere coat. A silk blouse in a muted ivory. Slim leather shoes with barely-visible branding. The pieces communicate through quality, cut, and material rather than logos.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85', caption: 'The Camel Coat — a cornerstone of quiet luxury dressing' },
    { type: 'heading', text: 'Building a Quiet Luxury Wardrobe' },
    { type: 'paragraph', text: 'Start with a neutral palette: navy, camel, ivory, grey, black. Invest in one exceptional coat. Then build outward — quality shirts, well-cut trousers, leather accessories that will last decades. Every purchase should answer yes to: "Will I still wear this in ten years?"' },
    { type: 'quote', text: '"The best dressed person in the room is often the one you noticed last — because they were wearing something perfect, not something loud."' },
    { type: 'paragraph', text: 'The philosophy extends beyond clothes. It is an entire approach to consumption — buying less, choosing better, caring deeply for what you own. It is sustainability through discernment.' },
  ],
  2: [
    { type: 'lead', text: 'Our SS24 collection, Desert Modernism, takes its visual language from the vast, sculptural landscapes of the Thar Desert — all stark beauty, geometric shadows, and the interplay of human craft against an ancient earth.' },
    { type: 'heading', text: 'The Concept' },
    { type: 'paragraph', text: 'Creative Director Zara Malik spent three weeks in the desert regions of Sindh before sketching a single silhouette. "I wanted the collection to feel like the landscape — timeless, structured, with a silence that commands attention," she says. "The desert is minimalist by nature. It does not need decoration. Only the essential remains."' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85', caption: 'SS24 Collection — The Ivory Silk Midi Dress' },
    { type: 'heading', text: 'Key Pieces' },
    { type: 'paragraph', text: 'The collection centres on a palette of sand, ivory, terracotta, and deep indigo — the colours of the desert at different hours. Silhouettes are structured and architectural, with precise tailoring offset by fluid drape. Look out for the pleated linen trousers, the sculptural blazer in undyed raw wool, and the silk wrap dress that captures the movement of desert wind.' },
  ],
  3: [
    { type: 'lead', text: "NOIR's commitment to sustainable fashion isn't a marketing strategy. It's the foundation of everything we make — embedded in our material sourcing, production partnerships, and how we think about the lifecycle of every garment." },
    { type: 'heading', text: 'Where It Starts: Materials' },
    { type: 'paragraph', text: 'We source our natural fibres — linen, wool, cotton, silk — exclusively from certified mills. Our linen comes from European flax farms with full traceability. Our wools are sourced from certified non-mulesing stations. We are progressively moving towards GOTS-certified organic cotton across our entire range.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=900&q=85', caption: 'Our production facility in Lahore' },
    { type: 'heading', text: 'Our Artisan Partners' },
    { type: 'paragraph', text: "We work with 12 artisan workshops across Pakistan. We pay above market rate, provide health coverage, and offer skills training. We believe that a garment cannot be ethical if the hands that made it were not treated with dignity. This isn't charity — it's the correct baseline." },
    { type: 'quote', text: '"We can\'t claim to respect the environment while disrespecting the people who make our clothes. Ethics must be whole."' },
  ],
}

export default function BlogPost() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))
  const content = postContent[parseInt(id)] || postContent[1]
  const related = blogPosts.filter(p => p.id !== parseInt(id)).slice(0, 3)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-navy dark:text-white">Post not found</p>
          <Link to="/blog" className="mt-4 inline-block btn-primary">Back to Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[55vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-navy/10" />
        <div className="absolute inset-0 flex items-end pb-12 px-6">
          <div className="max-w-3xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[10px] font-body font-medium tracking-widest uppercase text-white bg-rose-brand px-3 py-1 mb-4">
                {post.category}
              </span>
              <h1 className="font-display text-3xl md:text-5xl text-white font-semibold leading-tight">{post.title}</h1>
              <div className="flex items-center gap-5 mt-5 text-sm font-body text-slate-300">
                <span className="flex items-center gap-2"><FiUser size={13} /> {post.author}</span>
                <span className="flex items-center gap-2"><FiClock size={13} /> {post.readTime}</span>
                <span>{post.date}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-body text-slate-brand hover:text-rose-brand transition-colors">
          <FiArrowLeft size={13} /> Back to Journal
        </Link>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-10 space-y-7">
        {content.map((block, i) => {
          if (block.type === 'lead') return (
            <p key={i} className="font-body text-lg text-navy dark:text-slate-200 leading-relaxed font-light border-l-4 border-rose-brand pl-5">
              {block.text}
            </p>
          )
          if (block.type === 'heading') return (
            <h2 key={i} className="font-display text-2xl md:text-3xl text-navy dark:text-white font-semibold mt-10">{block.text}</h2>
          )
          if (block.type === 'paragraph') return (
            <p key={i} className="font-body text-slate-brand dark:text-slate-400 leading-relaxed">{block.text}</p>
          )
          if (block.type === 'image') return (
            <figure key={i} className="my-8">
              <img src={block.src} alt={block.caption} className="w-full object-cover aspect-video" />
              {block.caption && (
                <figcaption className="text-xs font-body text-slate-brand text-center mt-3">{block.caption}</figcaption>
              )}
            </figure>
          )
          if (block.type === 'quote') return (
            <blockquote key={i} className="bg-slate-50 dark:bg-navy-light border-l-4 border-rose-brand px-8 py-6 my-8">
              <p className="font-display text-xl text-navy dark:text-white italic leading-relaxed">{block.text}</p>
            </blockquote>
          )
          return null
        })}

        {/* Share */}
        <div className="border-t border-slate-100 dark:border-slate-700 pt-8 mt-10 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-navy dark:text-white">Share this story</p>
          <div className="flex gap-3">
            {[
              { Icon: FiInstagram, label: 'Instagram' },
              { Icon: FiFacebook, label: 'Facebook' },
              { Icon: FiTwitter, label: 'Twitter' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                className="w-9 h-9 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-brand hover:text-white hover:bg-rose-brand hover:border-rose-brand transition-all"
                aria-label={label}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Author bio */}
        <div className="bg-slate-50 dark:bg-navy-light p-6 flex gap-5 items-start mt-10">
          <div className="w-14 h-14 bg-slate-200 dark:bg-slate-600 rounded-full flex-shrink-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              alt={post.author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-body font-semibold text-navy dark:text-white">{post.author}</p>
            <p className="font-body text-xs text-rose-brand tracking-widest uppercase mt-0.5">Contributing Editor</p>
            <p className="font-body text-sm text-slate-brand mt-2 leading-relaxed">
              Fashion journalist and stylist based in Lahore. Writes about contemporary South Asian fashion, sustainability, and the intersection of culture and style.
            </p>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-slate-100 dark:border-slate-700">
        <div className="text-center mb-10">
          <p className="section-subtitle text-rose-brand mb-3">Continue Reading</p>
          <h2 className="section-title text-navy dark:text-white">More from the Journal</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {related.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block">
                <div className="overflow-hidden aspect-[16/10] mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="text-[10px] font-body font-medium tracking-widest uppercase text-rose-brand">{post.category}</span>
                <h3 className="font-display text-lg font-semibold text-navy dark:text-white mt-2 group-hover:text-rose-brand transition-colors">{post.title}</h3>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
