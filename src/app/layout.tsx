import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/utils/cn";
import { NextUIProvider } from "@nextui-org/react";
import ReactQueryClientProvider from "@/components/commons/ReactQueryClientProvider";

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

export const metadata: Metadata = {
  title: "Railvision",
  description: "MERN App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <NextUIProvider>
            <main
              className={
                (cn(geistSans.variable, geistMono.variable),
                "flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 antialiased lg:py-0")
              }
            >
              {children}
            </main>
          </NextUIProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
