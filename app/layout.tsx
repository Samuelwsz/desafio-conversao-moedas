import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Image from "next/image"

import ImgHome from "@/public/Mask.png"
import Header from "./components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 relative min-h-screen px-16 pt-8`}
      >
        <Header />
        {children}
        {/*
          <Image
            src={ImgHome}
            alt="Imagem Responsiva"
            className="fixed bottom-0 right-0 max-w-full h-auto"
          />
  */}
      </body>
    </html>
  )
}
