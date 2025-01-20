import AdminList from '@/app/_components/Dashboard/Admin_Realizados/Realizado_'
import { PagosTable } from '@/app/_components/Dashboard/Pagos_Table'
import LeftAsideAdmin from '@/app/_components/LeftAside/LeftAside_Admin_'
import { getCachedRealizadosAction } from '@/app/_lib/actions/realizados.action'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { getActualDateStr } from '@/app/_lib/utils/getActualDate'
import { getFilteredPagos } from '@/app/_lib/utils/getFilteredPagos'
import { getOneYearAgo } from '@/app/_lib/utils/getOneYearAgo'
import getUserFromCookie from '@/app/_lib/utils/getUserFromCookies'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const actualDate = getActualDateStr()
  const yearAgo = getActualDateStr(getOneYearAgo())

  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const sectorFilter = (await searchParams)?.sectorFilter || "todos"
  const hastaFilter = (await searchParams)?.hastaFilter || actualDate
  const desdeFilter = (await searchParams)?.desdeFilter || yearAgo

  const pagosRealizados = await getCachedRealizadosAction()
  const filteredRealizados = getFilteredPagos(pagosRealizados, rubroFilter, sectorFilter, undefined, hastaFilter, desdeFilter) as PagoType[]

  const tableHeader = ["vencimiento", "rubro", "sector", "monto", "pagado", "edit"]

  return (
    <section className="w-full main-height flex justify-center item-center">

      <Suspense fallback={<span className="loading loading-spinner text-primary"></span>} >
        <LeftAsideAdmin desdeFilter={desdeFilter} hastaFilter={hastaFilter} rubroFilter={rubroFilter} sectorFilter={sectorFilter} />
      </Suspense>

      <Suspense fallback={<span className="loading loading-spinner text-primary"></span>} >
        <PagosTable tableHeader={tableHeader}>
          <AdminList realizados={filteredRealizados} />
        </PagosTable>
      </Suspense>

    </section>
  )
}
