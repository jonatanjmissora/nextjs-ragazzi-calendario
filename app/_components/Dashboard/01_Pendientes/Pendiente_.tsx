import PendienteListDesktop from "./Pendiente_Desktop_List";
import PendienteListMovil from "./Pendiente_Movil_List";
import { cookies } from "next/headers";
import NoPays from "../NoPays";
import { getCachedPendientesAction } from "@/app/_lib/actions/pendientes.action";

export default async function PendientesList({ rubroFilter }: { rubroFilter: string }) {

  const viewport = (await cookies()).get("viewport")?.value

  const pagosPendientes = await getCachedPendientesAction()
  console.timeEnd("pendiente")
  const filteredPendientes = rubroFilter === "todos"
    ? pagosPendientes
    : pagosPendientes.filter(pago => pago.rubro === rubroFilter)

  if (filteredPendientes.length === 0) return <NoPays />

  return (

    <>
      {
        viewport === "desktop"
          ? <PendienteListDesktop pendientes={filteredPendientes} />
          : <PendienteListMovil pendientes={filteredPendientes} />
      }
    </>

  )
}
