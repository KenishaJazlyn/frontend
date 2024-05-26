import React, { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';
import '@/styles/globals.css';
import { setCookie } from '@/utils/cookies';

interface UserLoginFormProps {
  onSubmit: (userLogin: UserLoginData) => void;
}

export interface UserLoginData {
  username: string;
  password: string;
}

const UserLoginForm: React.FC<UserLoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserLoginData>({ username: '', password: '' });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Ensure formData is correctly set initially
    setFormData(formData => ({ ...formData }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting the following data:", JSON.stringify(formData));
    try {
      const response = await fetch('http://34.87.158.208/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful");
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setCookie('bearer', data.token, 7);  
        setCookie('username', data.username, 7);  
        console.log(data.token)
        onSubmit(data); // Pass the response data to the parent component
        router.push('/');
        // Store token in local storage or cookies
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
  const handleRegister = () => {
    // Hapus cookie di sini
    
    // Redirect ke halaman login
    router.push('/register'); // Ganti '/login' dengan URL halaman login Anda
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <div className="mt-8 bg-white shadow-lg rounded-lg">
          <form className="p-4 bg-gray-50" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full p-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Login</button>
          </form>
          <div className="mt-4 text-center">
            <p>Don&apos;t have an account?</p>
            <button onClick={() => router.push(`/register`)}className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
