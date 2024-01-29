"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import ArrowLeft from "@/public/arrow-left.svg"
import Image from "next/image"

export default function OutraPagina() {
  const searchParams = useSearchParams()

  return (
    <>
      <div className="p-2">
        <h1>Resultado da Conversão</h1>
        {/*<p>{searchParams}</p>*/}
        <p className="mb-3">{parseFloat(searchParams).toFixed(2)}</p>
        <button className="bg-green-400 px-3 py-2 text-white rounded-md">
          <Link href="/" className="flex items-center">
            <Image src={ArrowLeft} alt="icon" className="h-5 w-5" /> Voltar
          </Link>
        </button>
      </div>
    </>
  )
}
