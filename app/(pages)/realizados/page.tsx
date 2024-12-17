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

  const [year, month, day] = getLocaleDate()
  const rubroFilter = (await searchParams)?.rubroFilter || "todo"
  const yearFilter = Number((await searchParams)?.yearFilter || year)
  const monthFilter = Number((await searchParams)?.monthFilter || month) + 1
  const monthFilterStr = monthFilter < 10 ? "0" + monthFilter : monthFilter.toString()
  const yearMonthFilter = yearFilter.toString() + "-" + monthFilterStr

  const pagosRealizados = await getCachedRealizados()
  const filteredRealizados = getFilteredRealizados(pagosRealizados, yearMonthFilter, rubroFilter)

  const tableHeader = ["vencimiento", "rubro", "sector", "monto", "pagado"]

  return (
    <section className="w-full main-height flex">

      <aside className='bg-slate-800 flex flex-col gap-4 justify-center items-center leftAside-width'>
        <Suspense fallback={<p>Loading...Dashboard Skelton</p>} >
          <LeftAsideRealizados yearFilter={yearFilter} monthFilter={monthFilter} />
        </Suspense>
      </aside>

      <PagosTable tableHeader={tableHeader}>
        <RealizadosList realizados={filteredRealizados}/>
      </PagosTable>

    </section>
  );
}
