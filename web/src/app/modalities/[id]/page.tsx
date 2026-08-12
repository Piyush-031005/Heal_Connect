'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const MODALITY_CONTENT: Record<string, any> = {
  'astrology': {
    title: 'Vedic Astrology',
    subtitle: 'Decode your cosmic blueprint.',
    intro: 'Vedic Astrology, or Jyotish, is the ancient Indian science of light. It maps the precise positions of planets at your time of birth to provide deep, actionable insights into your personality, relationships, and life path.',
    heroImg: 'https://images.unsplash.com/photo-1515266591878-f93e32bc5937?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        title: 'Understand Your True Path',
        content: 'By analyzing your birth chart, our expert astrologers can identify your core strengths, potential challenges, and karmic lessons. This isn\'t just about predicting the future; it\'s about empowering you to make choices aligned with your highest good.',
        img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Remedies & Alignments',
        content: 'Vedic Astrology provides highly specific, practical remedies to mitigate negative planetary influences. From wearing specific gemstones to performing simple daily rituals, these adjustments help smooth your path and attract positive energy.',
        img: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=800&auto=format&fit=crop'
      }
    ],
    benefits: ['Accurate Life Predictions', 'Relationship Compatibility', 'Career Guidance', 'Auspicious Timing (Muhurta)']
  },
  'vastu': {
    title: 'Vastu Shastra',
    subtitle: 'Harmonize your physical space.',
    intro: 'Vastu Shastra is the traditional Indian system of architecture and spatial energy. It integrates architecture with nature, utilizing geometric patterns, symmetry, and directional alignments to invite health, wealth, and peace into your home or office.',
    heroImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        title: 'The Flow of Energy',
        content: 'Every physical space holds energy. When a home is aligned with Vastu principles, Prana (vital life force) flows freely, nourishing the inhabitants. We analyze your floor plans and directional alignments to detect energy blockages.',
        img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd05?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Simple, Powerful Remedies',
        content: 'You don\'t always need to tear down walls to fix Vastu defects. Our experts provide non-destructive remedies—like strategically placing mirrors, specific plants, colors, or crystals—to correct energy imbalances and foster prosperity.',
        img: 'https://images.unsplash.com/photo-1545241047-6083a36a1c08?q=80&w=800&auto=format&fit=crop'
      }
    ],
    benefits: ['Increased Financial Prosperity', 'Better Health & Sleep', 'Harmonious Relationships', 'Mental Peace & Clarity']
  },
  'meditation': {
    title: 'Meditation & Mindfulness',
    subtitle: 'Return to your center.',
    intro: 'In a world of constant noise, meditation is the ultimate sanctuary. Our guided meditation sessions are tailored to your specific emotional and spiritual needs, helping you release stress, gain clarity, and connect with your inner calm.',
    heroImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        title: 'Calm the Overactive Mind',
        content: 'Learn specialized breathing techniques (Pranayama) and visualization practices that actively lower cortisol levels and calm the nervous system. Our guides help you build a sustainable daily practice.',
        img: 'https://images.unsplash.com/photo-1528315651484-9d10e0544cb4?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Deep Emotional Release',
        content: 'Meditation isn\'t just about clearing the mind; it\'s about processing suppressed emotions. Through deep guided mindfulness, you can safely release past traumas and cultivate profound self-love and positive energy.',
        img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop'
      }
    ],
    benefits: ['Reduced Stress & Anxiety', 'Improved Focus & Clarity', 'Better Sleep Quality', 'Emotional Resilience']
  },
  'tarot': {
    title: 'Tarot Reading',
    subtitle: 'Intuitive guidance through universal symbols.',
    intro: 'Tarot is a powerful tool for reflection and decision-making. By tapping into archetypal imagery and synchronicity, our gifted readers help you navigate life\'s crossroads, revealing the hidden energies surrounding your current situation.',
    heroImg: 'https://images.unsplash.com/photo-1632516482181-427c3f3ab654?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        title: 'Clarity in the Present',
        content: 'Unlike astrology, which maps your whole life, Tarot focuses intensely on the present moment and the immediate future. It holds up a mirror to your subconscious, validating your intuition and highlighting what you may be overlooking.',
        img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Empowered Decision Making',
        content: 'A Tarot reading doesn\'t dictate your future; it empowers you to create it. By understanding the possible outcomes of your choices, you can confidently steer your life in the direction of your highest aspirations.',
        img: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=800&auto=format&fit=crop'
      }
    ],
    benefits: ['Immediate Clarity', 'Validation of Intuition', 'Navigating Crossroads', 'Uncovering Subconscious Blocks']
  },
  // Default fallback for others
  'default': {
    title: 'Spiritual Healing',
    subtitle: 'Align your mind, body, and spirit.',
    intro: 'Discover ancient and modern modalities designed to bring you back into balance. Our expert practitioners provide personalized guidance to help you clear blockages, find peace, and step into your true power.',
    heroImg: 'https://images.unsplash.com/photo-1515023677547-593d7638cbd6?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        title: 'Holistic Restoration',
        content: 'True healing addresses the whole person. Our holistic approaches work on energetic, emotional, and physical levels simultaneously, ensuring deep and lasting transformation rather than just symptom relief.',
        img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Guided by Experts',
        content: 'You don\'t have to walk this path alone. Connect with our vetted, compassionate practitioners who will hold safe space for your healing journey and provide the exact energetic remedies you need.',
        img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop'
      }
    ],
    benefits: ['Deep Inner Peace', 'Energetic Alignment', 'Release of Blockages', 'Spiritual Growth']
  }
};

export default function ModalityPage() {
  const params = useParams();
  const id = params.id as string;
  
  const content = MODALITY_CONTENT[id] || MODALITY_CONTENT['default'];

  return (
    <div className="min-h-screen bg-[#4D316B] text-[#F8F7FA] font-sans selection:bg-[#B79AE6] selection:text-[#4D316B]">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={content.heroImg} alt={content.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#4D316B]/80 via-[#4D316B]/60 to-[#4D316B]" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center mt-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#694091]/30 border border-[#694091]/50 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#B79AE6]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B79AE6]">Premium Modality</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-[#D1BDEB] max-w-2xl mx-auto drop-shadow-md">
              {content.subtitle}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 container mx-auto px-6 max-w-4xl text-center">
          <p className="text-xl md:text-2xl leading-relaxed text-[#F8F7FA]/90 font-light">
            {content.intro}
          </p>
        </section>

        {/* Alternating Sections */}
        <section className="py-12 pb-32">
          <div className="container mx-auto px-6 lg:px-16 space-y-32">
            {content.sections.map((sec: any, idx: number) => (
              <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-[2rem] overflow-hidden group">
                    <div className="absolute inset-0 bg-[#B79AE6]/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
                    <img 
                      src={sec.img} 
                      alt={sec.title} 
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-[#F8F7FA]">
                    {sec.title}
                  </h2>
                  <p className="text-lg text-[#B79AE6] leading-relaxed mb-8">
                    {sec.content}
                  </p>
                  
                  {/* If it's the last section, show the benefits list */}
                  {idx === content.sections.length - 1 && (
                    <div className="mt-4 space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[#B79AE6] mb-4">What You Will Gain</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {content.benefits.map((ben: string, i: number) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-medium text-[#F8F7FA]">
                            <CheckCircle2 className="w-5 h-5 text-[#B79AE6]" />
                            {ben}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-[#7A48AB]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B79AE6]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to seek guidance?
            </h2>
            <p className="text-lg text-[#D1BDEB] mb-10 max-w-xl mx-auto">
              Connect with our highly vetted {content.title} practitioners right now and start your journey to clarity and peace.
            </p>
            <Link 
              href="/practitioners" 
              className="inline-flex items-center justify-center gap-2 bg-[#B79AE6] text-[#4D316B] px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-xl hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:-translate-y-1"
            >
              Find a Practitioner <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer minimal */}
      <footer className="py-12 border-t border-[#694091] bg-[#4D316B] text-center text-[#B79AE6] text-sm font-medium">
        &copy; {new Date().getFullYear()} Zenauraa Wellness. All rights reserved.
      </footer>
    </div>
  );
}
