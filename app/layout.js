

import ErrorHandler from './components/ErrorHandler';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dr. Smith Urology - Expert Urological Care & Consultations",
  description: "Dr. Smith is a board-certified urologist offering private consultations and specialized urological services. Book your appointment today.",
  keywords: "urologist, urology, private consultation, men's health, urological services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ErrorHandler>
          {children}
        </ErrorHandler>
      </body>
    </html>
  );
}