"use client"

import TrashSVG from "@/app/_assets/TrashSVG"
import { eliminarPendienteAction } from "@/app/_lib/actions/pendientes.action"
import { PagoType } from "@/app/_lib/schema/pago.type"
import { useActionState, useRef } from "react"
import toast from "react-hot-toast"
import SubmitBtn from "../SubmitBtn"

export const PendienteModal = ({ pendiente }: { pendiente: PagoType }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  // const handleCloseYes = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event?.preventDefault()
  //   dialogRef.current?.close()

  //   const res = await eliminarPendienteAction(pendiente)
  //   if (res?.success) {
  //     toast.success(res.message)
  //   }
  //   else toast.error(res.message)
  // }

  const [, formAction, isPending] = useActionState(async () => {

    dialogRef.current?.close()

    const res = await eliminarPendienteAction(pendiente)
    if (!res?.success) {
      toast.error(res.message)
    }
    else toast.success(res.message)

  }, null)

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className='size-6 text-[#88000075] hover:text-[#880000]' currentColor='currentColor' />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="modal bg-black/50 backdrop-blur-sm">
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿ Seguro desea elimiar</h3>
          <h3 className="font-bold text-lg">{pendiente._id} ?</h3>
          <div className="modal-action">
            <form action={formAction} className="flex gap-1 w-1/2">
              <SubmitBtn isPending={isPending} text="Si" className="flex-1" />
              <button onClick={() => dialogRef.current?.close()} type="button" className="btn btn-error flex-1">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}