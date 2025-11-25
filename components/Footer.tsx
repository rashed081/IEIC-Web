// components/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, Linkedin, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          
          
          <div className="text-center md:text-left md:border-r">
            <Link href="/">
              <div className="flex justify-center md:justify-start mb-3">
                <Logo/>
              </div>
            </Link>
            <p className="text-sm max-w-xs mx-auto md:mx-0">
              We trade globally — building connections, moving goods, and making business happen every day.
            </p> <br />
            <p className="text-sm max-w-xs mx-auto md:mx-0">
             364 North Badda, Dhaka-1214, Bangladesh
            </p>
          </div>

           {/* Contact / Social */}
          <div className="text-center md:text-left md:border-r">
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="mailto:info@ieic.com.bd" target="_blank" className="hover:text-blue-600 border border-black  rounded-full p-2">
                <Mail className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/ieicom" target="_blank" className="hover:text-blue-600 border border-black   rounded-full p-2">
                <Linkedin className="w-5 h-5 " />
              </Link>
              <Link href="https://wa.me/+8801521400824" target="_blank" className="hover:text-blue-600 border border-black   rounded-full p-2 ">
                <MessageSquare className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center  md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-black">
              <li>
                <Link href="https://epb.gov.bd/" className="hover:text-blue-600 text-sm">
                  Export Promotion Bureau (EPB)
                </Link>
              </li>
              <li>
                <Link href="https://iccwbo.org/" className="hover:text-blue-600 text-sm">
                  International Chamber Of Commerce
                </Link>
              </li>
              <li>
                <Link href="https://mincom.gov.bd/" className="hover:text-blue-600 text-sm">
                  Bangladesh Ministry Of Commerce
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

         
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} IEIC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}