import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProviderWrapper } from "@/components/auth/sessionProviderWrapper";
import { Header } from "@/components/layout/header";
import { PostProvider } from "@/context/PostContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Big Blog",
  description: "Explore our journey in web development and tech.",
  openGraph: {
    title: "The Big Blog",
    description:
      "Follow our journey and explore exciting articles on web development and tech.",
    url: "https://blog.stnb.dev",
    siteName: "The Big Blog",
    images: [
      {
        url: "https://blog.stnb.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogobigblog.c52a1167.png&w=256&q=75", // Replace with a real image
        width: 1200,
        height: 630,
        alt: "The Big Blog",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CategoryProvider>
          <PostProvider>
            <SessionProviderWrapper>
              <Header />
              {children}
              <Toaster />
            </SessionProviderWrapper>
          </PostProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
