import { getCachedRealizadosAction } from '@/app/_lib/actions/realizados.action'
import { getFilteredPagos } from '@/app/_lib/utils/getFilteredPagos'
import React from 'react'
import NoPays from '../../NoPays'
import AdminRealizadoDesktopList from './Admin_Realizado_Desktop_List'
import { PagoType } from '@/app/_lib/schema/pago.type'

export default async function AdminRealizadoDesktopListContainer({ rubroFilter, sectorFilter, hastaFilter, desdeFilter }: { rubroFilter: string, sectorFilter: string, hastaFilter: string, desdeFilter: string }) {

  const pagosRealizados = await getCachedRealizadosAction()
  const filteredRealizados = getFilteredPagos(pagosRealizados, rubroFilter, sectorFilter, undefined, hastaFilter, desdeFilter) as PagoType[]

  if (filteredRealizados.length === 0) return <NoPays />

  return (
    <AdminRealizadoDesktopList realizados={filteredRealizados} />
  )
}
