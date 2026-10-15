import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { Accordion } from '../ui/Accordion';
import { SITE_CONTENT } from '../../content/content';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const FAQ: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const allItems = SITE_CONTENT.faq.items;
  const categories = ['All', ...SITE_CONTENT.faq.categories];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredItems = selectedCategory === 'All'
    ? allItems
    : allItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="faq" className="relative py-20 sm:py-24 lg:py-28 bg-[#F7F5EE] border-b border-ink-900/[0.08] overflow-hidden">
      <Container size="narrow" className="relative z-10">
        {/* Header */}
        <motion.div 
          className="flex flex-col items-center text-center mb-10 sm:mb-12"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow variant="teal" className="mb-4">
            {SITE_CONTENT.faq.eyebrow}
          </Eyebrow>
          <Heading as="h2" size="section" animate>
            {SITE_CONTENT.faq.headline}
          </Heading>
          <p className="mt-4 text-base sm:text-lg text-ink-600 dark:text-cream-300 leading-relaxed max-w-xl">
            {SITE_CONTENT.faq.subheadline}
          </p>

          {/* Category Filter Tabs with layoutId spring indicator */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-white border border-ink-900/[0.1] shadow-2xs">
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
                      ? 'text-cream-50 dark:text-teal-950'
                      : 'text-ink-600 dark:text-cream-300 hover:text-teal-900 dark:hover:text-mint-200'
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFaqCategory"
                      className="absolute inset-0 rounded-full bg-teal-900 dark:bg-mint-400 shadow-2xs"
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
