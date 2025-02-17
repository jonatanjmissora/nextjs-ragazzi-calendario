import { getCachedRealizadosYearBySectorAction, getRealizadosYearBySectorAction } from '@/app/_lib/actions/realizados.action'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { getActualDateStr } from '@/app/_lib/utils/getActualDate'
import { getFullYearOf } from '@/app/_lib/utils/getFullYearOf'
import React from 'react'
import { RealizadoMovilHisto } from './Realizado_Movil_Histo'

export default async function RealizadoMovilHistoContainer({ realizado }: { realizado: PagoType }) {

    const [ fromDate, toDate ] = getFullYearOf(getActualDateStr())
    const realizadosYearBySector = await getRealizadosYearBySectorAction(realizado, fromDate, toDate) 

  return (
    <RealizadoMovilHisto realizado={realizado} allRealizados={realizadosYearBySector}/>
  )
}