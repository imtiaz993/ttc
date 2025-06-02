import "./globals.css";
import Wrapper from "./Wrapper";

export const metadata = {
  openGraph: {
    siteName: "Timeless Ticket Tales",
    images: [
      {
        title: "Timeless Ticket Tales",
        description: "",
        width: 1200,
        height: 630,
        url: "https://ttc-delta.vercel.app/opengraph-image.jpg",
        alt: "Timeless Ticket Tales Image",
      },
    ],
    locale: "en_US",
    type: "website",
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
