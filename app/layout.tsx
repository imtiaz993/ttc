import "./globals.css";
import Wrapper from "./Wrapper";

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
