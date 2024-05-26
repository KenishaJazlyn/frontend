"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookies";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = getCookie("userId");

  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const response = await fetch(
            `http://34.87.57.125/cart/carts/active/${userId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCartItems(data);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCart();
    }
  }, [userId]);

  if (loading) {
    return <div className="text-center my-20">Loading...</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div className="text-center my-20">Cart is empty</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold text-center my-20">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-32">
        {cartItems.map((item: any) => (
          <div
            key={item.itemId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-gray-300 h-48"></div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.productId}</h2>
              <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
              <p className="text-gray-600 mb-4">IDR {item.price}</p>
              <div className="flex space-x-4">
                <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
                  -
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
