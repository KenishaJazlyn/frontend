import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import { getCookie } from '@/utils/cookies';
import Header from '../Header';

interface NewReviewFormProps {
  onSubmit: (newReview: NewReviewData) => void;
  id: string;
}

export interface NewReviewData {
  userId: string;
  productId: string;
  rating: number;
  review: string;
}

const NewReviewForm: React.FC<NewReviewFormProps> = ({ onSubmit, id }) => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const username = getCookie('username');
  
  const [formData, setFormData] = useState<NewReviewData>({
    userId: username || 'guest',
    productId: id,
    rating: 1,
    review: '',
  });

  useEffect(() => {
    if (id) {
      setFormData((formData) => ({ ...formData, productId: id }));
    }
    if (!username) {
      router.push('/login'); // Redirect to login if username is not present in cookies
    }
  }, [id, username, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting the following data:', JSON.stringify(formData));
    
    try {
      const response = await fetch('http://34.87.57.125/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Successfully added review');
        router.push(`/reviewProduct/${formData.productId}`);
      } else {
        const errorResponse = await response.text();
        setError(errorResponse);
        console.error('Server responded with an error:', errorResponse);
      }
    } catch (error) {
      setError('Error submitting form');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center">Review</h1>

        <div className="mt-8 bg-white shadow-lg rounded-lg">
          <form className="p-4 bg-gray-50" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                id="rating"
                name="rating"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.rating}
                onChange={handleChange}
                required
              >
                <option value="">Select a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">Your Review</label>
              <textarea
                id="review"
                name="review"
                rows={4}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.review}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full p-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Submit Review
            </button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewReviewForm;
