import { PendienteType } from "@/app/_lib/schema/pendientes.type";
import PagoAction from "./PagoAction";
import { Suspense } from "react";

export default function PendientesList({ pendientes }: { pendientes: PendienteType[] }) {
  return (
    <Suspense fallback={<p>Loading...Pagos Skelton</p>}>
      {
        pendientes.map(pendiente =>

          <tr key={pendiente._id} className="hover">
            <th>{pendiente.vencimiento}</th>
            <td>{pendiente.rubro}</td>
            <td>{pendiente.sector}</td>
            <td>{pendiente.monto}</td>
            <td><PagoAction pendiente={pendiente} /></td>
          </tr>
        )
      }
    </Suspense>
  )
}
