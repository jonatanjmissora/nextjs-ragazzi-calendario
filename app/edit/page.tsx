import React from 'react'
import PendienteEditForm from '../_components/Dashboard/PendienteEditForm'
import { getPendienteByIdAction } from '../_lib/actions/pendientes.action'
import { PendienteType } from '../_lib/schema/pendientes.type'
import { getSectoresReset } from '../_lib/db/sectores.db'

export default async function PendienteEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }>}) {

    const id = (await searchParams)?.id || ""
    const pendiente = await getPendienteByIdAction(id) as PendienteType
    const sectoresReset = await getSectoresReset()

  return (
    <PendienteEditForm pendiente={pendiente} sectoresReset={sectoresReset}/>
  )
}
