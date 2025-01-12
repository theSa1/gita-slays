import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import GithubIcon from "@/components/icons/github";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitaSlays",
  description:
    "Geeta For Gen Z | Slaying Life’s Challenges, One Verse at a Time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary`}
      >
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="%PUBLIC_URL%/favicon-96x96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href="%PUBLIC_URL%/favicon.svg"
          />
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="%PUBLIC_URL%/apple-touch-icon.png"
          />
          <link rel="manifest" href="%PUBLIC_URL%/site.webmanifest" />
        </Head>
        <div className="bg-background">
          <header className="bg-primary text-primary-foreground p-4">
            <Link href="/">
              <h1 className="text-2xl font-bold text-center">GitaSlays</h1>
            </Link>
          </header>
          <main className="max-w-screen-md mx-auto p-4 min-h-dvh">
            {children}
          </main>
          <footer className="bg-primary text-primary-foreground p-4 mt-8 flex items-center justify-center">
            <Link
              href="https://github.com/thesa1/gita-slays"
              className="text-center flex gap-2 items-center"
            >
              <GithubIcon className="h-5 text-white" /> View on GitHub
            </Link>
          </footer>
        </div>
      </body>
      <GoogleAnalytics gaId="G-8DGSST07RX" />
    </html>
  );
}
