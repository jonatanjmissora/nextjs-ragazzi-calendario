"use client"

import EditSVG from '@/app/_assets/EditSVG'
import TrashSVG from '@/app/_assets/TrashSVG'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import ToastWithConfirm from '../ToastWithConfirm'
import { eliminarRealizadoAction } from '@/app/_lib/actions/realizados.action'
import Link from 'next/link'
import { PagoType } from '@/app/_lib/schema/pago.type'

export default function AdminList({ realizados }: { realizados: PagoType[] }) {
  return (
    <>
      {
        realizados.map(realizado =>
          <Pago
            key={realizado._id}
            realizado={realizado}
          />
        )
      }
    </>
  )
}

const Pago = ({ realizado }
  : { realizado: PagoType }
) => {

  return (
    <tr key={realizado._id} className="hover">
      <td>{realizado.vencimiento}</td>
      <td>{realizado.rubro}</td>
      <td>{realizado.sector}</td>
      <td>{realizado.monto}</td>
      <td>{realizado.pagado}</td>
      <td><Link href={{
        pathname: '/admin/realizado-edit',
        query: { id: realizado._id },
      }}
      >
        <EditSVG className='size-6 text-[#aaaaaa75] hover:text-[#aaa]' currentColor={"currentColor"} />
      </Link>
      </td>
      {/* <td><Modal realizado={realizado} /></td> */}
    </tr>
  )
}

const Modal = ({ realizado }: { realizado: PagoType }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleCloseYes = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    dialogRef.current?.close()

    // const res = await eliminarRealizadoAction(realizado._id)
    // if (res?.success) {
    //   toast.success("Pago borrado")
    //   toast.custom((t: string) => (
    //     <div className="flex flex-col">
    //       <ToastWithConfirm t={t} title={"pendiente eliminado"} content={JSON.stringify(realizado)} />
    //     </div>
    //   ))
    // }
    // else toast.error(res.error)
  }

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className='size-6 text-[#88000075] hover:text-[#880000]' currentColor='currentColor' />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="modal bg-black/50 backdrop-blur-sm">
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿ Seguro desea elimiar</h3>
          <h3 className="font-bold text-lg">${realizado._id} ?</h3>
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