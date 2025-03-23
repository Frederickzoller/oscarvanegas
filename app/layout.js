

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
  title: "UMI Urologia - Atencion y Consultas Urologicas",
  description: "Nuestra asociación de urólogos certificados ofrece consultas privadas y servicios especializados. Agenda tu cita hoy.",
  keywords: "Urólogo, urología, consulta privada, salud masculina, servicios urológicos.",
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