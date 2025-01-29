import { PagoType } from '@/app/_lib/schema/pago.type'
import React from 'react'
import RealizadoMovilList from './Realizado_Movil_List'
import RealizadoDesktopList from './Realizado_Desktop_List'

export default function RealizadoList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {
  return (
    <>
      <RealizadoDesktopList realizados={realizados} allRealizados={allRealizados} />
      <RealizadoMovilList realizados={realizados} allRealizados={allRealizados} />
    </>
  )
}
