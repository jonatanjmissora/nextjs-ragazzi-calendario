import { PagoType } from "@/app/_lib/schema/pago.type";
import PendienteAction from "./Pendiente_Action";
import montoFormat from "@/app/_lib/utils/montoFormat";

const tableHeader = ["vencimiento", "rubro", "sector", "monto", "accion"]

export default function PendientesList({ pendientes }: { pendientes: PagoType[] }) {


  return (
    <div className="h-full table-container px-40 py-12 flex-1">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {
              tableHeader.map(thName => <th key={thName}>{thName}</th>)
            }
          </tr>
        </thead>
        <tbody>

          {
            pendientes.map(pendiente =>

              <tr key={pendiente._id} className="hover">
                <td>{pendiente.vencimiento}</td>
                <td>{pendiente.rubro}</td>
                <td>{pendiente.sector}</td>
                <td>{montoFormat(pendiente.monto)}</td>
                <td className="px-0"><PendienteAction pendiente={pendiente} /></td>
              </tr>
            )
          }

        </tbody>
      </table>
    </div>
  )
}
