import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/commons/ClientProviders";

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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
