"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';

const Dashboard: React.FC = () => {
    const router = useRouter();

    return (
        <div className="py-12 container mx-auto h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center mb-8">Staff Dashboard</h1>
            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                <button
                    onClick={() => router.push('/staff/OnGoingTopUps')}
                    className="px-4 py-16 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-700"
                >
                    On Going Top Ups
                </button>
                <button
                    onClick={() => router.push('/staff/OnGoingPayments')}
                    className="px-4 py-16 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-700"
                >
                    On Going Payments
                </button>
                <button
                    onClick={() => router.push('/staff/TopUpHistory')}
                    className="px-4 py-16 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-700"
                >
                    Top Up History
                </button>
                <button
                    onClick={() => router.push('/staff/PaymentHistory')}
                    className="px-4 py-16 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-700"
                >
                    Payment History
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
