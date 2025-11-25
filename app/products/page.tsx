'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import productsData from '@/data/products.json';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const categoriesSet = new Set<string>();
    productsData.forEach((p) => categoriesSet.add(p.category));
    setProducts(productsData);
    setCategories(['All', ...Array.from(categoriesSet)]);
  }, []);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-24 bg-secondary">
      <div className="max-w-max mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        ></motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2  transition-all ${selectedCategory === category
                  ? 'bg-gray-400 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 ">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}
