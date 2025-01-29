import { PagoType } from "@/app/_lib/schema/pago.type";
import PendienteListDesktop from "./Pendiente_List_Desktop";
import PendienteListMovil from "./Pendiente_List_Movil";

export default function PendientesList({ pendientes }: { pendientes: PagoType[] }) {

  if (pendientes.length === 0) return <div className="flex-1 flex justify-center items-center"><h1 className="text-center text-2xl">No hay pagos registrados...</h1></div>

  return (

    <>
      <PendienteListDesktop pendientes={pendientes} />
      <PendienteListMovil pendientes={pendientes} />
    </>

  )
}
