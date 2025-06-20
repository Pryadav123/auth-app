'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 text-center px-6 overflow-hidden">
      {/* Decorative Animated Blobs */}
      <div className="absolute w-72 h-72 bg-purple-300 opacity-30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-blue-300 opacity-30 rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-pulse"></div>

      <div className="z-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 animate-fade-up">
          Welcome to <span className="text-purple-700">AuthApp 🚀</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 mb-10 animate-fade-up delay-150">
          Secure and stylish authentication built with Next.js, Prisma, and MySQL.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up delay-300">
          <button
            onClick={() => router.push('/auth/register')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
