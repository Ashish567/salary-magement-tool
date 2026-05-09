import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Salary Management Tool",
  description: "Foundational scaffold for salary management workflows",
};

import { Navbar } from "@/components/Navbar";

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-full font-sans flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto">{children}</div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
