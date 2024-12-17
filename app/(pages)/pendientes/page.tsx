import { PagosTable } from '@/app/_components/Dashboard/PagosTable';
import PendientesList from '@/app/_components/Dashboard/PendientesList';
import LeftAsidePendientes from '@/app/_components/LeftAside/LeftAsidePendientes';
import { getCachedPendientes } from '@/app/_lib/db/pendientes.db';
import getUserFromCookie from '@/app/_lib/utils/getUserFromCookies';
import { redirect } from "next/navigation";
import { Suspense } from 'react';

export default async function PendientesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const rubroFilter = (await searchParams)?.rubroFilter || "todo"
  const pagosPendientes = await getCachedPendientes()
  const filteredPendientes = rubroFilter === "todo"
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

