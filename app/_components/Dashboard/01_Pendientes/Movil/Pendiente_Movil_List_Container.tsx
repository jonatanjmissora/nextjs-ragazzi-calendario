import { getCachedPendientesAction } from "@/app/_lib/actions/pendientes.action"
import NoPays from "../../NoPays"
import PendienteMovilList from "./Pendiente_Movil_List"

export default async function PendienteMovilListContainer({ rubroFilter }: { rubroFilter: string }) {

  const pagosPendientes = await getCachedPendientesAction()

  const filteredPendientes = rubroFilter === "todos"
    ? pagosPendientes
    : pagosPendientes.filter(pago => pago.rubro === rubroFilter)

  if (filteredPendientes.length === 0) return <NoPays />

  return (
    <>
      <PendienteMovilList pendientes={filteredPendientes} />
    </>
  )
}
