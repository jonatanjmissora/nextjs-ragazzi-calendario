import RealizadoEditForm from '@/app/_components/Dashboard/03_Admin_Realizados/Admin_Realizado_EditForm'
import { getRealizadoByIdAction } from '@/app/_lib/actions/realizados.action'
import { getCachedSectoresResetAction } from '@/app/_lib/actions/sectores.action'
import { PagoType } from '@/app/_lib/schema/pago.type'
import React from 'react'

export default async function RealizadosEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const id = (await searchParams)?.id || ""
  const realizado = await getRealizadoByIdAction(id) as PagoType
  const sectoresReset = await getCachedSectoresResetAction()

  return (
    <section className="page justify-center items-center">
      <RealizadoEditForm realizado={realizado} sectoresReset={sectoresReset} />
    </section>
  )
}
