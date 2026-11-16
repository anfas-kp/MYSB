import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Accordion } from '../ui/Accordion';
import { SITE_CONTENT } from '../../content/content';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { OrganicBlob } from '../ui/OrganicBlob';
import { AmbientGlow } from '../ui/AmbientGlow';

export const FAQ: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const allItems = SITE_CONTENT.faq.items;
  const categories = ['All', ...SITE_CONTENT.faq.categories];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredItems = selectedCategory === 'All'
    ? allItems
    : allItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="faq" className="relative scroll-mt-28 sm:scroll-mt-36 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 bg-gradient-to-b from-[#FBF9FE] via-white to-[#F5F3FF] overflow-hidden">
      {/* ── CONTINUOUS STORYTELLING BACKDROP ─────────────────────────────────── */}
      <AmbientGlow
        variant="lavender"
        className="top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[550px]"
      />

      {/* Starting Organic Blob: moved lower into the section */}
      <OrganicBlob
        variant="primary"
        silhouette="asymmetric-cloud"
        className="top-6 -left-16 sm:top-10 sm:-left-20 w-[620px] h-[480px] pointer-events-none"
      />

      {/* Ending Organic Blob: moved higher into the section */}
      <OrganicBlob
        variant="secondary"
        silhouette="diagonal-flow"
        className="bottom-6 -right-16 sm:bottom-10 sm:-right-20 w-[580px] h-[460px] pointer-events-none"
      />

      <Container size="narrow" className="relative z-10">
        {/* Header */}
        <motion.div 
          className="flex flex-col items-center text-center mb-10 sm:mb-12"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] mb-3 text-xs font-mono font-bold text-[#6D28D9] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EC000]" />
            <span>{SITE_CONTENT.faq.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-[#0B0B0B] leading-[1.15]">
            {SITE_CONTENT.faq.headline}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
            {SITE_CONTENT.faq.subheadline}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] shadow-2xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'relative px-4 py-1.5 rounded-full text-xs font-semibold font-mono transition-colors duration-150 cursor-pointer focus:outline-hidden active:scale-[0.97]',
                    isSelected
                      ? 'text-white'
                      : 'text-slate-600 hover:text-[#6D28D9]'
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFaqCategory"
                      className="absolute inset-0 rounded-full bg-[#6D28D9] shadow-2xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Accessible Accordion with Filtered Items */}
        <motion.div
          key={selectedCategory}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Accordion items={filteredItems} allowMultiple={false} />
        </motion.div>
      </Container>
    </section>
  );
};
