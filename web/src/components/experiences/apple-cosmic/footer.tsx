'use client';

export function AppleCosmicFooter() {
  return (
    <footer className="bg-[#F5F5F7] py-12 border-t border-gray-200 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>Copyright © 2026 HealConnect Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Legal</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Site Map</a>
        </div>
      </div>
    </footer>
  );
}
