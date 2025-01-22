"use client"

import { logout } from "@/app/_lib/actions/user.action";
import { useRef, useState } from "react";
import SubmitBtn from "../SubmitBtn";

export default function UserMenu({ username }: { username: string }) {

  const [showMenu, setShowMenu] = useState<boolean>(false)


  return (
    <article className="tracking-widest text-sm text-slate-400 flex justify-between items-center relative h-full">
      <button className={`${showMenu && "bg-slate-900 text-white"} h-full px-8 z-10`} onClick={() => setShowMenu(prev => !prev)}>Hola, {username.toUpperCase()}</button>
      {
        showMenu && (
          <div className="absolute top-9 right-0 left-0 -bottom-[7rem] bg-slate-900 text-slate-400 p-2 flex flex-col justify-center items-end gap-6">
            <Modal />
            <span className="px-5">Tema</span>
          </div>
        )
      }
    </article>



  )
}

const Modal = () => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    logout()
  }

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        Cerrar Sesión
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container p-10 bg-slate-900 w-1/3 rounded-lg fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="flex gap-2 flex-wrap">
            <span className="font-bold text-xl text-center tracking-widest">¿ Seguro desea cerrar sesión ?</span>

          </div>
          <div className="modal-action">
            <form onSubmit={handleLogout} className="flex gap-1 w-1/2">
              <SubmitBtn isPending={false} text="Si" className="flex-1" />
              <button onClick={() => dialogRef.current?.close()} type="button" className="btn btn-error flex-1">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
