import "./globals.css";
import Wrapper from "./Wrapper";

export const metadata = {
  openGraph: {
    siteName: "Timeless Ticket Tales",
    images: [
      {
        title: "Timeless Ticket Tales",
        description: "",
        image: "/images/opengraph-image.jpg",
        url: "https://ttc-delta.vercel.app",
        alt: "",
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
        <meta property="og:title" content="Timeless Ticket Tales" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/opengraph-image.jpg" />
        <meta property="og:url" content="https://ttc-delta.vercel.app" />
      </head>
      <body className="min-h-dvh max-h-dvh flex justify-center items-center overflow-hidden">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
