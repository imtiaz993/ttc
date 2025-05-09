"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-dvh bg-gradient-to-b from-gray-100 to-gray-200">
      <svg
        className="w-24 h-24 text-red-500 mb-6 animate-pulse"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-sm">
        Looks like you've wandered off the path. Let's get you back home!
      </p>
      <button
        onClick={() => router.replace("/")}
        className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full transition-transform transform hover:scale-105"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Return Home
      </button>
    </div>
  );
};

export default NotFound;
