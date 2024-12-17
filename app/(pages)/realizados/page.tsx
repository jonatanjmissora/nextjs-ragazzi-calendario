import { PagosTable } from "@/app/_components/Dashboard/PagosTable"
import RealizadosList from "@/app/_components/Dashboard/RealizadosList"
import LeftAsideRealizados from "@/app/_components/LeftAside/LeftAsideRealizados"
import { getCachedRealizados } from "@/app/_lib/db/realizados.db"
import { getFilteredRealizados } from "@/app/_lib/utils/getFilteredRealizados"
import { getLocaleDate } from "@/app/_lib/utils/getActualDate"
import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default async function RealizadosPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const [year, month] = getLocaleDate()
  const monthStr = (month + 1) < 10 ? "0" + (month + 1) : (month + 1).toString()
  const rubroFilter = (await searchParams)?.rubroFilter || "todo"
  const dateFilter = (await searchParams)?.dateFilter || year.toString() + "-" + monthStr

  const pagosRealizados = await getCachedRealizados()
  const filteredRealizados = getFilteredRealizados(pagosRealizados, dateFilter, rubroFilter)

  const tableHeader = ["histo", "vencimiento", "rubro", "sector", "monto", "pagado"]

  return (
    <section className="w-full main-height flex">

      <aside className='bg-slate-800 flex flex-col gap-4 justify-center items-center leftAside-width'>
        <Suspense fallback={<span className="loading loading-spinner text-primary"></span>} >
          <LeftAsideRealizados dateFilter={dateFilter} />
        </Suspense>
      </aside>

      <Suspense fallback={<p>Loading...Table Skelton</p>} >
        <PagosTable tableHeader={tableHeader}>
          <RealizadosList realizados={filteredRealizados} allRealizados={pagosRealizados} />
        </PagosTable>
      </Suspense>

    </section>
  );
}
