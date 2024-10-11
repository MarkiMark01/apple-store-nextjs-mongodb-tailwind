import localFont from "next/font/local";
import "./globals.css";

import { AppProvider } from "../components/AppProvider";
import Header from "../components/pages/header/Header";
import Footer from "../components/pages/footer/Footer";
import { CartProvider } from "../components/context/CartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AppleStore",
  description: "A web application that allows users to browse, select, and purchase Apple products, featuring a user-friendly interface and secure authentication options.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      // className="min-h-screen flex flex-col"
      >
        <AppProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow mx-auto">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AppProvider>
      </body>
    </html>
  );
}
