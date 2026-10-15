import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
  category?: string;
  isSLPApprovedWording?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  className,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggleItem = (id: string, question: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        return prev.filter((item) => item !== id);
      } else {
        trackEvent('faq_expand', { question_id: id, question_title: question });
        return allowMultiple ? [...prev, id] : [id];
      }
    });
  };

  return (
    <div className={cn('border-y border-ink-900/[0.12] divide-y divide-ink-900/[0.1]', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div 
            key={item.id} 
            className="transition-colors duration-150 py-1"
          >
            <button
              type="button"
              id={`faq-header-${item.id}`}
              aria-controls={`faq-panel-${item.id}`}
              aria-expanded={isOpen}
              onClick={() => toggleItem(item.id, item.question)}
              className="flex w-full items-start justify-between gap-4 py-5 sm:py-6 text-left group cursor-pointer select-none focus-visible:outline-none active:scale-[0.99] transition-transform duration-100 ease-out"
            >
              <div className="flex flex-col gap-1.5 pr-2">
                {item.category && (
                  <span className="text-[11px] font-mono uppercase tracking-wider text-teal-850 dark:text-mint-300 font-bold">
                    {item.category}
                  </span>
                )}
                <span className="text-base sm:text-lg md:text-xl font-display font-bold tracking-tight text-ink-900 dark:text-cream-50 group-hover:text-teal-900 dark:group-hover:text-mint-300 transition-colors">
                  {item.question}
                </span>
              </div>
              <span
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full border border-ink-900/15 dark:border-cream-100/20 flex items-center justify-center text-ink-700 dark:text-cream-200 transition-all duration-200 ease-out mt-0.5',
                  isOpen 
                    ? 'bg-teal-900 text-white border-teal-900 dark:bg-mint-400 dark:text-teal-950 dark:border-mint-400 rotate-45' 
                    : 'bg-white text-ink-700 group-hover:border-teal-700 group-hover:text-teal-900 rotate-0 shadow-2xs'
                )}
              >
                <Plus className="w-4 h-4 transition-transform duration-200 ease-out" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-header-${item.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 sm:pb-7 text-sm sm:text-base leading-relaxed text-ink-700 dark:text-cream-200">
                    {item.isSLPApprovedWording && (
                      <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-mono text-teal-850 dark:text-mint-300 font-bold uppercase tracking-wider">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-700 dark:text-mint-400" />
                        <span>Clinical Clarification</span>
                      </div>
                    )}
                    <p className="max-w-3xl font-normal leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

