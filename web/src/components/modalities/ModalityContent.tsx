'use client';

import { motion } from 'framer-motion';
import { ModalityData } from '@/data/modalities-content';

interface Props {
  data: ModalityData;
}

export default function ModalityContent({ data }: Props) {
  if (!data.contentSections || data.contentSections.length === 0) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-lg italic">
            Detailed insights for {data.name} are coming soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        
        {/* Alternating Sections */}
        <div className="space-y-32">
          {data.contentSections.map((section, idx) => {
            const isLeft = section.imagePosition === 'left';
            
            return (
              <div 
                key={idx} 
                className={`flex flex-col gap-12 lg:gap-20 items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-primary/20 group">
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-3xl" />
                  </div>
                </motion.div>

                {/* Text Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
                >
                  <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
                    {section.title}
                  </h2>
                  <div className={`w-16 h-1 bg-primary/40 rounded-full mx-auto lg:mx-0`} />
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {section.text}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Remedies & Tips Section */}
        {data.remedies && data.remedies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 max-w-4xl mx-auto bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-sm relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-serif text-foreground mb-8 text-center">
                Healing Remedies & Practices
              </h3>
              
              <ul className="space-y-6">
                {data.remedies.map((remedy, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      {idx + 1}
                    </div>
                    <p className="text-foreground/90 font-medium leading-relaxed">
                      {remedy}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
