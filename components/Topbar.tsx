// components/TopBar.tsx
'use client';

import { Mail, Phone } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-amber-500 text-white text-sm md:text-base h-8 md:h-10 flex items-center justify-center md:justify-end px-4 md:px-8 space-x-6">
      <div className="flex items-center space-x-1">
        <Mail className="w-4 h-4" />
        <span>info@ieic.com</span>
      </div>
      <div className="flex items-center space-x-1">
        <Phone className="w-4 h-4" />
        <span>+880 1234 567890</span>
      </div>
    </div>
  );
}
