import RealizadosList from "@/app/_components/Dashboard/Realizados/Realizados_List"
import LeftAsideRealizados from "@/app/_components/LeftAside/LeftAside_Realizados"
import { getFilteredPagos } from "@/app/_lib/utils/getFilteredPagos"
import { getLocaleDate } from "@/app/_lib/utils/getActualDate"
import { Suspense } from "react"
import { getCachedRealizadosAction } from "@/app/_lib/actions/realizados.action"
import { PagoType } from "@/app/_lib/schema/pago.type"
import Skelton_Main_Table from "@/app/_components/Skeltons/Skelton_Main_Table"

export default async function RealizadosPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const [year, month] = getLocaleDate()
  const monthStr = (month + 1) < 10 ? "0" + (month + 1) : (month + 1).toString()
  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const sectorFilter = (await searchParams)?.sectorFilter || "todos"
  const dateFilter = (await searchParams)?.dateFilter || year.toString() + "-" + monthStr

  const pagosRealizados = await getCachedRealizadosAction() as PagoType[]
  const filteredRealizados = getFilteredPagos(pagosRealizados, rubroFilter, sectorFilter, dateFilter) as PagoType[]



  return (
    <section className="main-page w-full main-height flex">

      <LeftAsideRealizados dateFilter={dateFilter} />

      <Suspense fallback={<Skelton_Main_Table />} >
        <RealizadosList realizados={filteredRealizados} allRealizados={pagosRealizados} />
      </Suspense>

    </section>
  );
}
