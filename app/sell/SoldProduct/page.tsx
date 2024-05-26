"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';

const SoldProducts: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortMethod, setSortMethod] = useState<string | null>(null);
    const router = useRouter();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const baseUrl = 'http://34.87.57.125/order';
            const url = sortMethod ? `${baseUrl}?sort=${sortMethod}` : baseUrl;
            const response = await fetch(url);
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched data:', result);
            const filteredData = result.filter((order: any) => order.status === "SUCCESS");
            setData(filteredData);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    }, [sortMethod]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortMethod(e.target.value);
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortMethod === 'name') {
            return a.productName.localeCompare(b.productName);
        } else {
            return 0; // Default sorting
        }
    });

    return (
        <div className="py-12 container mx-auto">
            <button 
                onClick={() => router.push('/sell')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
            >
                Back
            </button>
            <h1 className="text-2xl font-bold text-center">Sold Products</h1>
            <div className="flex justify-end mb-4">
                <select 
                    onChange={handleSortChange}
                    value={sortMethod || ''}
                    className="px-4 py-2 border rounded"
                >
                    <option value="">No Sorting</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>
            <div className="mt-8">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div>
                        {sortedData.length === 0 ? (
                            <p className="text-center">No data to display</p>
                        ) : (
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Order ID</th>
                                        <th className="py-2 px-4 border-b">Product Name</th>
                                        <th className="py-2 px-4 border-b">Buyer ID</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedData.map(order => (
                                        <tr key={order.id}>
                                            <td className="py-2 px-4 border-b">{order.id}</td>
                                            <td className="py-2 px-4 border-b">{order.productName}</td>
                                            <td className="py-2 px-4 border-b">{order.buyerId}</td>
                                            <td className="py-2 px-4 border-b">{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SoldProducts;
