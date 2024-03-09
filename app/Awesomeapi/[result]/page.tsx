"use client"

import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ConversionResultPage() {
  const searchParams = useSearchParams()

  return (
    <div>
      <h1>Resultado da conversão: R${searchParams}</h1>

      <Button className="my-3">
        <Link
          href={"/Awesomeapi"}
          className="flex justify-center items-center gap-1 text-base"
        >
          <MoveLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>
    </div>
  )
}
