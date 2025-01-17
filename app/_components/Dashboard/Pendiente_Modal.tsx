import TrashSVG from "@/app/_assets/TrashSVG"
import { eliminarPendienteAction } from "@/app/_lib/actions/pendientes.action"
import { PagoType } from "@/app/_lib/schema/pago.type"
import { useRef } from "react"
import toast from "react-hot-toast"

export const PendienteModal = ({ pendiente }: { pendiente: PagoType }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleCloseYes = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    dialogRef.current?.close()

    const res = await eliminarPendienteAction(pendiente._id ?? "")
    if (res?.success) {
      toast.success("Pago borrado")
      // toast.custom((t: string) => (
      //   <div className="flex flex-col">
      //     <ToastWithConfirm t={t} title={"pendiente eliminado"} content={JSON.stringify(pendiente)} />
      //   </div>
      // ))
    }
    else toast.error(res.error)
  }

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