'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { Loader2, Package, Globe, Truck, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/data/products.json'; // Local JSON

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === params.id) || null;
    setProduct(foundProduct);
    setSelectedImage(foundProduct?.images?.[0] || '/images/placeholder.jpg');

    if (foundProduct) {
      const related = productsData
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3); // Show 3 related products
      setRelatedProducts(related);
    }

    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-24 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Product not found</h1>
        <Link href="/products" className="hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link href="/products" className="inline-flex items-center hover:underline mb-8">
            ← Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="w-full h-96 relative mb-4 border rounded-lg overflow-hidden bg-white">
                <Image src={selectedImage} alt={product.name} fill className="object-contain" />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-20 h-20 border rounded-lg cursor-pointer flex-shrink-0 overflow-hidden ${
                      selectedImage === img ? 'border-accent border-2' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{product.name}</h1>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Globe className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Origin</p>
                      <p className="text-gray-600">{product.origin}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Packaging</p>
                      <p className="text-gray-600">{product.packaging}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Shipping Terms</p>
                      <p className="text-gray-600">{product.shipping}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Minimum Order Quantity</p>
                      <p className="text-gray-600">{product.moq}</p>
                    </div>
                  </div>
                </div>

                {product.certifications?.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-gray-800 mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <Link
                href="/contact"
                className="block w-full mt-8 text-center rounded-md text-lg font-semibold hover:underline transition-colors"
              >
                Inquire About This Product
              </Link>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 border-t pt-10">
              <h2 className="text-2xl font-bold text-primary mb-8 text-center">
                Related Products
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/products/${related.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={related.images?.[0] || '/images/placeholder.jpg'}
                        alt={related.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {related.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{related.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
