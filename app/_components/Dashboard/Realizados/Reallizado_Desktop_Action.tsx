"use client"

import Link from 'next/link'
import EditSVG from '@/app/_assets/EditSVG'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { RealizadoDeleteModal } from './Realizado_Delete_Modal'

export default function RealizadoDesktopAction({ realizado }: { realizado: PagoType }) {


  return (
    <div className='flex justify-around items-center gap-1 px-5'>

      <RealizadoDeleteModal realizado={realizado} />

      <Link href={{
        pathname: '/realizados/edit',
        query: { id: realizado._id },
      }}
      >
        <EditSVG className='size-9 p-[0.4rem] text-black hover:text-[#222]' currentColor='currentColor' />
      </Link>

    </div>
  )
}

