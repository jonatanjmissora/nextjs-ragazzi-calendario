"use client"

import { logout } from "@/app/_lib/actions/user.action";
import { lazy, useRef, useState } from "react";
import SubmitBtn from "../SubmitBtn";

const ThemeSwitcher = lazy(() => import("../Navbar/ThemeSwitcher"))

export default function UserMenu({ username }: { username: string }) {

  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <article className="tracking-widest text-sm text-foreground flex justify-between items-center relative h-full z-10">
      <button className={`${showMenu && "bg-card text-white"} h-full px-8 z-10 hover:text-foreground80`} onClick={() => setShowMenu(prev => !prev)}>Hola, {username.toUpperCase()}</button>
      {
        showMenu && (
          <>
            <div className="z-100 absolute top-0 -left-[1000%] right-0 -bottom-[2000%]" onClick={() => setShowMenu(false)}></div>
            <div className="user-menu-modal absolute bg-card rounded-bl-lg text-white p-2 flex flex-col justify-center items-end gap-6">
              <Modal setShowMenu={setShowMenu} />
              <ThemeSwitcher />
            </div>
          </>
        )
      }
    </article>
  )
}

const Modal = ({ setShowMenu }: { setShowMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleClick = async () => {
    dialogRef.current?.close()
    setShowMenu(false)
  }

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    logout()
  }

  return (
    <>
      <button className="px-5" onClick={() => dialogRef.current?.showModal()}>
        Cerrar Sesión
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="flex gap-2 flex-wrap">
            <span className="font-bold text-xl text-center tracking-widest">¿ Seguro desea cerrar sesión ?</span>

          </div>
          <div className="modal-action">
            <form onSubmit={handleLogout} className="flex gap-1 w-1/2">
              <SubmitBtn isPending={false} text="Si" />
              <button onClick={handleClick} type="button" className="btn-main-error">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
