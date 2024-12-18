import { RealizadoType } from '@/app/_lib/schema/realizado.type'
import React from 'react'

export default function AdminList({ realizados }: { realizados: RealizadoType[] }) {
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
  : { realizado: RealizadoType }
) => {

  return (
    <tr key={realizado._id} className="hover">
      <td>{realizado.vencimiento}</td>
      <td>{realizado.rubro}</td>
      <td>{realizado.sector}</td>
      <td>{realizado.monto}</td>
      <td>{realizado.pagado}</td>
      <td><button className='btn'>Edit</button></td>
    </tr>
  )
}