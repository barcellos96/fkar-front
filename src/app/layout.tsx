import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { Providers } from "@/providers";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    <html className="text-zinc-600 bg-zinc-100" lang="pt">
      <head>
        {/* scripts google ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7813835594301178"
          crossOrigin="anonymous"
        ></script>
        {/* scripts google ads */}

        <meta
          name="google-adsense-account"
          content="ca-pub-7813835594301178"
        ></meta>

        <meta name="application-name" content="FKAR Gestão de Veículos" />
        <meta name="theme-color" content="#15803d" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-title" content="FKAR" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content="#15803d" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className={inter.className}>
          <Providers>{children}</Providers>
          <Toaster richColors />
        </div>
      </body>
      <GoogleAnalytics gaId="G-4KCQKL6MXK" />
    </html>
  );
}
