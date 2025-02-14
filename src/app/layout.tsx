import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/authContext";
import { UserProvider } from "@/contexts/userContext";

// Font Configuration
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Roofr - Real Estate Platform",
  description:
    "Roofr is a modern real estate platform that helps you browse, buy, sell, and rent properties effortlessly.",
  keywords: "real estate, property, rent, buy, sell, Roofr, homes, listings",
  creator: "Shawaiz Khan",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <UserProvider>
            <NavBar />
            {children}
            <Footer />
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;