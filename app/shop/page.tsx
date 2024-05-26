import React from "react";

const ShopPage = () => {
  const placeholderItems = [
    { id: 1, name: "Vintage Leather Jacket", price: 499000.0 },
    { id: 2, name: "Retro Graphic Tee", price: 699000.0 },
    { id: 3, name: "High-Waisted Mom Jeans", price: 299000 },
    { id: 4, name: "Chunky Sneakers", price: 169000 },
    { id: 5, name: "Floral Maxi Dress", price: 269000 },
    { id: 6, name: "Oversized Flannel Shirt", price: 399000 },
    // Add more placeholder items as needed
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold text-center my-20">
        Find outfit that suits you!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-32">
        {placeholderItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-gray-300 h-48"></div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4">IDR {item.price}</p>
              <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
                Add to Cart
              </button>
              <button className="bg-indigo-500 mt-5 mr-6 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
               Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
