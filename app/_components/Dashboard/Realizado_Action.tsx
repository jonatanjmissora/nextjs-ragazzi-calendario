"use client"

import Link from 'next/link'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import EditSVG from '@/app/_assets/EditSVG'
import TrashSVG from '@/app/_assets/TrashSVG'
import { PagoType } from '@/app/_lib/schema/pago.type'
import { eliminarRealizadoAction } from '@/app/_lib/actions/realizados.action'

export default function RealizadoAction({ realizado }: { realizado: PagoType }) {

  return (
    <div className='flex justify-around items-center gap-1'>
      {/* <Modal realizado={realizado} /> */}
      <Link href={{
        pathname: '/admin/realizado-edit',
        query: { id: realizado._id },
      }}
      >
        <EditSVG className='size-6 text-[#aaaaaa75] hover:text-[#aaaaaa]' currentColor='currentColor' />
      </Link>
    </div>
  )
}

const Modal = ({ realizado }: { realizado: PagoType }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleCloseYes = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    dialogRef.current?.close()

    const res = await eliminarRealizadoAction(realizado)
    if (res?.success) {
      toast.success(res.message)
    }
    else toast.error(res.message)
  }

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className='size-6 text-[#88000075] hover:text-[#880000]' currentColor='currentColor' />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="modal bg-black/50 backdrop-blur-sm">
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿ Seguro desea elimiar</h3>
          <h3 className="font-bold text-lg">{realizado._id} ?</h3>
          <div className="modal-action">
            <form onSubmit={handleCloseYes} method="dialog flex">
              <button className="btn btn-primary w-[6rem]" type="submit" >Si</button>
              <button onClick={() => dialogRef.current?.close()} type="button" className="btn btn-error w-[6rem] mx-6">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}