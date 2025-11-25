// app/clients/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Client, Review } from '@/types';
import ReviewCard from '@/components/ReviewCard';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch clients
      const clientsQuery = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
      const clientsSnapshot = await getDocs(clientsQuery);
      const clientsData: Client[] = [];
      clientsSnapshot.forEach((doc) => {
        clientsData.push({ ...doc.data(), id: doc.id } as Client);
      });

      // Fetch reviews
      const reviewsQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const reviewsSnapshot = await getDocs(reviewsQuery);
      const reviewsData: Review[] = [];
      reviewsSnapshot.forEach((doc) => {
        reviewsData.push({ ...doc.data(), id: doc.id } as Review);
      });

      setClients(clientsData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Clients
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading importers worldwide
          </p>
        </motion.div>

        {/* Client Logos */}
        {clients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-center text-primary mb-8">
              Partner Companies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-24">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-center text-primary mb-8">
            Client Testimonials
          </h2>
          {reviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No reviews yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}