'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 w-full max-w-xs text-center"
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.images?.[0] || '/images/hero1.jpg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="text-xl font-semibold text-primary mb-2 hover:underline">
          {product.name} 
        </Link>
        <p className="text-sm text-gray-600 mb-2">
          Origin: {product.origin}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          MOQ: {product.moq}
        </p>
      </div>
    </motion.div>
  );
}
