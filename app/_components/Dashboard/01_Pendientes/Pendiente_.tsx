import { PagoType } from "@/app/_lib/schema/pago.type";
import PendienteListDesktop from "./Pendiente_Desktop_List";
import PendienteListMovil from "./Pendiente_Movil_List";
import { cookies } from "next/headers";
import NoPays from "../NoPays";

export default async function PendientesList({ pendientes }: { pendientes: PagoType[] }) {

  const viewport = (await cookies()).get("viewport")?.value

  if (pendientes.length === 0) return <NoPays />

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
