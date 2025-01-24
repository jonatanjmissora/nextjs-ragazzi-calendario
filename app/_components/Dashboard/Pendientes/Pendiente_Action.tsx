"use client"

import Link from 'next/link'
import toast from 'react-hot-toast'
import EditSVG from '@/app/_assets/EditSVG'
import DollarSVG from '@/app/_assets/DollarSVG'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { PendienteModal } from './Pendiente_Modal'
import { eliminarPendienteAction } from '@/app/_lib/actions/pendientes.action'
import { useActionState } from 'react'
import { localeStringToDBDate } from '@/app/_lib/utils/date.toLocaleString_to_dbDate'
import { insertarRealizadoAction } from '@/app/_lib/actions/realizados.action'
import SubmitBtn from '../../SubmitBtn'

export default function PendienteAction({ pendiente }: { pendiente: PagoType }) {

  const [, formAction, isPending] = useActionState(async () => {
    const actualDate = localeStringToDBDate(new Date().toLocaleDateString())
    const newRealizado = { ...pendiente, pagado: actualDate }

    const insertResp = await insertarRealizadoAction(newRealizado)
    if (!insertResp.success) {
      toast.error(insertResp.message)
      return
    }

    const deleteResp = await eliminarPendienteAction(pendiente)
    if (!deleteResp.success) {
      toast.error(deleteResp.message)
      return
    }

    if (insertResp.success && deleteResp.success) {
      toast.success(insertResp.message)
    }
  }
    , null)

  return (
    <div className='flex justify-around items-center gap-1'>

      <form action={formAction}>
        <SubmitBtn isPending={isPending}>
          <DollarSVG className='size-6 text-[#00800075] hover:text-[#008000]' currentColor='currentColor' />
        </SubmitBtn>
      </form>

      <PendienteModal pendiente={pendiente} />

      <Link href={{
        pathname: '/pendientes/edit',
        query: { id: pendiente._id },
      }}
      >
        <EditSVG className='size-6 text-foreground80 hover:text-foreground' currentColor='currentColor' />
      </Link>

    </div>
  )
}

