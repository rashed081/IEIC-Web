'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Ship } from 'lucide-react'; 
import { Button } from "@/components/UI/Button";

const navLinks = [
  { href: '/', name: 'Home' },
  { href: '/currencyConverter', name: "Tools" },
  { href: '/products', name: 'Products' },
  { href: '/clients', name: 'Clients' },
  { href: '/contact', name: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isHomePage
          ? isScrolled
            ? "bg-white text-black shadow-lg"
            : "bg-transparent text-white"
          : "bg-white text-black shadow-lg"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-amber-500 p-2 rounded-lg transition-transform group-hover:scale-110">
              <Ship className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl">IEIC</h1>
              <p className="text-xs">Imperial Export Import Company</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-amber-500 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
            <Button variant="default">Get Quote</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed top-0 right-0 h-full w-1/2 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-end p-4">
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-black hover:text-amber-500 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full bg-amber-500 hover:bg-amber-600">
                Get Quote
              </Button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
