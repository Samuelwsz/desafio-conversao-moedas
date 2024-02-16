"use client"

import ConvertIcon from "@/public/Convert.svg"
import axios from "axios"
import Image from "next/image"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

interface ExchangeRates {
  USDBRL: {
    bid: string
    // outras propriedades, se houver
  }
  // outras moedas, se houver
}

export default function DolarParaReal() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null)
  const [dolarValue, setDolarValue] = useState("")
  const [convertedValue, setConvertedValue] = useState("")
  const [taxaEstado, setTaxaEstado] = useState(0)

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          "https://economia.awesomeapi.com.br/last/USD-BRL"
        )
        setExchangeRates(response.data)
      } catch (error) {
        console.error("Error fetching exchange rates:", error)
      }
    }

    fetchExchangeRates()
  }, [])

  const handleDolarChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDolarValue(event.target.value)
  }

  const convertToReal = () => {
    const dolarAmount = parseFloat(dolarValue)
    if (
      !isNaN(dolarAmount) &&
      exchangeRates &&
      exchangeRates.USDBRL &&
      exchangeRates.USDBRL.bid
    ) {
      // Calcula o valor total, incluindo a taxa do estado
      const total = dolarAmount * parseFloat(exchangeRates.USDBRL.bid)
      const valorComTaxa = total + (total * taxaEstado) / 100
      return valorComTaxa.toFixed(2)
    }
    return ""
  }

  const handleConvert = (event: FormEvent) => {
    event.preventDefault()

    const convertedAmount = convertToReal()
    setConvertedValue(convertedAmount)
    setDolarValue("")
  }

  // Atualize a entrada do campo de taxa do estado para capturar seu valor
  const handleTaxaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaxaEstado(parseFloat(event.target.value))
  }

  return (
    <main className="mt-5">
      <form>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="dolar" className="text-sm mb-1 text-gray-600">
              Dólar
            </label>
            <input
              type="number"
              id="dolar"
              placeholder="$ 1,00"
              className="p-2 w-full md:w-48 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={dolarValue}
              onChange={handleDolarChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="taxa" className="text-sm mb-1 text-gray-600">
              Taxa do Estado
            </label>
            <input
              type="number"
              id="taxa"
              placeholder="0 %"
              className="p-2 w-full md:w-48 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={taxaEstado}
              onChange={handleTaxaChange}
            />
          </div>
        </div>

        <div className="mt-5">
          <h1>Tipo de Compra</h1>
          <div className="flex gap-3">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Dinheiro</span>
            </label>

            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Cartão</span>
            </label>
          </div>
        </div>

        <button
          className={`mt-5 px-3 py-2 rounded-md text-white font-semibold flex items-center gap-2 cursor-pointer ${
            !dolarValue || parseFloat(dolarValue) <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-400 hover:bg-green-500"
          }`}
          onClick={handleConvert}
        >
          <Image src={ConvertIcon} alt="icon" /> Converter
        </button>
      </form>

      <div className="mt-3">
        {convertedValue && (
          <div className="mt-3">
            <p>R$ {convertedValue}</p>
          </div>
        )}
        {/*  <p>
          {convertedValue &&
            `${convertedValue} (+ ${taxaEstado}% de taxa do estado)`}
          </p>*/}
      </div>
    </main>
  )
}
