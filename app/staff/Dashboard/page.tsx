"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import '@/styles/globals.css';
import withAuth from '@/components/hoc/withAuth';

const Dashboard: React.FC = () => {
    const router = useRouter();

    return (
        <div className="py-12 container mx-auto h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center mb-12 text-white">Staff Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-8">
                <Link
                    href="/staff/OnGoingTopUps"
                    className="p-6 text-center border rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500 bg-white shadow-lg"
                >
                    <h3 className="text-2xl font-bold">On Going Top Ups &rarr;</h3>
                </Link>
                <Link
                    href="/staff/OnGoingPayments"
                    className="p-6 text-center border rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500 bg-white shadow-lg"
                >
                    <h3 className="text-2xl font-bold">On Going Payments &rarr;</h3>
                </Link>
                <Link
                    href="/staff/TopUpHistory"
                    className="p-6 text-center border rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500 bg-white shadow-lg"
                >
                    <h3 className="text-2xl font-bold">Top Up History &rarr;</h3>
                </Link>
                <Link
                    href="/staff/PaymentHistory"
                    className="p-6 text-center border rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500 bg-white shadow-lg"
                >
                    <h3 className="text-2xl font-bold">Payment History &rarr;</h3>
                </Link>
            </div>
            <button
                onClick={() => router.push('/')}
                className="mt-8 p-3 text-center border rounded-xl text-white hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-lg"
            >
                Back to Landing Page
            </button>
        </div>
    );
};

export default withAuth(Dashboard, ['STAFF']);
