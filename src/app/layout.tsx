import type { Metadata } from "next"
import { geistSans, iBM_Plex_Mono } from "~/lib/fonts"
import "~/styles/globals.css"
import { ThemeProvider } from "~/components/theme-provider"
import Script from "next/script"
import { META_THEME_COLORS } from "~/config/site"
import { Toaster } from "~/components/ui/sonner"
import { CircleAlert, CircleCheck, CircleX, Info, Loader } from "lucide-react"
import { AppInitializer } from "~/components/app-initializer"
import { env } from "~/env"
import AppProviders from "~/components/app-providers"
import { auth } from "~/server/auth"

export const metadata: Metadata = {
  metadataBase: new URL("https://laidai.xyz"),
  title: {
    default: "Lai Cao Dai - Portfolio",
    template: `%s · Lai Cao Dai`,
  },
  description: "Frontend developer",
  keywords: ["Portfolio", "Next.js MDX Blog"],
  authors: [
    {
      name: "laidai",
      url: "https://laidai.xyz",
    },
  ],
  creator: "daire",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${iBM_Plex_Mono.variable} antialiased`}
      suppressHydrationWarning>
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

      <body>
        <ThemeProvider
          storageKey="theme"
          defaultTheme={"dark"}
          enableSystem
          enableColorScheme
          disableTransitionOnChange={false}
          attribute="class"
          themes={["light", "dark", "system"]}>
          <AppInitializer
            suffixDefaultAccessKey={env.SUFFIX_DEFAULT_ACCESS_KEY}>
            <AppProviders session={session}>
              <div vaul-drawer-wrapper={""}>
                <div
                  className={
                    "relative isolate flex min-h-screen flex-col bg-background"
                  }>
                  {children}
                </div>
              </div>

              <Toaster
                icons={{
                  error: <CircleX className={"text-error size-4"} />,
                  info: <Info className={"text-info size-4"} />,
                  loading: <Loader className={"size-4 animate-spin"} />,
                  success: <CircleCheck className={"text-success size-4"} />,
                  warning: <CircleAlert className={"text-warning size-4"} />,
                }}
                className={"pointer-events-auto"}
                closeButton={true}
              />
            </AppProviders>
          </AppInitializer>
        </ThemeProvider>
      </body>
    </html>
  )
}
