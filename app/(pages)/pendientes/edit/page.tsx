import PendienteEditForm from "@/app/_components/Dashboard/Pendiente_EditForm"
import { getPendienteByIdAction } from "@/app/_lib/actions/pendientes.action"
import { getCachedSectoresResetAction } from "@/app/_lib/actions/sectores.action"
import { PagoType } from "@/app/_lib/schema/pago.type"
import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies"
import { redirect } from "next/navigation"

export default async function PendienteEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const id = (await searchParams)?.id || ""
  const pendiente = await getPendienteByIdAction(id) as PagoType
  const sectoresReset = await getCachedSectoresResetAction()

  return (
    <section className="w-full main-height flex justify-center items-center">
      <PendienteEditForm pendiente={pendiente} sectoresReset={sectoresReset} />
    </section>
  )
}
