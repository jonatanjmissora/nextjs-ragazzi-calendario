import { PagoType } from "@/app/_lib/schema/pago.type";
import PendienteListDesktop from "./Pendiente_Desktop_List";
import PendienteListMovil from "./Pendiente_Movil_List";
import { cookies } from "next/headers";

export default async function PendientesList({ pendientes }: { pendientes: PagoType[] }) {

  const viewport = (await cookies()).get("viewport")?.value

  if (pendientes.length === 0) return <div className="flex-1 flex justify-center items-center"><h1 className="text-center      ">No hay pagos registrados...</h1></div>

  return (

    <>
      {
        viewport === "desktop"
          ? <PendienteListDesktop pendientes={pendientes} />
          : <PendienteListMovil pendientes={pendientes} />
      }
    </>

  )
}
