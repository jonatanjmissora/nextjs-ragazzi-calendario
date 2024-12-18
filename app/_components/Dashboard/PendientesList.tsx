import { PendienteType } from "@/app/_lib/schema/pendientes.type";
import PagoAction from "./PagoAction";

export default function PendientesList({ pendientes }: { pendientes: PendienteType[] }) {
  return (
    <>
      {
        pendientes.map(pendiente =>

          <tr key={pendiente._id} className="hover">
            <th>{pendiente.vencimiento}</th>
            <td>{pendiente.rubro}</td>
            <td>{pendiente.sector}</td>
            <td>{pendiente.monto}</td>
            <td className="px-0"><PagoAction pendiente={pendiente} /></td>
          </tr>
        )
      }
    </>
  )
}
