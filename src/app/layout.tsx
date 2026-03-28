
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';

const CHAMMY_LOGO_DATA_URI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj4KICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0iIzNkMjA1NSIvPgogIDxwYXRoIGQ9Ik0xMiAyMiBRIDIwIDEwIDI4IDIyIFEgMjAgMzQgMTIgMjIiIGZpbGw9IiNlOGEwYjQiLz4KICA8Y2lyY2xlIGN4PSIxNyIgY3k9IjE5IiByPSIxLjUiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iMjMiIGN5PSIxOSIgcj0iMS41IiBmaWxsPSJ3aGl0ZSIvPgogIDxwYXRoIGQ9Ik0xOCAyNSBRIDIwIDI3IDIyIDI1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=";

export const metadata: Metadata = {
  title: "QTeaCake",
  description: 'Discover authentic tea shops and personalized recommendations.',
  manifest: '/manifest.json',
  icons: {
    icon: CHAMMY_LOGO_DATA_URI,
    apple: CHAMMY_LOGO_DATA_URI,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="QTeaCake" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QTeaCake" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3d2055" />

        <link rel="apple-touch-icon" href={CHAMMY_LOGO_DATA_URI} />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
