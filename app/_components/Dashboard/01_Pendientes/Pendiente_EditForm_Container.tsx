import { getPendienteByIdAction } from "@/app/_lib/actions/pendientes.action"
import PendienteEditForm from "./Pendiente_EditForm"
import { getCachedSectoresResetAction } from "@/app/_lib/actions/sectores.action"
import { PagoType } from "@/app/_lib/schema/pago.type"

export default async function PendienteEditFormContainer({ id }: { id: string }) {

  const pendiente = await getPendienteByIdAction(id) as PagoType
  const sectoresReset = await getCachedSectoresResetAction()

  return (
    <>
      <PendienteEditForm pendiente={pendiente} sectoresReset={sectoresReset} />
    </>
  )
}
