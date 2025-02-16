import PendienteEditFormContainer from "@/app/_components/Dashboard/01_Pendientes/Pendiente_EditForm_Container"
import SkeltonDesktopEditForm from "@/app/_components/Skeltons/Desktop/Skelton_Desktop_Edit_Form"
import { Suspense } from "react"

export default async function PendienteEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const id = (await searchParams)?.id || ""

  return (
    <section className="page justify-center items-center">

      <Suspense fallback={<SkeltonDesktopEditForm pagoType={"pendiente"} />}>
        <PendienteEditFormContainer id={id} />
      </Suspense>

    </section>
  )
}
