// app/admin/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { verifyPassword, setAdminAuth, checkAdminAuth } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (checkAdminAuth()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (verifyPassword(password)) {
        setAdminAuth(true);
        toast.success('Login successful!');
        router.push('/admin/dashboard');
      } else {
        toast.error('Invalid password');
        setPassword('');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-accent/10 p-4 rounded-full">
            <Lock className="text-accent" size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Admin Access
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your password to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Protected Area - Authorized Access Only</p>
        </div>
      </motion.div>
    </div>
  );
}