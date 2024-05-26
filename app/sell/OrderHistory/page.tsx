"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import { getCookie } from '@/utils/cookies';

interface Order {
    id: string;
    productName: string;
    buyerId: string;
    status: string;
    productId: string; // Ensure productId is part of Order interface
}

interface Product {
    productId: string;
    productName: string;
    sellerId: string;
    // Add any other relevant fields from the product
}

const OrdersList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const username = getCookie('username');

    const fetchOrders = useCallback(async () => {
        try {
            const response = await fetch('http://34.87.57.125/order');
            // const response = await fetch('http://localhost:8080/order');

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
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch('http://34.87.57.125/product');
            // const response = await fetch('http://localhost:8080/product');

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, [fetchOrders, fetchProducts]);

    const filteredProducts = products.filter(product => product.sellerId === username);
    const productIds = filteredProducts.map(product => product.productId);
    const filteredOrders = orders.filter(order => productIds.includes(order.id));

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
                        {filteredOrders.map((order) => (
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
