
import { editarPendiente, eliminarPendiente, pagarPendiente } from '@/app/_lib/db/pendientes.db'
import React from 'react'

export default function PagoAction() {

    const pagarPendiente = async() => {
        "use server"
        console.log("pagando")
    }

  return (
    <div>
        <form action="" 
        className='flex gap-1'>
            <button className='btn btn-accent' formAction={pagarPendiente}>pagar</button>
            <button className='btn btn-info' >cancelar</button>
            <button className='btn btn-primary' >editar</button>
        </form>
    </div>
  )
}
