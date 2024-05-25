import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/app/globals.css';

const OnGoingTopUps: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortMethod, setSortMethod] = useState<string | null>(null); // Default to null for initial fetch
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const baseUrl = 'http://34.87.57.125/api/topups/pending';
                const url = sortMethod ? `${baseUrl}?sort=${sortMethod}` : baseUrl;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortMethod]);

    const updateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`http://34.87.57.125/api/topup/${id}/update-status/${status}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setData(prevData => prevData.filter(item => item.topUpId !== id));
            } else {
                console.error('Failed to update status:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="py-12 container mx-auto">
            <button 
                onClick={() => router.push('/staff-db/Dashboard')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
            >
                Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-center">On Going Top Ups</h1>
            <div className="flex justify-end mb-4">
                <select 
                    onChange={(e) => setSortMethod(e.target.value)}
                    value={sortMethod || ''}
                    className="px-4 py-2 border rounded"
                >
                    <option value="">No Sorting</option>
                    <option value="transactionTimeDesc">Sort by Transaction Time (Oldest-Newest)</option>
                    <option value="transactionTimeAsc">Sort by Transaction Time (Newest-Oldest)</option>
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
                                    <p><strong>Status:</strong> {topUp.status}</p>
                                    <p><strong>Transaction Time:</strong> {topUp.transactionTime}</p>
                                    <p><strong>User Owner ID:</strong> {topUp.userOwnerId}</p>
                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            onClick={() => updateStatus(topUp.topUpId, 'success')}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(topUp.topUpId, 'failed')}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnGoingTopUps;
