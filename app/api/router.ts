import axios from "axios"

const host = "api.frankfurter.app"

export async function converterMoeda(
  quantia: number | string,
  deMoeda: string,
  paraMoeda: string
) {
  try {
    const response = await axios.get(`https://${host}/latest`, {
      params: {
        amount: quantia,
        from: deMoeda,
        to: paraMoeda,
      },
    })

    return response.data.rates[paraMoeda]
  } catch (error) {
    console.error("Erro ao converter moeda:", error)
    return 0
  }
}
