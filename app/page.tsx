// pages/index.js
"use client";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from '@/utils/cookies';

export default function Home() {
  const [username, setUsername] = useState('');
  const [money, setMoney] = useState('');

  useEffect(() => {
    const user = getCookie('username') || '';
    const balance = getCookie('money') || ''; 
    setUsername(user);
    setMoney(balance);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Farrel - Welcome</title>
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <span className="bg-gradient-to-br from-gradient-start via-purple-300 to-gradient-end bg-clip-text text-transparent animate-gradient">
            Farrel
          </span>
        </h1>

        <p className="mt-3 text-2xl">
          Discover unique fashion items at unbeatable prices
        </p>

        {username && (
          <div className="mt-6 text-xl">
            <p>Hello, {username}!</p>
            <p>Your balance: Rp{money}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link
            href="/shop"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500"
          >
            <h3 className="text-2xl font-bold">Shop Now &rarr;</h3>
            <p className="mt-4 text-xl">
              Browse our collection of curated fashion items.
            </p>
          </Link>

          <Link
            href="/sell"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500"
          >
            <h3 className="text-2xl font-bold">Sell Your Items &rarr;</h3>
            <p className="mt-4 text-xl">
              List your pre-loved fashion items for sale.
            </p>
          </Link>

          <Link
            href="/staff/Dashboard"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500"
          >
            <h3 className="text-2xl font-bold">A Staff? &rarr;</h3>
            <p className="mt-4 text-xl">Go to staff dashboard here.</p>
          </Link>

          <Link
              href={`/topups/${getCookie('username')}`}
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500"
          >
            <h3 className="text-2xl font-bold">Top Up &rarr;</h3>
            <p className="mt-4 text-xl">Add Funds for a Seamless Shopping Experience.</p>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p>Farrel &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
