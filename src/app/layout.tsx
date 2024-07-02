import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { Providers } from "@/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="text-zinc-600 bg-zinc-100" lang="en">
      <head>
        <meta name="application-name" content="FKAR Gestão de Veículos" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-title" content="FKAR" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#15803d" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="FKAR Gestão de Veículos"
        />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="FKAR" />
        <meta property="og:site_name" content="FKAR Gestão de Veículos" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className={inter.className}>
          <Providers>{children}</Providers>
          <Toaster richColors />
        </div>
      </body>
    </html>
  );
}
