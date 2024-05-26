import React from 'react';
import '@/styles/globals.css';
import { getCookie, removeCookie } from '@/utils/cookies';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  const username = getCookie('username');

  const handleLogout = () => {
    // Hapus cookie di sini
    removeCookie('username'); // Ganti 'nama_cookie' dengan nama cookie yang ingin Anda hapus
    
    // Redirect ke halaman login
    router.push('/login'); // Ganti '/login' dengan URL halaman login Anda
  };

  return (
    <header>
      <nav className="bg-white text-black border-gray-200 px-4 lg:px-6 py-2.5 !bg-white !text-black">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <span className="self-center text-xl font-semibold whitespace-nowrap !text-black">Farrel</span>
          <div className="flex items-center lg:order-2">
            {username && (
              <span className="text-gray-800 dark:text-black mr-2">Welcome, {username}</span>
            )}
            {username && (
              <a href="#" onClick={handleLogout} className="text-gray-800 dark:text-black hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log out</a>
            )}
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
