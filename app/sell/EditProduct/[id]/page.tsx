"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '@/app/globals.css';

const EditProduct: React.FC = () => {
    const params = useParams();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log(params)
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/${params!.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const product = await response.json();
                setProductName(product.productName);
                setDescription(product.description);
                setPrice(product.price.toString());
                setStockQuantity(product.stockQuantity.toString());
                setImageUrl(product.imageUrl);
                setSellerId(product.sellerId);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [params!.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/product/${params!.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName,
                    description,
                    price: parseFloat(price),
                    stockQuantity: parseInt(stockQuantity, 10),
                    imageUrl,
                    sellerId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            router.push('/sell');
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-12 container mx-auto">
            <button
                onClick={() => router.push('/sell')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mb-4"
            >
                Back
            </button>
            <h1 className="text-2xl font-bold text-center mb-8">Edit Product</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="stockQuantity" className="block text-gray-700 font-bold mb-2">Stock Quantity</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sellerId" className="block text-gray-700 font-bold mb-2">Seller ID</label>
                    <input
                        type="text"
                        id="sellerId"
                        value={sellerId}
                        onChange={(e) => setSellerId(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
