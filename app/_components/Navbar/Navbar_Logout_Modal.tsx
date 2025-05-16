"use client"

import { logout } from "@/app/_lib/actions/user.action"
import { useRef, useState } from "react"
import SubmitBtn from "../SubmitBtn"
import LogoutSVG from "@/app/_assets/LogoutSVG"
import { useRouter } from "next/navigation"

export default function NavbarLogoutModal({ setShowMenu }: { setShowMenu: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isPending, setIsPending] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()

  const handleClick = () => {
    dialogRef.current?.close()
    setShowMenu(false)
  }

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsPending(true)
      await logout()
      // Usar el router de Next.js para la navegación
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error during logout:", error)
      // Si hay un error, intentamos redirigir de todos modos usando el router
      router.push("/")
      router.refresh()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <button
        className="text-base text-foreground w-60 border-t border-foreground25 flex justify-end items-center gap-2 pt-4 hover:text-foreground80"
        onClick={() => dialogRef.current?.showModal()}
      >
        <LogoutSVG className="size-5" currentColor="currentColor" />
        Cerrar Sesión
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card p-10 fixed top-[50%] left-[50%]">
          <span className="font-bold text-lg text-[#222] tracking-widest text-left">¿ Seguro desea cerrar sesión ?</span>
          <div className="modal-action">
            <form onSubmit={handleLogout} className="flex gap-1 w-1/2">
              <SubmitBtn isPending={isPending} text="Si" className="size-11" />
              <button onClick={handleClick} type="button" className="btn-main-error">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

