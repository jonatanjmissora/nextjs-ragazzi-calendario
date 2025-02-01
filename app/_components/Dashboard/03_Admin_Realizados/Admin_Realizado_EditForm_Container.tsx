import { getRealizadoByIdAction } from "@/app/_lib/actions/realizados.action"
import { getCachedSectoresResetAction } from "@/app/_lib/actions/sectores.action"
import { PagoType } from "@/app/_lib/schema/pago.type"
import RealizadoEditForm from "./Admin_Realizado_EditForm"

export default async function RealizadoEditFormContainer({ id }: { id: string }) {

  const realizado = await getRealizadoByIdAction(id) as PagoType
  const sectoresReset = await getCachedSectoresResetAction()

  return (
    <RealizadoEditForm realizado={realizado} sectoresReset={sectoresReset} />
  )
}
