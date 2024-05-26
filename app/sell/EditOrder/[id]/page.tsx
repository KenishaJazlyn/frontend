"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '@/app/globals.css';

const EditOrder: React.FC = () => {
    const params = useParams();
    const [status, setStatus] = useState('');
    const [buyerId, setBuyerId] = useState('');
    const [productName, setProductName] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log(params);
        const fetchOrder = async () => {
            try {
                const response = await fetch(` http://34.87.57.125/order/${params!.id}`);
                // const response = await fetch(' http://localhost:8080/order/${params!.id}');

                if (!response.ok) {
                    throw new Error('Failed to fetch order');
                }
                const order = await response.json();
                setStatus(order.status);
                setBuyerId(order.buyerId);
                setProductName(order.productName);
                setId(order.id);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };
        fetchOrder();
    }, [params!.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(` http://34.87.57.125/order/${params!.id}`, {
            // const response = await fetch(' http://localhost:8080/order/${params!.id}', {


                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status, buyerId, productName, id }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order');
            }

            router.push('/sell/OnGoingOrders');
        } catch (error) {
            console.error('Error updating order:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-12 container mx-auto">
            <button
                onClick={() => router.push('/sell/OnGoingOrders')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
            >
                Back
            </button>
            <h1 className="text-2xl font-bold text-center mb-8">Edit Order</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Select a status</option>
                        <option value="WAITING_PAYMENT">WAITING_PAYMENT</option>
                        <option value="FAILED">FAILED</option>
                        <option value="SUCCESS">SUCCESS</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                </div>
                <input
                    type="hidden"
                    id="buyerId"
                    value={buyerId}
                    onChange={(e) => setBuyerId(e.target.value)}
                />
                <input
                    type="hidden"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <input
                    type="hidden"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Order'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditOrder;
