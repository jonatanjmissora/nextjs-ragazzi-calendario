"use client"

import LogoutSVG from "@/app/_assets/LogoutSVG";
import { logout } from "@/app/_lib/actions/user.action";
import { useState } from "react";

export default function UserLogout({ username }: { username: string }) {

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleClick = () => {

  }

  const handleLogout = () => {
    logout()
  }

  return (
    <article className="tracking-widest text-sm text-slate-400 flex justify-between items-center relative h-full">
      <button className={`${showMenu && "bg-slate-900"} h-full px-8`} onClick={() => setShowMenu(prev => !prev)}>Hola, {username.toUpperCase()}</button>
      {
        showMenu && (
          <div className="absolute top-9 right-0 left-0 -bottom-[7rem] bg-slate-900 text-slate-400 p-2 flex flex-col justify-center items-end gap-6">
            <button className="px-5" onClick={handleLogout}>Cerrar Sesión</button>
            <span className="px-5">Tema</span>
          </div>
        )
      }
    </article>



  )
}
