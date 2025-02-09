import "~/styles/globals.css"

import { CircleAlert, CircleCheck, CircleX, Info, Loader } from "lucide-react"
import { type Viewport, type Metadata } from "next"
import Script from "next/script"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "~/components/ui/sonner"
import { META_THEME_COLORS, siteConfig } from "~/config/site"
import { geistSans, iBM_Plex_Mono } from "~/lib/fonts"
import { cn } from "~/lib/utils"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "Shadcn UI",
    "T3 App",
    "Next Mdx remote",
    "Next.js MDX Blog",
  ],
  authors: [
    {
      name: "laidai",
      url: "https://laidai.xyz",
    },
  ],
  creator: "daire",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@laidai9966",
  },
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={"vi"}
      suppressHydrationWarning={true}
    >
      <Script id={"theme"}>
        {`
try {
  if (
    localStorage.theme === 'dark'
    || ((!('theme' in localStorage) || localStorage.theme === 'system')
      && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
  }
} catch (_) {}
        `}
      </Script>

      <body
        className={cn(
          "font-sans antialiased",
          geistSans.variable,
          // geistMono.variable,
          iBM_Plex_Mono.variable,
        )}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"dark"}
          disableTransitionOnChange={false}
          enableColorScheme={true}
          enableSystem={false}
        >
          <SessionProvider>
            <div vaul-drawer-wrapper={""}>
              <div
                className={"relative flex min-h-screen flex-col bg-background"}
              >
                {children}
              </div>
            </div>
          </SessionProvider>

          <Toaster
            icons={{
              error: <CircleX className={"size-4 text-error"} />,
              info: <Info className={"size-4 text-info"} />,
              loading: <Loader className={"size-4 animate-spin"} />,
              success: <CircleCheck className={"size-4 text-success"} />,
              warning: <CircleAlert className={"size-4 text-warning"} />,
            }}
            className={"pointer-events-auto"}
            closeButton={true}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
