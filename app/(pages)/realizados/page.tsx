import { PagosTable } from "@/app/_components/Dashboard/PagosTable"
import RealizadosList from "@/app/_components/Dashboard/RealizadosList"
import LeftAsideRealizados from "@/app/_components/LeftAside/LeftAsideRealizados"
import { getCachedRealizados } from "@/app/_lib/db/realizados.db"
import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default async function RealizadosPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const rubroFilter = (await searchParams)?.rubroFilter || "todo"
  const pagosRealizados = await getCachedRealizados()
  const filteredRealizados = rubroFilter === "todo"
    ? pagosRealizados
    : pagosRealizados.filter(pago => pago.rubro === rubroFilter)

  const tableHeader = ["vencimiento", "rubro", "sector", "monto", "pagado"]

  return (
    <section className="w-full main-height flex">

      <aside className='bg-slate-800 flex flex-col gap-4 justify-center items-center leftAside-width'>
        <Suspense fallback={<p>Loading...Dashboard Skelton</p>} >
          <LeftAsideRealizados />
        </Suspense>
      </aside>

      <PagosTable tableHeader={tableHeader}>
        <RealizadosList realizados={filteredRealizados} />
      </PagosTable>

    </section>
  );
}
