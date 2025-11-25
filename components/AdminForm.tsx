// components/AdminForm.tsx

'use client';

import { useState } from 'react';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Product } from '@/types';
import { Loader2, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AdminForm({ product, onSuccess, onCancel }: AdminFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    description: product?.description || '',
    origin: product?.origin || '',
    packaging: product?.packaging || '',
    shipping: product?.shipping || '',
    moq: product?.moq || '',
    certifications: product?.certifications?.join(', ') || '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadPromises = imageFiles.map(async (file) => {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [...existingImages];

      // Upload new images if any
      if (imageFiles.length > 0) {
        const newImageUrls = await uploadImages();
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      if (imageUrls.length === 0) {
        toast.error('Please add at least one image');
        setLoading(false);
        return;
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        origin: formData.origin,
        packaging: formData.packaging,
        shipping: formData.shipping,
        moq: formData.moq,
        certifications: formData.certifications
          .split(',')
          .map(cert => cert.trim())
          .filter(cert => cert !== ''),
        images: imageUrls,
      };

      if (product) {
        // Update existing product
        await updateDoc(doc(db, 'products', product.id), productData);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp(),
        });
        toast.success('Product created successfully!');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <input
            type="text"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="e.g., Fresh Vegetables"
          />
        </div>

        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Origin *
          </label>
          <input
            type="text"
            name="origin"
            required
            value={formData.origin}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        {/* MOQ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Order Quantity *
          </label>
          <input
            type="text"
            name="moq"
            required
            value={formData.moq}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="e.g., 20 metric tons"
          />
        </div>

        {/* Packaging */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Packaging *
          </label>
          <input
            type="text"
            name="packaging"
            required
            value={formData.packaging}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="e.g., 10kg mesh bag"
          />
        </div>

        {/* Shipping */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shipping Terms *
          </label>
          <input
            type="text"
            name="shipping"
            required
            value={formData.shipping}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="e.g., CFR or CIF"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certifications (comma-separated)
        </label>
        <input
          type="text"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="e.g., GAP, ISO 9001, HACCP"
        />
      </div>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Images
          </label>
          <div className="grid grid-cols-3 gap-4">
            {existingImages.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {product ? 'Add More Images' : 'Product Images *'}
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200">
            <Upload size={20} />
            <span>Choose Files</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required={!product && existingImages.length === 0}
            />
          </label>
          {imageFiles.length > 0 && (
            <span className="text-sm text-gray-600">
              {imageFiles.length} file(s) selected
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Saving...
            </>
          ) : (
            product ? 'Update Product' : 'Create Product'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}