import "./globals.css";
import Wrapper from "./Wrapper";

export const metadata = {
  openGraph: {
    url: "https://ttc-delta.vercel.app",
    type: "website",
    images: [
      {
        url: `https://ttc-delta.vercel.app/opengraph-image.jpg`, // Absolute URL
        width: 1200,
        height: 630,
        alt: "Website OG Image", // Add a descriptive alt text
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className="min-h-dvh max-h-dvh flex justify-center items-center overflow-hidden">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
