import React from 'react'
import RealizadoMovilList from './Realizado_Movil_List'
import RealizadoDesktopList from './Realizado_Desktop_List'
import { cookies } from 'next/headers'
import NoPays from '../NoPays'
import { getCachedRealizadosFilterAction } from '@/app/_lib/actions/realizados.action'
import { getFullMonthOf } from '@/app/_lib/utils/getFullMonthOf'
import { getFullYearOf } from '@/app/_lib/utils/getFullYearOf'

export default async function RealizadoList({ rubroFilter, dateFilter }: { rubroFilter: string, dateFilter: string }) {

  const viewport = (await cookies()).get("viewport")?.value

  // const [fromDate, toDate] = getFullMonthOf(dateFilter)
  const [fromDate, toDate] = getFullYearOf(dateFilter)
  const pagosRealizados = await getCachedRealizadosFilterAction(fromDate, toDate)
  const filteredRealizados = rubroFilter === "todos"
    ? pagosRealizados
    : pagosRealizados.filter(pago => pago.rubro === rubroFilter)

  if (filteredRealizados.length === 0) return <NoPays />

  return (
    <>
      {/* {
        viewport === "desktop"
          ? <RealizadoDesktopList realizados={filteredRealizados} allRealizados={pagosRealizados} /> */}
         <RealizadoMovilList realizados={filteredRealizados} allRealizados={pagosRealizados} />
      {/* } */}
    </>
  )
}
