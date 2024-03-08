"use client"

import { useSearchParams } from "next/navigation"

export default function ConversionResultPage() {
  const searchParams = useSearchParams()

  return (
    <div>
      <h1>Conversion Result</h1>
      <p>The conversion result is: {searchParams}</p>
    </div>
  )
}
