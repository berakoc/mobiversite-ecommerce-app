import { Geist, Geist_Mono, Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "../lib/queryProvider";
import { MobileLayout } from "../ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mobiversite ECommerce App",
  description: "An eCommerce application built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${roboto.variable} ${robotoMono.variable} ${roboto.className} antialiased`}
      >
        <QueryProvider>
          <MobileLayout>{children}</MobileLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
