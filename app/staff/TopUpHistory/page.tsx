"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';

const TopUpHistory: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortMethod, setSortMethod] = useState<string | null>(null); // Default to null for initial fetch
    const router = useRouter();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const baseUrl = 'http://34.87.57.125/api/topups/non-pending';
            const url = sortMethod ? `${baseUrl}?sort=${sortMethod}` : baseUrl;
            const response = await fetch(url);
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched data:', result);
            setData(result);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    }, [sortMethod]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="py-12 container mx-auto">
            <button 
                onClick={() => router.push('/staff/Dashboard')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
            >
                Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-center">Top Up History</h1>
            <div className="flex justify-end mb-4">
                <select 
                    onChange={(e) => setSortMethod(e.target.value)}
                    value={sortMethod || ''}
                    className="px-4 py-2 border rounded"
                >
                    <option value="">No Sorting</option>
                    <option value="status">Sort by Status (SUCCESS-FAILED)</option>
                    <option value="statusReverse">Sort by Status (FAILED-SUCCESS)</option>
                    <option value="transactionTimeAsc">Sort by Transaction Time (Newest-Oldest)</option>
                    <option value="transactionTimeDesc">Sort by Transaction Time (Oldest-Newest)</option>
                    <option value="amount">Sort by Amount (Low-High)</option>
                    <option value="amountReverse">Sort by Amount (High-Low)</option>
                    <option value="ownerId">Sort by Owner ID</option>
                </select>
            </div>
            <div className="mt-8">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div>
                        {data.length === 0 ? (
                            <p className="text-center">No data to display</p>
                        ) : (
                            data.map(topUp => (
                                <div key={topUp.topUpId} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                                    <p><strong>Amount:</strong> Rp{topUp.amount}</p>
                                    <p><strong>Transaction Time:</strong> {topUp.transactionTime}</p>
                                    <p><strong>User Owner ID:</strong> {topUp.userOwnerId}</p>
                                    <p 
                                        style={{ color: topUp.status === 'SUCCESS' ? 'green' : topUp.status === 'FAILED' ? 'red' : 'black' }}
                                    >
                                        <strong>Status:</strong> {topUp.status}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopUpHistory;
