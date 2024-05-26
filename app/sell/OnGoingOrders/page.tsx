"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import { getCookie } from '@/utils/cookies';

const OnGoingPayments: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortMethod, setSortMethod] = useState<string | null>(null);
    const router = useRouter();
    const username = getCookie('username');

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const baseUrl = 'http://34.87.57.125/order';
            // const baseUrl = 'http://localhost:8080/order';
            const url = sortMethod ? `${baseUrl}?sort=${sortMethod}` : baseUrl;
            const response = await fetch(url);
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched orders:', result);
            const filteredOrders = result.filter((order: any) => order.status === "WAITING_PAYMENT");
            setOrders(filteredOrders);
        } catch (error) {
            console.error("Error fetching orders", error);
        } finally {
            setLoading(false);
        }
    }, [sortMethod]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const baseUrl = 'http://34.87.57.125/product';
            // const baseUrl = 'http://localhost:8080/order';
            const url = `${baseUrl}`;
            const response = await fetch(url);
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched products:', result);
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, [fetchOrders, fetchProducts]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortMethod(e.target.value);
    };

    const filteredProducts = products.filter(product => product.sellerId === username);
    const productIds = filteredProducts.map(product => product.productId);
    const filteredOrders = orders.filter(order => productIds.includes(order.id));

    const sortedOrders = [...filteredOrders].sort((a, b) => {
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
            <h1 className="text-2xl font-bold text-center">On Going Orders</h1>
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
                        {sortedOrders.length === 0 ? (
                            <p className="text-center">No data to display</p>
                        ) : (
                            sortedOrders.map(order => (
                                <div key={order.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                                    <p><strong>Order ID:</strong> {order.id}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Buyer ID:</strong> {order.buyerId}</p>
                                    <p><strong>Product:</strong> {order.productName}</p>

                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            onClick={() => router.push(`/sell/EditOrder/${order.id}`)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                        >
                                            Edit
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
