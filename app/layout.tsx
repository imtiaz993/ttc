import Script from "next/script";
import "./globals.css";
import Wrapper from "./Wrapper";

export const metadata = {
  openGraph: {
    url: "https://ttc-delta.vercel.app",
    type: "website",
    title: "Timeless Ticket Tales",
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
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-56BXRB5B');`}
        </Script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className="min-h-dvh max-h-dvh flex justify-center items-center overflow-hidden">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-56BXRB5B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
