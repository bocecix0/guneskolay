import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GüneşKolay - Güneş Enerjisi Teklif Al | Doğrulanmış Firmalar",
    template: "%s | GüneşKolay",
  },
  description: "Güneş paneli yatırımında dolandırılma riskini azaltın. Doğrulanmış firmalardan ücretsiz teklif alın. Şeffaf süreç, gerçek teklifler.",
  keywords: [
    "güneş paneli teklif",
    "çatı güneş enerjisi",
    "güneş enerjisi firma doğrulama",
    "solar panel teklif",
    "güneş enerjisi kurulum",
    "ges teklif",
    "güneş paneli fiyat",
  ],
  authors: [{ name: "GüneşKolay" }],
  creator: "GüneşKolay",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "GüneşKolay",
    title: "GüneşKolay - Güneş Enerjisi Teklif Al",
    description: "Güneş paneli yatırımında dolandırılma riskini azaltın. Doğrulanmış firmalardan ücretsiz teklif alın.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GüneşKolay - Güneş Enerjisi Teklif Al",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GüneşKolay - Güneş Enerjisi Teklif Al",
    description: "Güneş paneli yatırımında dolandırılma riskini azaltın. Doğrulanmış firmalardan ücretsiz teklif alın.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://guneskolay.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
