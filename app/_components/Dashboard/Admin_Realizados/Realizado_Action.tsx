"use client"

import Link from 'next/link'
import EditSVG from '@/app/_assets/EditSVG'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { RealizadoModal } from './Realizado_Modal'

export default function RealizadoAction({ realizado }: { realizado: PagoType }) {

  return (
    <div className='flex justify-around items-center gap-1'>
      <Link href={{
        pathname: '/admin/realizado-edit',
        query: { id: realizado._id },
      }}
      >
        <EditSVG className='size-6 text-black hover:text-black80' currentColor='currentColor' />
      </Link>

      <RealizadoModal realizado={realizado} />
    </div>
  )
}

