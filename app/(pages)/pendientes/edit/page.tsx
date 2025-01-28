import PendienteEditForm from "@/app/_components/Dashboard/Pendientes/Pendiente_EditForm"
import { getPendienteByIdAction } from "@/app/_lib/actions/pendientes.action"
import { getCachedSectoresResetAction } from "@/app/_lib/actions/sectores.action"
import { PagoType } from "@/app/_lib/schema/pago.type"

export default async function PendienteEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  // const user = await getUserFromCookie()
  // if (!user) redirect("/")

  const id = (await searchParams)?.id || ""
  const pendiente = await getPendienteByIdAction(id) as PagoType
  const sectoresReset = await getCachedSectoresResetAction()

  return (
    <section className="page justify-center items-center">
      <PendienteEditForm pendiente={pendiente} sectoresReset={sectoresReset} />
    </section>
  )
}
