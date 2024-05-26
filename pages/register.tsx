import React from "react";
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import UserRegisterForm, { UserRegisterData } from "@/components/auth/RegisterForm";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (userRegister: UserRegisterData) => {
    try {
      const response = await fetch('http://34.87.158.208/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userRegister),
      });

      if (response.ok) {
        console.log("-Register successful");
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
      <UserRegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RegisterPage;
