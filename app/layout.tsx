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
        <div className="hidden sm:flex flex-col justify-center items-center h-dvh">
          <h1 className="text-center text-lg">
            Application is not accessiable, <br />
            Kindly check on Mobile
          </h1>
        </div>
      </body>
    </html>
  );
}
