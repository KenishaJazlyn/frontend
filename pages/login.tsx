import React from "react";
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import UserLoginForm, { UserLoginData } from "@/components/auth/LoginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (userLogin: UserLoginData) => {
    try {
      const response = await fetch('http://34.87.158.208/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userLogin),
      });

      if (response.ok) {
        console.log("-Login successful");
        const data = await response.json();
      } else {
        console.error('Failed to log in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <UserLoginForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default LoginPage;
