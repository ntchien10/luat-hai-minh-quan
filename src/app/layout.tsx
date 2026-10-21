import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://luathaiminhquan.vn";
const IS_DEMO = process.env.NEXT_PUBLIC_IS_DEMO === "true";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A192F",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  referrer: "strict-origin-when-cross-origin",
  title: {
    default: "Công Ty Luật Uy Tín Tại Hà Nội | Luật Hải Minh Quân",
    template: "%s | Luật Hải Minh Quân",
  },
  description:
    "Công ty luật uy tín tại Hà Nội: tố tụng dân sự, hình sự, hành chính, tư vấn đầu tư, sở hữu trí tuệ, doanh nghiệp, kế toán thuế. Hotline 0967 932 555.",
  authors: [{ name: "Công Ty Luật TNHH Hải Minh Quân" }],
  creator: "Công Ty Luật TNHH Hải Minh Quân",
  publisher: "Công Ty Luật TNHH Hải Minh Quân",
  alternates: {
    canonical: "/",
  },
  robots: IS_DEMO
    ? {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    }
    : {
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
  openGraph: {
    title: "Công Ty Luật Uy Tín Tại Hà Nội | Luật Hải Minh Quân",
    description:
      "Công ty luật uy tín tại Hà Nội: tố tụng dân sự, hình sự, hành chính, tư vấn đầu tư, sở hữu trí tuệ, doanh nghiệp, kế toán thuế. Hotline 0967 932 555.",
    url: "/",
    siteName: "Công Ty Luật TNHH Hải Minh Quân",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/about/about-court.jpg",
        width: 1200,
        height: 630,
        alt: "Công Ty Luật TNHH Hải Minh Quân - Điểm tựa pháp lý vững chắc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Công Ty Luật Uy Tín Tại Hà Nội | Luật Hải Minh Quân",
    description:
      "Công ty luật uy tín tại Hà Nội: tố tụng dân sự, hình sự, hành chính, tư vấn đầu tư, sở hữu trí tuệ, doanh nghiệp, kế toán thuế. Hotline 0967 932 555.",
    images: ["/images/about/about-court.jpg"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

import { LegalServiceSchema } from "@/components/seo/JsonLd";
import { VisitTracker } from "@/components/common/VisitTracker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('selected_lang');if(!l){var m=document.cookie.match(/(?:^|;\\s*)googtrans=\\/(?:vi|auto)\\/([a-z]+)/);if(m&&m[1])l=m[1];}if(!l||['en','ja','ko','vi'].indexOf(l)===-1)l='vi';document.documentElement.setAttribute('data-lang',l);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-50 text-navy-900 font-sans selection:bg-gold-500 selection:text-white">
        <VisitTracker />
        <LegalServiceSchema />
        {children}
      </body>
    </html>
  );
}
