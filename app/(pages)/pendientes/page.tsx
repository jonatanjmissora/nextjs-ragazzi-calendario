import PendientesList from '@/app/_components/Dashboard/Pendientes/Pendiente_';
import LeftAsidePendientes from '@/app/_components/LeftAside/LeftAside_Pendientes_';
import { getCachedPendientesAction } from '@/app/_lib/actions/pendientes.action';
import { Suspense } from 'react';
import Skelton_Main_Table from '@/app/_components/Skeltons/Skelton_Main_Table';
import Skelton_LeftAside_Pend from '@/app/_components/Skeltons/Skelton_LeftAside_Pend';

export default async function PendientesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const pagosPendientes = await getCachedPendientesAction()
  const filteredPendientes = rubroFilter === "todos"
    ? pagosPendientes
    : pagosPendientes.filter(pago => pago.rubro === rubroFilter)

  return (
    <section className="main-page w-full main-height flex">

      <Suspense fallback={<Skelton_LeftAside_Pend />} >
        <LeftAsidePendientes />
      </Suspense>

      <Suspense fallback={<Skelton_Main_Table />} >
        <PendientesList pendientes={filteredPendientes} />
      </Suspense>

    </section>
  );
}

