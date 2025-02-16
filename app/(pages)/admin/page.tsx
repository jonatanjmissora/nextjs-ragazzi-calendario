import AdminRealizadoDesktopListContainer from '@/app/_components/Dashboard/03_Admin_Realizados/Desktop/Admin_Realizado_Desktop_List_Container'
import AdminRealizadoMovilListContainer from '@/app/_components/Dashboard/03_Admin_Realizados/Movil/Admin_Realizado_Movil_List_Container'
import LeftAsideAdmin from '@/app/_components/LeftAside/LeftAside_Admin_'
import SkeltonAdminDesktopMainTable from '@/app/_components/Skeltons/Desktop/Skelton_Admin_Desktop_Main_Table'
import SkeltonAdminMovilMainTable from '@/app/_components/Skeltons/Movil/Skelton_Admin_Movil_Main_Table'
import SkeltonPendDesktopMainTable from '@/app/_components/Skeltons/Desktop/Skelton_Desktop_Main_Table'
import { getActualDateStr } from '@/app/_lib/utils/getActualDate'
import { getOneYearAgo } from '@/app/_lib/utils/getOneYearAgo'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

const desktopTableHeader = ["venc", "rubro", "sector", "monto", "pagado", "accion"]

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const viewport = (await cookies()).get("viewport")?.value
  const actualDate = getActualDateStr()
  const yearAgo = getActualDateStr(getOneYearAgo())

  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const sectorFilter = (await searchParams)?.sectorFilter || "todos"
  const hastaFilter = (await searchParams)?.hastaFilter || actualDate
  const desdeFilter = (await searchParams)?.desdeFilter || yearAgo

  return (
    <section className="page">

      <aside className='leftAside flex flex-col justify-center items-center gap-4'> 
        <LeftAsideAdmin desdeFilter={desdeFilter} hastaFilter={hastaFilter} rubroFilter={rubroFilter} sectorFilter={sectorFilter} />
      </aside>

      <article className="w-full sm:flex flex-col justify-center items-center">
        {
          viewport === "desktop"
          ? (
              <Suspense key={Math.random()} fallback={<SkeltonAdminDesktopMainTable desktopTableHeader={desktopTableHeader} />} >
                <AdminRealizadoDesktopListContainer
                  rubroFilter={rubroFilter} 
                  sectorFilter={sectorFilter} 
                  hastaFilter={hastaFilter} 
                  desdeFilter={desdeFilter} 
                />
              </Suspense>
            )
          : (
              <Suspense key={Math.random()} fallback={<SkeltonAdminMovilMainTable />} >
                <AdminRealizadoMovilListContainer 
                  rubroFilter={rubroFilter} 
                  sectorFilter={sectorFilter} 
                  hastaFilter={hastaFilter} 
                  desdeFilter={desdeFilter} 
                />
              </Suspense>
            )
        }
      </article>

    </section>
  )
}
