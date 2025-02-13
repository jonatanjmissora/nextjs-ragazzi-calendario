"use client"

import Link from 'next/link'
import toast from 'react-hot-toast'
import EditSVG from '@/app/_assets/EditSVG'
import DollarSVG from '@/app/_assets/DollarSVG'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { eliminarPendienteAction } from '@/app/_lib/actions/pendientes.action'
import { useActionState } from 'react'
import { localeStringToDBDate } from '@/app/_lib/utils/date.toLocaleString_to_dbDate'
import { insertarRealizadoAction } from '@/app/_lib/actions/realizados.action'
import SubmitBtn from '@/app/_components/SubmitBtn'
import { PendienteDeleteModal } from '../Pendiente_Delete_Modal'

export default function PendienteDesktopAction({ pendiente, dialogRef }: { pendiente: PagoType, dialogRef?: React.RefObject<HTMLDialogElement | null> }) {

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
      if (dialogRef) dialogRef.current?.close()
    }
  }
    , null)

  return (
    <div className='flex justify-around items-center gap-1 px-5'>

      <form action={formAction} className='flex justify-center items-center'>
        <SubmitBtn isPending={isPending} className='' classNameSVG="size-9">
          <DollarSVG className='size-9 p-[0.4rem] text-[#005300] hover:text-[#35da35e7]' currentColor='currentColor' />
        </SubmitBtn>
      </form>

      <PendienteDeleteModal pendiente={pendiente} dialogRef2={dialogRef} />

      <Link href={{
        pathname: '/pendientes/edit',
        query: { id: pendiente._id },
      }}
      >
        <EditSVG className='size-9 p-[0.4rem] text-black hover:text-[#222]' currentColor='currentColor' />
      </Link>

    </div>
  )
}

