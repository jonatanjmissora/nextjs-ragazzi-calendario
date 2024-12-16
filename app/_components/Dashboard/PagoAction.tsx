"use client"

import { editarPendienteAction, eliminarPendienteAction, pagarPendienteAction } from '@/app/_lib/actions/pendientes.action'
import { PendienteType } from '@/app/_lib/schema/pendientes.type'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'

export default function PagoAction({ pendiente }: { pendiente: PendienteType }) {

  const handlePagar = async () => {
    const res = await pagarPendienteAction(pendiente)
    if(res?.success) toast.success("Pago exitoso")
      else toast.error(res.error)
  }

  const handleEliminar = async () => {
    const res = await eliminarPendienteAction(pendiente._id)
    if(res?.success) toast.success("Pago borrado")
      else toast.error(res.error)
  }

  return (
    <div className='flex gap-2'>
        <button className='btn btn-accent' onClick={handlePagar}>pagar</button>
        <button className='btn btn-info' onClick={handleEliminar}>cancelar</button>
        <Link href={{
          pathname: '/edit',
          query: { id: pendiente._id },
        }}
         className='btn btn-primary' >
          editar
        </Link>
    </div>
  )
}
