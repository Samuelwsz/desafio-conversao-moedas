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

  const [useDinheiro, setUseDinheiro] = useState(false) // Estado para controlar se o usuário selecionou "Dinheiro"
  const [useCartao, setUseCartao] = useState(false) // Estado para controlar se o usuário selecionou "Cartão"

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
      // Calculate the total value, including the state tax
      let total = dolarAmount * parseFloat(exchangeRates.USDBRL.bid)
      if (useDinheiro) {
        const impostoEstado = (total * taxaEstado) / 100
        const iofDinheiro = 1.1 / 100
        total = (total + impostoEstado) * (1 + iofDinheiro)
      } else if (useCartao) {
        // Adicione a lógica para "Cartão" aqui
        const impostoEstado = (total * taxaEstado) / 100
        const iofCartao = 6.4 / 100 // IOF de transações internacionais
        total = (total + impostoEstado) * (1 + iofCartao)
      } else {
        total += (total * (isNaN(taxaEstado) ? 0 : taxaEstado)) / 100
      }
      return total.toFixed(2)
    }
    return ""
  }

  const handleConvert = (event: FormEvent) => {
    event.preventDefault()

    const convertedAmount = convertToReal()
    setConvertedValue(convertedAmount)
    setDolarValue("")
    setTaxaEstado(0)
  }

  // Atualize a entrada do campo de taxa do estado para capturar seu valor
  const handleTaxaChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(event.target.value)
    if (isNaN(value) || value < 0) {
      value = 0 // Definindo como 0 se for NaN ou negativo
    }
    setTaxaEstado(value)
  }

  const handleDinheiroChange = () => {
    setUseDinheiro(!useDinheiro)
    if (useCartao) {
      setUseCartao(false) // Desativa a opção de "Cartão" se "Dinheiro" for selecionada
    }
  }

  const handleCartaoChange = () => {
    setUseCartao(!useCartao)
    if (useDinheiro) {
      setUseDinheiro(false) // Desativa a opção de "Dinheiro" se "Cartão" for selecionada
    }
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
            <div className="relative">
              <input
                type="number"
                id="taxa"
                placeholder="0"
                className="p-2 pr-10 w-full md:w-48 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={taxaEstado}
                onChange={handleTaxaChange}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-500">
                %
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h1>Tipo de Compra</h1>
          <div className="flex gap-3">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={useDinheiro}
                onChange={handleDinheiroChange}
              />
              <span className="ml-2">Dinheiro</span>
            </label>

            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={useCartao}
                onChange={handleCartaoChange}
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
