import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import "@/styles/globals.css";

interface UserRegisterFormProps {
  onSubmit: (userRegister: UserRegisterData) => void;
}

export interface UserRegisterData {
  username: string;
  password: string;
  email: string;
  role: string;
}

const UserRegisterForm: React.FC<UserRegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserRegisterData>({
    username: "",
    password: "",
    email: "",
    role: "",
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Ensure formData is correctly set initially
    setFormData((formData) => ({ ...formData }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting the following data:", JSON.stringify(formData));
    try {
      const response = await fetch("http://34.87.158.208/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Register successful");
        const data = await response.json();
        console.log(data.token);
        onSubmit(data); // Pass the response data to the parent component
        router.push("/login");
        // Store token in local storage or cookies
      } else {
        const errorResponse = await response.text();
        setError(errorResponse);
        console.error("Server responded with an error:", errorResponse);
      }
    } catch (error) {
      setError("Error submitting form");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <div className="mt-8 bg-white shadow-lg rounded-lg">
          <form className="p-4 bg-gray-50" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700">
                Role
              </span>
              <div className="mt-1 flex items-center">
                <input
                  id="role-user"
                  name="role"
                  type="radio"
                  value="USER"
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  checked={formData.role === "USER"}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="role-user"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  USER
                </label>
              </div>
              <div className="mt-1 flex items-center">
                <input
                  id="role-staff"
                  name="role"
                  type="radio"
                  value="STAFF"
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  checked={formData.role === "STAFF"}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="role-staff"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  STAFF
                </label>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full p-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterForm;
