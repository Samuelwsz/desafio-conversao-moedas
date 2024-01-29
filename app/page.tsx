import Header from "./components/Header"
import ConversaoTeste from "./components/ConversaoTeste"

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="px-16 pt-8">
          <Header />
          {/*<DolarParaReal />*/}
          <ConversaoTeste />
        </div>
      </div>
    </>
  )
}
