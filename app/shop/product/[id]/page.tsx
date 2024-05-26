"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://34.87.57.125/product/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    const userId = "d72da3aa-54cb-4f63-8bba-e98e896e5427"; // Replace with actual user ID

    const requestBody = {
      productId: product.productId,
      quantity,
      price: product.price,
      userId,
    };

    try {
      const response = await fetch("http://34.87.57.125/cart/carts/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Product added to cart:", result);

      // Optionally redirect or show a success message
      // router.push('/cart'); // Uncomment to redirect to the cart page
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading) {
    return <div className="text-center my-20">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center my-20">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto my-10 bg-white p-5 rounded-lg shadow-md">
        <img
          src={product.imageUrl}
          alt={`image of ${product.productName}`}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
        <p className="text-gray-700 mb-4">Description: {product.description}</p>
        <p className="text-gray-900 font-bold text-2xl mb-4">
          IDR {product.price}
        </p>
        <p className="text-gray-600 mb-4">Stock: {product.stockQuantity}</p>
        <p className="text-gray-600">Seller ID: {product.sellerId}</p>
        <div className="flex items-center my-5 gap-5">
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
          >
            +
          </button>
        </div>
        <div className="flex flex-row my-5 gap-5 justify-end">
          <Link
            href="#"
            onClick={handleAddToCart}
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
          >
            Add to Cart
          </Link>
          <Link
            href="#"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
          >
            See review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
