import { IBM_Plex_Mono } from "next/font/google"
import localFont from "next/font/local"

// export const plus_jakarta_sans = Plus_Jakarta_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: "--font-plus-jakarta-sans"
// })

// export const jetBrains_Mono = JetBrains_Mono({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: "--font-jet-brains-mono"
// })

export const iBM_Plex_Mono = IBM_Plex_Mono({
  subsets: ["vietnamese"],
  display: "swap",
  variable: "--font-ibm-flex-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const geistSans = localFont({
  src: [
    {
      path: "../assets/fonts/geist/Geist-Thin.woff2",
      weight: "100",
    },
    {
      path: "../assets/fonts/geist/Geist-ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "../assets/fonts/geist/Geist-Light.woff2",
      weight: "300",
    },
    {
      path: "../assets/fonts/geist/Geist-Regular.woff2",
      weight: "400",
    },
    {
      path: "../assets/fonts/geist/Geist-Medium.woff2",
      weight: "500",
    },
    {
      path: "../assets/fonts/geist/Geist-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../assets/fonts/geist/Geist-Bold.woff2",
      weight: "700",
    },
    {
      path: "../assets/fonts/geist/Geist-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../assets/fonts/geist/Geist-Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-geist-sans",
})

// export const geistMono = localFont({
//   src: [
//     {
//       path: "../assets/fonts/geist/GeistMono-Thin.woff2",
//       weight: "100",
//     },
//     {
//       path: "../assets/fonts/geist/GeistMono-UltraLight.woff2",
//       weight: "200",
//     },
//     {
//       path: "../assets/fonts/geist/GeistMono-Light.woff2",
//       weight: "300",
//     },
//     {
//       path: "../assets/fonts/geist/GeistMono-Regular.woff2",
//       weight: "400",
//     },
//     {
//       path: "../assets/fonts/geist/GeistMono-Medium.woff2",
//       weight: "500",
//     },
//     {
//       path: "../assets/fonts/geist/GeistMono-SemiBold.woff2",
//       weight: "600",
//     },
//     {
//       path: "../assets/fonts/geist/GeistMono-Bold.woff2",
//       weight: "700",
//     },
//     {
//       path: "../assets/fonts/geist/GeistMono-Black.woff2",
//       weight: "800",
//     },
//     {
//       path: "../assets/fonts/geist/GeistMono-UltraBlack.woff2",
//       weight: "900",
//     },
//   ],
//   variable: "--font-geist-mono",
// })
