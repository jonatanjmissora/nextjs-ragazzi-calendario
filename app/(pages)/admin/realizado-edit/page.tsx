import RealizadoEditForm from '@/app/_components/Dashboard/Admin_Realizados/Realizado_EditForm'
import { getRealizadoByIdAction } from '@/app/_lib/actions/realizados.action'
import { getCachedSectoresResetAction } from '@/app/_lib/actions/sectores.action'
import { PagoType } from '@/app/_lib/schema/pago.type'
import getUserFromCookie from '@/app/_lib/utils/getUserFromCookies'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function RealizadosEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const id = (await searchParams)?.id || ""
  const realizado = await getRealizadoByIdAction(id) as PagoType
  const sectoresReset = await getCachedSectoresResetAction()

  return (
    <section className="w-full main-height flex justify-center items-center">
      <RealizadoEditForm realizado={realizado} sectoresReset={sectoresReset} />
    </section>
  )
}
