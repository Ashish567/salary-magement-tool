import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Salary Management Tool",
  description: "Foundational scaffold for salary management workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
