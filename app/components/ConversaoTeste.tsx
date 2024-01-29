"use client"

import Image from "next/image"
import { useState } from "react"
import ConvertIcon from "@/public/Convert.svg"
import { converterMoeda } from "../api/router"
import { useRouter } from "next/navigation"

export default function ConversaoTeste() {
  const [quantia, setQuantia] = useState<number | string>("")
  const [deMoeda, setDeMoeda] = useState("BRL")
  const [paraMoeda, setParaMoeda] = useState("USD")

  // const [resultado, setResultado] = useState(0)

  const router = useRouter()

  async function handleConverterMoeda() {
    const convertedResult = await converterMoeda(quantia, deMoeda, paraMoeda)
    setQuantia("")
    // setResultado(convertedResult)

    // Criar a query string com o resultado da conversão
    const queryString = `${convertedResult}`

    // Construir o URL para a próxima página com a query string
    const url = `/ResultadoConversao?${queryString}`

    // Navegar para a próxima página usando o componente Link
    router.push(url)
  }

  return (
    <main className="mt-14">
      <div className="flex flex-col">
        <label htmlFor="dolar" className="text-lg mb-1 text-gray-600">
          Quantia
        </label>
        <input
          type="number"
          placeholder="$ 1,00"
          value={quantia}
          onChange={(e) => {
            const inputValue = parseFloat(e.target.value)
            setQuantia(isNaN(inputValue) ? "" : inputValue)
          }}
          className="p-2 w-48 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={deMoeda}
          onChange={(e) => setDeMoeda(e.target.value)}
          className="p-2 mt-2 w-full md:w-48 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="USD" className="py-2">
            DOLAR
          </option>
          <option value="BRL" className="py-2">
            REAL
          </option>
          <option value="EUR" className="py-2">
            EURO
          </option>
        </select>

        <select
          value={paraMoeda}
          onChange={(e) => setParaMoeda(e.target.value)}
          className="p-2 mt-2 w-full md:w-48 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="USD" className="py-2">
            DOLAR
          </option>
          <option value="BRL" className="py-2">
            REAL
          </option>
          <option value="EUR" className="py-2">
            EURO
          </option>
        </select>
      </div>

      <button
        className={`mt-5 px-3 py-2 rounded-md text-white font-semibold flex items-center gap-2 cursor-pointer ${
          !quantia ||
          parseFloat(quantia as string) <= 0 ||
          deMoeda === paraMoeda
            ? "bg-gray-400 cursor-default"
            : "bg-green-400 hover:bg-green-500"
        }`}
        onClick={() => handleConverterMoeda()}
        disabled={
          !quantia ||
          parseFloat(quantia as string) <= 0 ||
          deMoeda === paraMoeda
        }
      >
        <Image src={ConvertIcon} alt="icon" /> Converter
      </button>

      {/*<div className="mt-3">{resultado.toFixed(2)}</div>*/}
    </main>
  )
}
