import RealizadosList from "@/app/_components/Dashboard/Realizados/Realizados_List"
import LeftAsideRealizados from "@/app/_components/LeftAside/LeftAside_Realizados"
import { getFilteredPagos } from "@/app/_lib/utils/getFilteredPagos"
import { getLocaleDate } from "@/app/_lib/utils/getActualDate"
import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { getCachedRealizadosAction } from "@/app/_lib/actions/realizados.action"
import { PagoType } from "@/app/_lib/schema/pago.type"
import RightAside from "@/app/_components/RightAside/RightAside"
import Skelton_Main_Table from "@/app/_components/Skeltons/Skelton_Main_Table"

export default async function RealizadosPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const [year, month] = getLocaleDate()
  const monthStr = (month + 1) < 10 ? "0" + (month + 1) : (month + 1).toString()
  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const sectorFilter = (await searchParams)?.sectorFilter || "todos"
  const dateFilter = (await searchParams)?.dateFilter || year.toString() + "-" + monthStr

  const pagosRealizados = await getCachedRealizadosAction() as PagoType[]
  const filteredRealizados = getFilteredPagos(pagosRealizados, rubroFilter, sectorFilter, dateFilter) as PagoType[]



  return (
    <section className="w-full main-height flex justify-center item-center">

      <LeftAsideRealizados dateFilter={dateFilter} />

      <Suspense fallback={<Skelton_Main_Table />} >
        <RealizadosList realizados={filteredRealizados} allRealizados={pagosRealizados} />
      </Suspense>

      <RightAside />

    </section>
  );
}
