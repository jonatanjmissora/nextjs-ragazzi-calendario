import LeftAsideRealizados from "@/app/_components/LeftAside/LeftAside_Realizados"
import { getLocaleDate } from "@/app/_lib/utils/getActualDate"
import { Suspense } from "react"
import { cookies } from "next/headers"
import RealizadoDesktopListContainer from "@/app/_components/Dashboard/02_Realizados/Desktop/Realizado_Desktop_List_Container"
import RealizadoMovilListContainer from "@/app/_components/Dashboard/02_Realizados/Movil/Realizado_Movil_List_Container"
import SkeltonRealDesktopMainTable from "@/app/_components/Skeltons/Skelton_Real_Desktop_Main_Table"
import SkeltonRealMovilMainTable from "@/app/_components/Skeltons/Skelton_Real_Movil_Main_Table"

export default async function RealizadosPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const viewport = (await cookies()).get("viewport")?.value
  const [year, month] = getLocaleDate()
  const monthStr = (month + 1) < 10 ? "0" + (month + 1) : (month + 1).toString()
  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const dateFilter = (await searchParams)?.dateFilter || year.toString() + "-" + monthStr

  return (
    <section className="page">

      <aside className='leftAside flex flex-col justify-center items-center gap-4'>
        <LeftAsideRealizados dateFilter={dateFilter} />
      </aside>

      <article className="w-full sm:flex flex-col justify-center items-center">
        {
          viewport === "desktop"
          ? (
              <Suspense key={dateFilter} fallback={<SkeltonRealDesktopMainTable />} >
                <RealizadoDesktopListContainer rubroFilter={rubroFilter} dateFilter={dateFilter} />
              </Suspense>
            )
          : (
              <Suspense key={dateFilter} fallback={<SkeltonRealMovilMainTable />} >
                <RealizadoMovilListContainer rubroFilter={rubroFilter} dateFilter={dateFilter} />
              </Suspense>
            )
        }
      </article>
      
    </section>
  );
}
