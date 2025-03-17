import LeftAsideRealizados from "@/app/_components/LeftAside/LeftAside_Realizados"
import { getLocaleDate } from "@/app/_lib/utils/getActualDate"
import { Suspense } from "react"
import RealizadoDesktopListContainer from "@/app/_components/Dashboard/02_Realizados/Desktop/Realizado_Desktop_List_Container"
import RealizadoMovilListContainer from "@/app/_components/Dashboard/02_Realizados/Movil/Realizado_Movil_List_Container"
import SkeltonDesktopMainTable from "@/app/_components/Skeltons/Desktop/Skelton_Desktop_Main_Table"
import SkeltonMovilMainTable from "@/app/_components/Skeltons/Movil/Skelton_Movil_Main_Table"

const desktopTableHeader = ["", "venc", "rubro", "sector", "monto", "accion"]
const movilTableHeader = ["venc", "rubro", "sector", "monto", "pag", ""]

export default async function RealizadosPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

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

        <div className="h-full hidden sm:block overflow-hidden">
          <Suspense key={dateFilter} fallback={<SkeltonDesktopMainTable desktopTableHeader={desktopTableHeader} />} >
            <RealizadoDesktopListContainer rubroFilter={rubroFilter} dateFilter={dateFilter} />
          </Suspense>
        </div>

        <div className='block sm:hidden'>
          <Suspense key={dateFilter} fallback={<SkeltonMovilMainTable movilTableHeader={movilTableHeader} />} >
            <RealizadoMovilListContainer rubroFilter={rubroFilter} dateFilter={dateFilter} />
          </Suspense>
        </div>

      </article>

    </section>
  );
}
