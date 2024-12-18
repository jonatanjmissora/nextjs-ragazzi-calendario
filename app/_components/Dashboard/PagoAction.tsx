"use client"

import { eliminarPendienteAction, pagarPendienteAction } from '@/app/_lib/actions/pendientes.action'
import { PendienteType } from '@/app/_lib/schema/pendientes.type'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import ToastWithConfirm from '../ToastWithConfirm'
import EditSVG from '@/app/_assets/EditSVG'
import TrashSVG from '@/app/_assets/TrashSVG'
import DollarSVG from '@/app/_assets/DollarSVG'

export default function PagoAction({ pendiente }: { pendiente: PendienteType }) {

  const handlePagar = async () => {
    const res = await pagarPendienteAction(pendiente)
    if (res?.success) {
      toast.success("Pago exitoso")
      toast.custom((t: string) => (
        <div className="flex flex-col">
          <ToastWithConfirm t={t} title={"pendiente pagado"} content={JSON.stringify(pendiente)} />
        </div>
      ))
    }
    else toast.error(res.errors)
  }

  const handleEliminar = async () => {
    const res = await eliminarPendienteAction(pendiente._id)
    if (res?.success) {
      toast.success("Pago borrado")
      toast.custom((t: string) => (
        <div className="flex flex-col">
          <ToastWithConfirm t={t} title={"pendiente eliminado"} content={JSON.stringify(pendiente)} />
        </div>
      ))
    }
    else toast.error(res.error)
  }

  return (
    <div className='flex justify-between items-center gap-1'>
      <button onClick={handlePagar}><DollarSVG className='size-6' currentColor='#00800075' /></button>
      <button onClick={handleEliminar}><TrashSVG className='size-6' currentColor='#88000075' /></button>
      <Link href={{
        pathname: '/pendientes/edit',
        query: { id: pendiente._id },
      }}
      >
        <EditSVG className='size-6' currentColor='#aaaaaa75' />
      </Link>
    </div>
  )
}
