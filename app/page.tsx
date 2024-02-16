import Link from "next/link"

export default function Home() {
  return (
    <>
      <div className="mt-14 flex gap-10">
        <div className="bg-green-500 text-white p-2 rounded-md font-semibold">
          <Link href="/Frankfurterapi">Frankfurter Api</Link>
        </div>
        <div className="bg-green-500 text-white p-2 rounded-md font-semibold">
          <Link href="/Awesomeapi">Awesome Api</Link>
        </div>
      </div>
    </>
  )
}
