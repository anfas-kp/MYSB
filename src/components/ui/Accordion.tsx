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
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div 
            key={item.id} 
            className={cn(
              "rounded-2xl transition-all duration-200 backdrop-blur-md",
              isOpen 
                ? "bg-white border-2 border-[#6D28D9]/40 shadow-sm ring-2 ring-[#6D28D9]/10" 
                : "bg-white/80 hover:bg-white border border-[#EDE9FE] shadow-2xs hover:shadow-xs"
            )}
          >
            <button
              type="button"
              id={`faq-header-${item.id}`}
              aria-controls={`faq-panel-${item.id}`}
              aria-expanded={isOpen}
              onClick={() => toggleItem(item.id, item.question)}
              className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left group cursor-pointer select-none focus-visible:outline-none"
            >
              <div className="flex flex-col gap-1.5 pr-2">
                {item.category && (
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#6D28D9] font-bold">
                    {item.category}
                  </span>
                )}
                <span className="text-base sm:text-lg md:text-xl font-display font-bold tracking-tight text-[#0B0B0B] group-hover:text-[#6D28D9] transition-colors">
                  {item.question}
                </span>
              </div>
              <span
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ease-out mt-0.5',
                  isOpen 
                    ? 'bg-[#6D28D9] text-white border-[#6D28D9] rotate-45 shadow-2xs' 
                    : 'bg-white text-slate-500 border-slate-200 group-hover:border-[#6D28D9] group-hover:text-[#6D28D9] rotate-0 shadow-2xs'
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
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base leading-relaxed text-slate-600">
                    {item.isSLPApprovedWording && (
                      <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-mono text-[#6D28D9] font-bold uppercase tracking-wider">
                        <CheckCircle className="w-3.5 h-3.5 text-[#6EC000]" />
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

