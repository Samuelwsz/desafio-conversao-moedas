import ConvertIcon from "@/public/Convert.svg"
import Image from "next/image"

export default function DolarParaReal() {
  return (
    <main className="mt-14">
      <form action="">
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
          className="mt-5 bg-green-400 px-3 py-2 rounded-md text-white font-semibold flex items-center gap-2 cursor-pointer"
          disabled={true}
        >
          <Image src={ConvertIcon} alt="icon" /> Converter
        </button>
      </form>
    </main>
  )
}
