"use client"

import { lazy, useState } from "react";
import NavbarLogoutModal from "./Navbar_Logout_Modal";

const ThemeSwitcher = lazy(() => import("./Navbar_ThemeSwitcher"))

export default function UserMenu({ username }: { username: string }) {

  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <article className="tracking-widest     text-foreground flex justify-between items-center relative h-full z-10">
      <button className={`${showMenu && "bg-card text-white"} h-full px-8 z-10 hover:text-foreground80`} onClick={() => setShowMenu(prev => !prev)}>Hola, {username.toUpperCase()}</button>
      {
        showMenu && (
          <>
            <div className="z-100 absolute top-0 -left-[1000%] right-0 -bottom-[1500%]" onClick={() => setShowMenu(false)}></div>
            <div className="user-menu-modal absolute bg-card rounded-bl-lg text-white p-2 flex flex-col justify-center items-end gap-6">
              <NavbarLogoutModal setShowMenu={setShowMenu} />
              <ThemeSwitcher />
            </div>
          </>
        )
      }
    </article>
  )
}

