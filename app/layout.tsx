import { Geist, Geist_Mono, Newsreader, Crimson_Pro } from "next/font/google"; 
import "./globals.css";

// 1. The "Alpha" Journal Font (Default Serif)
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
});

// 2. The "MIT" Academic Font (Specific Use)
const crimson = Crimson_Pro({ 
  subsets: ["latin"],
  variable: '--font-crimson', 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} ${crimson.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}