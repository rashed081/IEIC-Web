// app/page.tsx

'use client';

import { motion } from 'framer-motion';
import Carousel from '@/components/Carousel';
import { ArrowRight, MessageSquare, Globe, Package, TrendingUp } from 'lucide-react';
import Hero from '@/components/hero';
import CTA from '@/components/CTA';
import ServicesGrid from '@/components/ServiceGrid';

const heroImages = [
  '/images/hero1.jpg'
];

export default function HomePage() {
  return (
    
    <div className="min-h-screen">
      <Hero/>
      {/* Image Carousel Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Carousel images={heroImages} autoPlay={true} interval={4000} />
          </motion.div>
        </div>
      </section>

      <ServicesGrid/>
      <CTA/>
    </div>
  );
}