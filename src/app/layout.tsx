import type { Metadata } from "next"
import { geistSans, iBM_Plex_Mono } from "~/lib/fonts"
import "~/styles/globals.css"
import { ThemeProvider } from "next-themes"
import Script from "next/script"
import { META_THEME_COLORS } from "~/config/site"
import { Toaster } from "~/components/ui/sonner"
import { CircleAlert, CircleCheck, CircleX, Info, Loader } from "lucide-react"
import { SelectionTextPopover } from "~/components/selection-text-popover"
import { GridContainer } from "~/components/grid-container"
import { SiteFooter } from "~/components/site-footer"
import { SiteHeader } from "~/components/site-header"

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

const themeScript = String.raw`
try {
  if (
    localStorage.theme === 'dark'
    || ((!('theme' in localStorage) || localStorage.theme === 'system')
      && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
  }
} catch (_) {}
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${iBM_Plex_Mono.variable} antialiased`}
      suppressHydrationWarning>
      <head>
        <Script
          id={"theme"}
          src={`data:text/javascript;base64,${btoa(themeScript)}`}
        />
      </head>

      <body>
        <ThemeProvider
          defaultTheme={"dark"}
          enableSystem
          enableColorScheme
          disableTransitionOnChange={false}
          attribute="class">
          <div vaul-drawer-wrapper={""}>
            <div
              className={
                "relative isolate flex min-h-screen flex-col bg-background"
              }>
              <div className="max-w-screen overflow-x-hidden pt-14">
                <GridContainer className="fixed inset-x-0 top-0 z-50 bg-background">
                  <SiteHeader className="mx-auto h-14 max-w-7xl border-dashed xl:border-x" />
                </GridContainer>

                {children}

                <GridContainer>
                  <SiteFooter className="mx-auto max-w-7xl border-dashed xl:border-x" />
                </GridContainer>
              </div>
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

          <SelectionTextPopover />
        </ThemeProvider>
      </body>
    </html>
  )
}
