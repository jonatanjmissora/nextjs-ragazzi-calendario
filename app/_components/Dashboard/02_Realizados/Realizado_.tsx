import { PagoType } from '@/app/_lib/schema/pago.type'
import React from 'react'
import RealizadoMovilList from './Realizado_Movil_List'
import RealizadoDesktopList from './Realizado_Desktop_List'
import { cookies } from 'next/headers'

export default async function RealizadoList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {

  const viewport = (await cookies()).get("viewport")?.value

  if (realizados.length === 0) return <div className="flex-1 flex justify-center items-center"><h1 className="text-center text-2xl">No hay pagos registrados...</h1></div>

  return (
    <>
      {
        viewport === "desktop"
          ? <RealizadoDesktopList realizados={realizados} allRealizados={allRealizados} />
          : <RealizadoMovilList realizados={realizados} allRealizados={allRealizados} />
      }
    </>
  )
}
