import LeftAsidePendientes from '@/app/_components/LeftAside/LeftAside_Pendientes_';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import PendienteDesktopListContainer from '@/app/_components/Dashboard/01_Pendientes/Desktop/Pendiente_Desktop_List_Container';
import PendienteMovilListContainer from '@/app/_components/Dashboard/01_Pendientes/Movil/Pendiente_Movil_List_Container';
import SkeltonMainTableDesktop from '@/app/_components/Skeltons/Skelton_Main_Table_Desktop';
import SkeltonMainTableMovil from '@/app/_components/Skeltons/Skelton_Main_Table_Movil';
import SkeltonLeftAsidePend from '@/app/_components/Skeltons/Skelton_LeftAside_Pend';

export default async function PendientesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const viewport = (await cookies()).get("viewport")?.value

  return (
    <section className="page">

      <article className="leftAside flex flex-col gap-4 justify-center items-center overflow-hidden">
        <Suspense fallback={<SkeltonLeftAsidePend />}>
          <LeftAsidePendientes />
        </Suspense>
      </article>

      <article className="flex w-full flex-col justify-center items-center">
      {
        viewport === "desktop"
        ? (
            <Suspense fallback={<SkeltonMainTableDesktop />} >
              <PendienteDesktopListContainer rubroFilter={rubroFilter} />
            </Suspense>
          )

        : (
            <Suspense fallback={<SkeltonMainTableMovil />} >
              <PendienteMovilListContainer rubroFilter={rubroFilter} />
            </Suspense>
          )
      }
      </article>
      
    </section>
  );
}

