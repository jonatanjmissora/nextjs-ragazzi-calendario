import { getPendientesAction } from '@/app/_lib/actions/pendientes.action'
import { DDBB } from '@/app/_lib/db/connect2'
import React from 'react'

export default async function page() {
    
   const pendientes = await DDBB()
   console.log(pendientes)

  return (
    <div>HOLA</div>
  )
}
