// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import TopBar from "@/components/Topbar";

export const metadata: Metadata = {
  title: "IEIC",
  description: "We trade globally — building connections, moving goods, and making business happen every day",
  keywords: "export, vegetables, Bangladesh, international trade, fresh produce",
  icons:{
    icon: "/public/images/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="min-h-screen"> {children} </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}