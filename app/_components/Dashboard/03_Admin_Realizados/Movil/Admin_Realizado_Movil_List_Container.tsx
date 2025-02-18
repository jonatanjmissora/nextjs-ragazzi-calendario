import React from 'react'
import AdminRealizadoMovilList from './Admin_Realizado_Movil_List'
import { getCachedRealizadosAction } from '@/app/_lib/actions/realizados.action'
import { getFilteredPagos } from '@/app/_lib/utils/getFilteredPagos'
import NoPays from '../../NoPays'
import { PagoType } from '@/app/_lib/schema/pago.type'

export default async function AdminRealizadoMovilListContainer({ rubroFilter, sectorFilter, hastaFilter, desdeFilter }: { rubroFilter: string, sectorFilter: string, hastaFilter: string, desdeFilter: string }) {

  const pagosRealizados = await getCachedRealizadosAction()
  const filteredRealizados = getFilteredPagos(pagosRealizados, rubroFilter, sectorFilter, undefined, hastaFilter, desdeFilter) as PagoType[]

  if (filteredRealizados.length === 0) return <NoPays />

  return (
    <>
      <AdminRealizadoMovilList realizados={filteredRealizados} />
    </>
  )
}
