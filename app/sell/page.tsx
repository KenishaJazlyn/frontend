"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';

const Dashboard: React.FC = () => {
    const router = useRouter();

    return (

      <><button
        onClick={() => router.push('')}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
      >
        Back
      </button><div className="py-12 container mx-auto h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center mb-8">Manage your products here</h1>
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            <button
              onClick={() => router.push('/sell/ListProduct')}
              className="px-4 py-16 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-700"
            >
              List Product
            </button>
            <button
              onClick={() => router.push('/sell/OnGoingOrders')}
              className="px-4 py-16 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-700"
            >
              On Going Orders
            </button>
            <button
              onClick={() => router.push('/sell/SoldProduct')}
              className="px-4 py-16 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-700"
            >
              Sold Product
            </button>
            <button
              onClick={() => router.push('/sell/OrderHistory')}
              className="px-4 py-16 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-700"
            >
              Order History
            </button>
          </div>
        </div></>
    );
};

export default Dashboard;
