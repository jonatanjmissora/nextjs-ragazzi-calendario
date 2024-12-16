import PendienteEditForm from "@/app/_components/Dashboard/PendienteEditForm"
import { getPendienteByIdAction } from "@/app/_lib/actions/pendientes.action"
import { getSectoresReset } from "@/app/_lib/db/sectores.db"
import { PendienteType } from "@/app/_lib/schema/pendientes.type"

export default async function PendienteEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }>}) {

    const id = (await searchParams)?.id || ""
    const pendiente = await getPendienteByIdAction(id) as PendienteType
    const sectoresReset = await getSectoresReset()

  return (
    <PendienteEditForm pendiente={pendiente} sectoresReset={sectoresReset}/>
  )
}
