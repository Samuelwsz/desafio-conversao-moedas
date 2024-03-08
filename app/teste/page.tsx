"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { converterMoeda } from "../api/router"
import { useRouter } from "next/navigation"

const moedas = [
  { value: "USD", label: "DOLAR" },
  { value: "BRL", label: "REAL" },
  { value: "EUR", label: "EURO" },
  { value: "JPY", label: "YEN JAPONÊS" },
  { value: "CNY", label: "YUAN CHiNÊS" },
  { value: "INR", label: "RUPEE" },
]

export default function ConversaoTeste() {
  const [quantia, setQuantia] = useState<number | string>("")
  const [deMoeda, setDeMoeda] = useState("BRL")
  const [paraMoeda, setParaMoeda] = useState("USD")

  const [resultado, setResultado] = useState<number | undefined>(undefined)

  const router = useRouter()

  async function handleConverterMoeda() {
    const convertedResult = await converterMoeda(quantia, deMoeda, paraMoeda)
    setQuantia("")
    setResultado(convertedResult)

    // Navigate to the new page with the conversion result as a query parameter
    router.push(`/teste/result?=${convertedResult.toFixed(2)}`)
  }

  return (
    <main className="mt-14">
      <div className="flex flex-col">
        <label
          htmlFor="dolar"
          className="text-lg mb-1 text-gray-600 dark:text-white"
        >
          Quantia
        </label>
        <Input
          type="number"
          placeholder="$ 1,00"
          value={quantia}
          onChange={(e) => {
            const inputValue = parseFloat(e.target.value)
            setQuantia(isNaN(inputValue) ? "" : inputValue)
          }}
          className="p-2 w-48 border dark:border-gray-300"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={deMoeda}
          onChange={(e) => setDeMoeda(e.target.value)}
          className="p-2 mt-2 w-full md:w-48 border border-gray-300 rounded outline-none dark:bg-black"
        >
          {moedas.map((moeda) => (
            <option key={moeda.value} value={moeda.value} className="py-2">
              {moeda.label}
            </option>
          ))}
        </select>

        <select
          value={paraMoeda}
          onChange={(e) => setParaMoeda(e.target.value)}
          className="p-2 mt-2 w-full md:w-48 border border-gray-300 rounded outline-none dark:bg-black"
        >
          {moedas.map((moeda) => (
            <option key={moeda.value} value={moeda.value} className="py-2">
              {moeda.label}
            </option>
          ))}
        </select>
      </div>

      <Button className="my-3" onClick={handleConverterMoeda}>
        Ir para página com resultado
      </Button>

      <div className="mt-3">
        <p>{resultado?.toFixed(2)}</p>
      </div>
    </main>
  )
}
