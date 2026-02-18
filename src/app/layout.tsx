import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import SmoothScrolling from "@/components/providers/SmoothScrolling";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VertxSoft | Premium Digital Solutions",
  description: "Building secure, scalable, and high-quality digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
