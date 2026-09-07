'use client';

import { useLayout } from '@/lib/layout-context';

export default function Footer() {
  const { layout } = useLayout();
  const isNewDesign1 = layout === 'new-design-1';

  return (
    <footer className={`py-12 border-t ${isNewDesign1 ? 'bg-[#EDF8FC] border-[#CDE9F4]' : 'bg-[#2A1658] border-[#3B1F7A]'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className={`text-2xl font-heading font-medium mb-4 md:mb-0 ${isNewDesign1 ? 'text-[#12527F]' : 'text-white'}`}>
            Zen<span className={`text-[#D5B6DC]`}>Auraa.</span>
          </div>
          <div className="flex gap-6 text-sm text-white/70 font-medium">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
        <div className="text-center text-white/70 text-sm border-t border-border pt-8">
          &copy; {new Date().getFullYear()} ZenAuraa Wellness. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
