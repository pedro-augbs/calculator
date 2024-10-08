import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import "./globals.css";

const lexend = Lexend({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${lexend.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
