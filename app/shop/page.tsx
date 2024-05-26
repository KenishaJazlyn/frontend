"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCookie } from "@/utils/cookies";

const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const username = getCookie("username");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://34.87.57.125/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center my-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold text-center my-20">
        Find outfit that suits you, {username}!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-32">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-gray-300 h-48"></div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {product.productName}
              </h2>
              <p className="text-gray-600 mb-4">IDR {product.price}</p>
              <Link
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
                href={`/shop/product/${product.productId}`}
              >
                See details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
