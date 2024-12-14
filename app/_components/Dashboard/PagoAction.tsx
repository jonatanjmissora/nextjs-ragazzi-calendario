import { editarPendienteAction, eliminarPendienteAction, pagarPendienteAction } from '@/app/_lib/actions/pendientes.action'
import { PendienteType } from '@/app/_lib/schema/pendientes.type'
import React from 'react'

export default function PagoAction({ pendiente }: { pendiente: PendienteType }) {

  const formActionPagar = async () => {
    "use server"
    pagarPendienteAction(pendiente)
  }

  const formActionEliminar = async () => {
    "use server"
    eliminarPendienteAction(pendiente)
  }

  const formActionEditar = async () => {
    "use server"
    editarPendienteAction(pendiente)
  }

  return (
    <div>
      <form className='flex gap-1'>
        <button className='btn btn-accent' formAction={formActionPagar}>pagar</button>
        <button className='btn btn-info' formAction={formActionEliminar}>cancelar</button>
        <button className='btn btn-primary' formAction={formActionEditar}>editar</button>
      </form>
    </div>
  )
}
