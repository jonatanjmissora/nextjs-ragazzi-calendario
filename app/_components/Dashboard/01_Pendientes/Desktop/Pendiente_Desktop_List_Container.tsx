import { getCachedPendientesAction, getPendientesAction } from "@/app/_lib/actions/pendientes.action"
import NoPays from "../../NoPays"
import PendienteDesktopList from "./Pendiente_Desktop_List"

export default async function PendienteDesktopListContainer({ rubroFilter }: { rubroFilter: string }) {

const pagosPendientes = await getPendientesAction()
    
const filteredPendientes = rubroFilter === "todos"
? pagosPendientes
: pagosPendientes.filter(pago => pago.rubro === rubroFilter)

if (filteredPendientes.length === 0) return <NoPays />

  return (
    <>
        <PendienteDesktopList pendientes={filteredPendientes} />
    </>
  )
}
