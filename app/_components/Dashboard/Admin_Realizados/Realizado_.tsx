"use client"

import { PagoType } from '@/app/_lib/schema/pago.type'
import RealizadoAction from './Realizado_Action'
import montoFormat from '@/app/_lib/utils/montoFormat'

export default function AdminList({ realizados }: { realizados: PagoType[] }) {
  return (
    <>
      {
        realizados.map(realizado =>
          <Pago
            key={realizado._id}
            realizado={realizado}
          />
        )
      }
    </>
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