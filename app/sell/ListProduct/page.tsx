"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';

const OnGoingPayments: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortMethod, setSortMethod] = useState<string | null>(null); // Default to null for initial fetch
    const router = useRouter();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const baseUrl = 'http://34.87.57.125/product';
            // const baseUrl = 'http://localhost:8080/product';
            
            

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

    const sortData = (data: any[], method: string | null) => {
        switch (method) {
            case 'name':
                return [...data].sort((a, b) => a.productName.localeCompare(b.productName));
            case 'price':
                return [...data].sort((a, b) => a.price - b.price);
            case 'priceReverse':
                return [...data].sort((a, b) => b.price - a.price);
            default:
                return data;
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(` http://34.87.57.125/product/${id}`, {
                // const response = await fetch(' http://localhost:8080/product/${id}', {

                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setData(prevData => prevData.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const sortedData = sortData(data, sortMethod);

    return (
        <div className="py-12 container mx-auto">
            <div className="flex justify-between mb-4">
                <button 
                    onClick={() => router.push('/sell')}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                    Back
                </button>
                <button 
                    onClick={() => router.push('/sell/CreateProduct')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                    Create Product
                </button>
            </div>
            <h1 className="text-2xl font-bold text-center">Product</h1>
            <div className="flex justify-end mb-4">
                <select 
                    onChange={(e) => setSortMethod(e.target.value)}
                    value={sortMethod || ''}
                    className="px-4 py-2 border rounded"
                >
                    <option value="">No Sorting</option>
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price (Low to High)</option>
                    <option value="priceReverse">Sort by Price (High to Low)</option>
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
                            sortedData.map(product => (
                                <div key={product.productId} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                                    <p><strong>Price:</strong> Rp{product.price}</p>
                                    <p><strong>Product Name:</strong> {product.productName}</p>
                                    <p><strong>Description:</strong> {product.description}</p>
                                    <p><strong>Stock:</strong> {product.stockQuantity}</p>
                                    <p><strong>Product ID:</strong> {product.productId}</p>
                                    <p><strong>Seller ID:</strong> {product.sellerId}</p>
                                    {product.imageUrl && (
                                        <div className="mt-2">
                                            <img src={product.imageUrl} alt={product.productName} className="max-w-full h-auto rounded-lg" />
                                        </div>
                                    )}
                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            onClick={() => router.push(`/sell/EditProduct/${product.productId}`)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.productId)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
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

export default OnGoingPayments;
