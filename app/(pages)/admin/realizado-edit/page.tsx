import RealizadoEditFormContainer from '@/app/_components/Dashboard/03_Admin_Realizados/Admin_Realizado_EditForm_Container'
import Loading from '@/app/loading'
import { Suspense } from 'react'

export default async function RealizadosEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const id = (await searchParams)?.id || ""

  return (
    <section className="page justify-center items-center">

      <Suspense fallback={<Loading />}>
        <RealizadoEditFormContainer id={id} />
      </Suspense>

    </section>
  )
}
