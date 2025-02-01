import LeftAsideRealizados from "@/app/_components/LeftAside/LeftAside_Realizados"
import { getLocaleDate } from "@/app/_lib/utils/getActualDate"
import { Suspense } from "react"
import Skelton_Main_Table from "@/app/_components/Skeltons/Skelton_Main_Table"
import RealizadoList from "@/app/_components/Dashboard/02_Realizados/Realizado_"

export default async function RealizadosPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const [year, month] = getLocaleDate()
  const monthStr = (month + 1) < 10 ? "0" + (month + 1) : (month + 1).toString()
  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const dateFilter = (await searchParams)?.dateFilter || year.toString() + "-" + monthStr

  return (
    <section className="page">

      <LeftAsideRealizados dateFilter={dateFilter} />

      <Suspense key={Math.random()} fallback={<Skelton_Main_Table />} >
        <RealizadoList rubroFilter={rubroFilter} dateFilter={dateFilter} />
      </Suspense>

    </section>
  );
}
