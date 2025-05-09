import "./globals.css";

export const metadata = {
  title: "TTC",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className="min-h-dvh max-h-dvh overflow-hidden">
        <div className="sm:hidden h-dvh">{children}</div>
        <div className="hidden sm:flex flex-col justify-center items-center h-dvh bg-gray-100">
          <div className="flex flex-col items-center text-center p-6 rounded-lg shadow bg-white max-w-md">
            <svg
              className="w-16 h-16 text-blue-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Mobile-Only Access
            </h1>
            <p className="text-gray-600 mb-4">
              This application is designed for mobile devices. Please open it on
              your smartphone for the best experience.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
