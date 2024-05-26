"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';

interface Order {
    id: string;
    productName: string;
    buyerId: string;
    status: string;
}

const OrdersList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {

                const response = await fetch(' http://34.87.57.125/order');
                // const response = await fetch(' http://localhost:8080/order');

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const orders = await response.json();
                const filteredOrders = orders.filter((order: Order) =>
                    ["SUCCESS", "FAILED", "CANCELLED"].includes(order.status)
                );
                setOrders(filteredOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="py-12 container mx-auto">
            <button
                onClick={() => router.push('/sell/')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
            >
                Back
            </button>
            <h1 className="text-2xl font-bold text-center mb-8">Order History</h1>
            {loading ? (
                <div className="text-center">Loading...</div>
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
                        {orders.map((order) => (
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
    );
};

export default OrdersList;
