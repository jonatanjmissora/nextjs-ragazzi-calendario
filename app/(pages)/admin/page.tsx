import AdminList from '@/app/_components/Dashboard/03_Admin_Realizados/Admin_Realizado_'
import LeftAsideAdmin from '@/app/_components/LeftAside/LeftAside_Admin_'
import Skelton_Main_Table from '@/app/_components/Skeltons/Skelton_Main_Table'
import { getActualDateStr } from '@/app/_lib/utils/getActualDate'
import { getOneYearAgo } from '@/app/_lib/utils/getOneYearAgo'
import { Suspense } from 'react'

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const actualDate = getActualDateStr()
  const yearAgo = getActualDateStr(getOneYearAgo())

  const rubroFilter = (await searchParams)?.rubroFilter || "todos"
  const sectorFilter = (await searchParams)?.sectorFilter || "todos"
  const hastaFilter = (await searchParams)?.hastaFilter || actualDate
  const desdeFilter = (await searchParams)?.desdeFilter || yearAgo

  return (
    <section className="page">

      <LeftAsideAdmin desdeFilter={desdeFilter} hastaFilter={hastaFilter} rubroFilter={rubroFilter} sectorFilter={sectorFilter} />

      <Suspense fallback={<Skelton_Main_Table />} >
        <AdminList rubroFilter={rubroFilter} sectorFilter={sectorFilter} hastaFilter={hastaFilter} desdeFilter={desdeFilter} />
      </Suspense>

    </section>
  )
}
