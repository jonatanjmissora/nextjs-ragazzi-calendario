import { PagoType } from "@/app/_lib/schema/pago.type";
import PendienteAction from "./Pendiente_Action";

export default function PendientesList({ pendientes }: { pendientes: PagoType[] }) {
  return (
    <>
      {
        pendientes.map(pendiente =>

          <tr key={pendiente._id} className="hover">
            <th>{pendiente.vencimiento}</th>
            <td>{pendiente.rubro}</td>
            <td>{pendiente.sector}</td>
            <td>{pendiente.monto}</td>
            <td className="px-0"><PendienteAction pendiente={pendiente} /></td>
          </tr>
        )
      }
    </>
  )
}
