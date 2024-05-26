import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EditReviewForm, { EditedReviewData } from '@/components/review/EditReviewForm';
import Header from '@/components/Header';
import '@/app/globals.css';

const EditReviewPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [review, setReview] = useState<EditedReviewData | null>(null);

  useEffect(() => {
    const fetchReviewById = async (id: string | string[]) => {
      try {
        const response = await fetch(`http://34.87.57.125/api/review/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch review');
        }
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };
  
    const { id } = router.query;
    if (id) {
      fetchReviewById(id);
    }
  }, [router.query]);
  

  const handleFormSubmit = async (editedReview: EditedReviewData) => {
    try {
      const response = await fetch('http://34.87.57.125/api/review', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedReview),
      });
      if (response.ok) {
        router.push(`/reviewProduct/${editedReview.productId}`);
      } else {
        setError('Price or stock must be non-negative atau rate condition harus berada di antara 0,1,2,3');
        console.error('Price or stock must be non-negative atau rate condition harus berada di antara 0,1,2,3');
      }
    } catch (error) {
        setError('Error submitting form:')
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Header /> 
      <div className="flex justify-center my-8">
        {review && <EditReviewForm review={review} onSubmit={handleFormSubmit} error={error}/>}
      </div>
    </div>
  );
};

export default EditReviewPage;