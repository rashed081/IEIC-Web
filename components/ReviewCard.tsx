// components/ReviewCard.tsx

'use client';

import { motion } from 'framer-motion';
import { Review } from '@/types';
import { Quote } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <Quote className="text-accent mb-4" size={32} />
      <p className="text-gray-700 mb-4 italic">
        "{review.review}"
      </p>
      <div className="border-t pt-4">
        <p className="font-semibold text-primary">{review.clientName}</p>
        <p className="text-sm text-gray-600">{review.companyName}</p>
      </div>
    </motion.div>
  );
}