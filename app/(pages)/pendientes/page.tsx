import { PagosTable } from '@/app/_components/Dashboard/Pagos_Table';
import PendientesList from '@/app/_components/Dashboard/Pendientes/Pendientes_List';
import LeftAsidePendientes from '@/app/_components/LeftAside/LeftAside_Pendientes';
import { getCachedPendientesAction } from '@/app/_lib/actions/pendientes.action';
import getUserFromCookie from '@/app/_lib/utils/getUserFromCookies';
import { redirect } from "next/navigation";
import { Suspense } from 'react';

export default async function PendientesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const pagosPendientes = await getCachedPendientesAction()
  const filteredPendientes = rubroFilter === "todos"
    ? pagosPendientes
    : pagosPendientes.filter(pago => pago.rubro === rubroFilter)

  const tableHeader = ["vencimiento", "rubro", "sector", "monto", "accion"]

  return (
    <section className="w-full main-height flex">

      <aside className='bg-slate-800 flex flex-col gap-4 justify-center items-center leftAside-width'>
        <Suspense fallback={<span className="loading loading-spinner text-primary"></span>} >
          <LeftAsidePendientes />
        </Suspense>
      </aside>

      <PagosTable tableHeader={tableHeader}>
        <PendientesList pendientes={filteredPendientes} />
      </PagosTable>

    </section>
  );
}

