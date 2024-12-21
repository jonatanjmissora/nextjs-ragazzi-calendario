"use client"

import PlusSVG from "@/app/_assets/PlusSVG";
import { SectoresType } from "@/app/_lib/schema/sectores.type";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function AdminSectoresList({ sectoresList }: { sectoresList: SectoresType[] }) {

  const clientAction = async () => {

  }

  return (
    <article className="table-width flex flex-col justify-center items-center">

      {
        sectoresList.map((rubro, index) =>

          <div key={index} className="w-[90%] flex flex-col gap-2 rounded-lg bg-slate-700 p-4 mx-auto my-4">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-bold">{rubro._id}</span>
              <form action={clientAction} className="flex gap-2">
                <input type="text" className="bg-slate-700 border-b border-slate-400 text-center" placeholder="nuevo..." />
                <button className="">
                  <PlusSVG className="size-5 text-slate-500 hover:text-slate-200" currentColor="currentColor" />
                </button>
              </form>
            </div>

            <div className="flex flex-wrap gap-2">
              {
                rubro.sectores.map((sector, index) =>
                  <span key={index} className={`flex gap-2 badge badge-outline text-slate-400 text-sm font-bold`}>
                    {sector}
                    <Modal sector={sector} />
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

const Modal = ({ sector }: { sector: string }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleCloseYes = () => {
    toast.success("Sector eliminado")
  }

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <PlusSVG className="size-5 rotate-45 text-slate-400 hover:text-slate-200" currentColor="currentColor" />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="modal bg-black/50 backdrop-blur-sm">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{`¿ Seguro desea elimiar ${sector} ?`}</h3>
          <div className="modal-action">
            <form onSubmit={handleCloseYes} method="dialog">
              <button className="btn btn-primary w-[6rem]" type="submit" >Si</button>
              <button onClick={() => dialogRef.current?.close()} type="button" className="btn btn-error w-[6rem] mx-6">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}