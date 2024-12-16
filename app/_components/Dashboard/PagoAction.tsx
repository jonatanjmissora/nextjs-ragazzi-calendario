"use client"

import { editarPendienteAction, eliminarPendienteAction, pagarPendienteAction } from '@/app/_lib/actions/pendientes.action'
import { PendienteType } from '@/app/_lib/schema/pendientes.type'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import ToastWithConfirm from '../ToastWithConfirm'

export default function PagoAction({ pendiente }: { pendiente: PendienteType }) {

  const handlePagar = async () => {
    const res = await pagarPendienteAction(pendiente)
    if(res?.success) {
      toast.success("Pago exitoso")
      toast.custom((t:any) => (
        <div className="flex flex-col">
            <ToastWithConfirm t={t} title={"pendiente pagado"} content={JSON.stringify(pendiente)}/>
        </div>
    ))
    }
      else toast.error(res.error)
  }

  const handleEliminar = async () => {
    const res = await eliminarPendienteAction(pendiente._id)
    if(res?.success) {
      toast.success("Pago borrado")
      toast.custom((t:any) => (
        <div className="flex flex-col">
            <ToastWithConfirm t={t} title={"pendiente eliminado"} content={JSON.stringify(pendiente)}/>
        </div>
    ))
    }
      else toast.error(res.error)
  }

  return (
    <div className='flex gap-2'>
        <button className='btn btn-accent' onClick={handlePagar}>pagar</button>
        <button className='btn btn-info' onClick={handleEliminar}>cancelar</button>
        <Link href={{
          pathname: '/pendientes/edit',
          query: { id: pendiente._id },
        }}
         className='btn btn-primary' >
          editar
        </Link>
    </div>
  )
}
