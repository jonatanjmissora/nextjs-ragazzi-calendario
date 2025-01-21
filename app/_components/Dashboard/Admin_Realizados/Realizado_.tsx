"use client"

import { PagoType } from '@/app/_lib/schema/pago.type'
import RealizadoAction from './Realizado_Action'
import montoFormat from '@/app/_lib/utils/montoFormat'

const tableHeader = ["vencimiento", "rubro", "sector", "monto", "pagado", "edit"]

export default function AdminList({ realizados }: { realizados: PagoType[] }) {
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
            realizados.map(realizado =>
              <Pago
                key={realizado._id}
                realizado={realizado}
              />
            )
          }
        </tbody>
      </table>
    </div>
  )
}

const Pago = ({ realizado }
  : { realizado: PagoType }
) => {

  return (
    <tr key={realizado._id} className="hover">
      <td>{realizado.vencimiento}</td>
      <td>{realizado.rubro}</td>
      <td>{realizado.sector}</td>
      <td>{montoFormat(realizado.monto)}</td>
      <td>{realizado.pagado}</td>
      <td className="px-0"><RealizadoAction realizado={realizado} /></td>
    </tr>
  )
}