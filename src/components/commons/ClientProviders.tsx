"use client";

import {
  defaultToaster,
  ToasterContext,
  ToasterProvider,
} from "@/contexts/ToasterContext";
import { cn } from "@/utils/cn";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { ReactNode, useContext, useEffect } from "react";
import Toaster from "../ui/Toaster/Toaster";
import { onTokenExpiredHandler } from "@/libs/axios/tokenHandler";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onTokenExpiredHandler(error);
        return false;
      },
    },
    mutations: {
      onError: onTokenExpiredHandler,
    },
  },
});

const ToasterWrapper = () => {
  const { toaster, setToaster } = useContext(ToasterContext);

  useEffect(() => {
    if (toaster.type !== "") {
      const timeout = setTimeout(() => {
        setToaster(defaultToaster);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [toaster]);

  if (toaster.type === "") return null;

  return <Toaster type={toaster.type} message={toaster.message} />;
};

const ClientProviders = ({ children }: { children: ReactNode }) => {
  const { toaster, setToaster } = useContext(ToasterContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToaster(defaultToaster);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [toaster]);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ToasterProvider>
            <main className={cn(geistSans.variable, geistMono.variable)}>
              {children}
              <ToasterWrapper />
            </main>
          </ToasterProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
