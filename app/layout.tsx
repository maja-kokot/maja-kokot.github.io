import { Geist, Geist_Mono, Newsreader, Crimson_Pro } from "next/font/google"; 
import "./globals.css";
import type { Metadata } from "next";

import { GoogleAnalytics } from '@next/third-parties/google';

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
});


const crimson = Crimson_Pro({ 
  subsets: ["latin"],
  variable: '--font-crimson', 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maja Kokot",
  description: "Personal website of Maja Kokot, Computer Science student at Trinity College, Cambridge.",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} ${crimson.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>

      <GoogleAnalytics gaId="G-KH95PGMVVB" />
      
    </html>
  );
}

