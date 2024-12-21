"use client"

import PlusSVG from "@/app/_assets/PlusSVG";
import { SectoresType } from "@/app/_lib/schema/sectores.type";
import toast from "react-hot-toast";

export default function AdminSectoresList({ sectoresList }: { sectoresList: SectoresType[] }) {



  return (
    <article className="table-width flex flex-col justify-center items-center">

      {
        sectoresList.map((rubro, index) =>

          <div key={index} className="w-[90%] flex flex-col gap-2 rounded-lg bg-slate-700 p-4 mx-auto my-4">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-bold">{rubro._id}</span>
              <div className="flex gap-2">
                <input type="text" className="bg-slate-700 border-b border-slate-400 text-center" placeholder="nuevo..." />
                <PlusSVG className="size-5 text-slate-500 hover:text-slate-200" currentColor="currentColor" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {
                rubro.sectores.map((sector, index) =>
                  <span key={index} className={`flex gap-2 badge badge-outline text-slate-400 text-sm font-bold`}>
                    {sector}
                    <Modal />
                  </span>
                )
              }
            </div>

          </div>
        )
      }

    </article>
  )
}

const Modal = () => {

  const handleClick = () => {
    //eliminar sector de la base de datos
    const dialog = document?.getElementById('my_modal_1') as HTMLDialogElement
    dialog?.showModal()

  }

  const handleClose = () => {
    toast.success("Sector eliminado")
  }

  return (
    <>
      <button className="" onClick={handleClick}>
        <PlusSVG className="size-5 rotate-45 text-slate-400 hover:text-slate-200" currentColor="currentColor" />
      </button>
      <dialog id="my_modal_1" className="modal bg-black/50 backdrop-blur-sm">
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿ Seguro desea elimiar Agua de Ragazzi ?</h3>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={handleClose} className="btn">Si</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
