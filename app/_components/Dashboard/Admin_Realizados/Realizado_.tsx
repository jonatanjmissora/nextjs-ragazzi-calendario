"use client"

import { PagoType } from '@/app/_lib/schema/pago.type'
import RealizadoAction from './Realizado_Action'
import montoFormat from '@/app/_lib/utils/montoFormat'

const tableHeader = ["vencimiento", "rubro", "sector", "monto", "pagado", "accion"]

export default function AdminList({ realizados }: { realizados: PagoType[] }) {

  if (realizados.length === 0) return <div className="flex-1 flex justify-center items-center"><h1 className="text-center text-2xl">No hay pagos registrados...</h1></div>

  return (
    <article className="flex-1 flex items-center justify-center">

      <div className="table-container relative px-8 py-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr className='text-lg border-b border-foreground25'>
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
    </article>
  )
}

const Pago = ({ realizado }
  : { realizado: PagoType }
) => {

  return (
    <tr key={realizado._id} className={`${realizado.rubro} hover:brightness-75 border-b border-foreground25`}>
      <td>{realizado.vencimiento}</td>
      <td>{realizado.rubro}</td>
      <td>{realizado.sector}</td>
      <td>{montoFormat(Number(realizado.monto))}</td>
      <td>{realizado.pagado}</td>
      <td className="px-0"><RealizadoAction realizado={realizado} /></td>
    </tr>
  )
}