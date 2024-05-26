import * as React from "react";
import { useRouter } from 'next/router';
import NewReviewForm, { NewReviewData } from "@/components/review/ReviewForm";
import '@/app/globals.css';
import Header from "@/components/Header";

const CreateReviewPage: React.FC = () => {
  const router = useRouter();
  const { idProduct } = router.query; // This extracts `idProduct` directly from the URL

  const handleFormSubmit = async (newReview: NewReviewData) => {
    try {
      const response = await fetch('http://34.87.57.125/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...newReview, productId: idProduct}), // Ensure productId is included in the payload
      });
      if (response.ok) {
        console.log("Review added successfully");
       
      } else {
        console.error('Failed to add new review');
      }
    } catch (error) {
      console.error('Error adding new review:', error);
    }
  };

  return (
    <div>
      <Header /> 
    <div  className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500">
      <NewReviewForm onSubmit={handleFormSubmit} id={idProduct as string} />
    </div></div>
  );
};

export default CreateReviewPage;
