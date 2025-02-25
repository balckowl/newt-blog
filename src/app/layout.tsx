import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL!),
  title: {
    default: 'ふむふむ.com',
    template: `%s | ふむふむ.com`,
  },
  description: 'スキマ時間にサクッと読めて、『ふむふむ』と納得。ちょっとためになる情報メディア',
  openGraph: {
    title: {
      default: 'ふむふむ.com',
      template: `%s | ふむふむ.com`,
    },
    description: 'スキマ時間にサクッと読めて、『ふむふむ』と納得。ちょっとためになる情報メディア',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJp.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
