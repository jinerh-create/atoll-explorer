import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "MTH — Maldives Travel Hub",
    template: "%s | MTH",
  },
  description:
    "Explore 1,200 islands, pristine coral reefs, world-class dive sites, surf breaks, and luxury resorts in the Maldives. Your ultimate Maldives travel platform.",
  keywords: [
    "Maldives",
    "travel",
    "islands",
    "diving",
    "surfing",
    "luxury resorts",
    "liveaboard",
    "atoll",
    "snorkeling",
    "fishing",
    "Maldives tourism",
  ],
  authors: [{ name: "Maldives Travel Hub" }],
  creator: "Maldives Travel Hub",
  publisher: "Maldives Travel Hub",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MTH — Maldives Travel Hub",
    title: "MTH — Maldives Travel Hub",
    description:
      "Explore 1,200 islands, pristine coral reefs, and world-class experiences in the Maldives.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MTH — Maldives Travel Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MTH — Maldives Travel Hub",
    description: "Your ultimate guide to the Maldives islands.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-background text-text-base antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Providers>
            <Navbar />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <Footer />
            <MobileNav />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
