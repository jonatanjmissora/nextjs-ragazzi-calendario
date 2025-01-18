"use client"

import { pagarPendienteAction } from '@/app/_lib/actions/pendientes.action'
import Link from 'next/link'
import toast from 'react-hot-toast'
import EditSVG from '@/app/_assets/EditSVG'
import DollarSVG from '@/app/_assets/DollarSVG'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { PendienteModal } from './Pendiente_Modal'

export default function PendienteAction({ pendiente }: { pendiente: PagoType }) {

  const handlePagar = async () => {
    const res = await pagarPendienteAction(pendiente)
    if (res?.success) {
      toast.success(res.message)
    }
    else toast.error(res.message)
  }

  return (
    <div className='flex justify-around items-center gap-1'>

      <button onClick={handlePagar}>
        <DollarSVG className='size-6 text-[#00800075] hover:text-[#008000]' currentColor='currentColor' />
      </button>

      <PendienteModal pendiente={pendiente} />

      <Link href={{
        pathname: '/pendientes/edit',
        query: { id: pendiente._id },
      }}
      >
        <EditSVG className='size-6 text-[#aaaaaa75] hover:text-[#aaaaaa]' currentColor='currentColor' />
      </Link>

    </div>
  )
}

