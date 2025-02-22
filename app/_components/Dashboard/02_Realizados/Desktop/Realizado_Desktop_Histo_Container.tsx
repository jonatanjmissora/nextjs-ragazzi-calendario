import { getCachedRealizadosYearBySectorAction } from '@/app/_lib/actions/realizados.action'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { getActualDateStr } from '@/app/_lib/utils/getActualDate'
import { getFullYearOf } from '@/app/_lib/utils/getFullYearOf'
import React from 'react'
import { RealizadoDesktopHisto } from './Realizado_Desktop_Histo'

export default async function RealizadoDesktopHistoContainer({ realizado }: { realizado: PagoType }) {

  const [fromDate, toDate] = getFullYearOf(getActualDateStr())
  const realizadosYearBySector = await getCachedRealizadosYearBySectorAction(realizado, fromDate, toDate)

  return (
    <RealizadoDesktopHisto realizado={realizado} allRealizados={realizadosYearBySector} />
  )
}
