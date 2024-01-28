"use client"

import Image from "next/image"
import logo from "@/public/Main Logo.svg"
import { useEffect, useState } from "react"

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000) // Atualiza a cada segundo

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId)
  }, []) // Executa apenas uma vez ao montar o componente

  const Day = currentDateTime.toLocaleString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const Hour = currentDateTime.toLocaleString("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  })

  return (
    <header className="block items-center gap-5 lg:flex md:flex">
      <Image src={logo} alt="logo" width={150} height={150} priority />
      <div>
        {Day} | {Hour}
        <p>Dados de cambio disponibilizados pela morningstar</p>
      </div>
    </header>
  )
}
