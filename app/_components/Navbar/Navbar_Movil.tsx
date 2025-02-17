"use client"

import HambMenuSVG from "@/app/_assets/HambMenuSVG"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ThemeSwitcher from "./Navbar_ThemeSwitcher"
import NavbarLogoutModal from "./Navbar_Logout_Modal"

export default function NavbarMovil() {

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const pathname = usePathname()

  const activeClass = "border-b-[2px] border-foreground80 italic text-foreground80"

  return (
    <>
      <div className="flex justify-end p-4 py-2 h-navbar">
        <button onClick={() => setShowMenu(prev => !prev)}>
          <HambMenuSVG className="size-11 text-foreground rounded-lg" currentColor="currentColor" />
        </button>
      </div>

      {
        showMenu && (
          <>
            <div className="text-xl tracking-widest flex flex-col items-end justify-center p-6 bg-navbg" onClick={() => setShowMenu(false)}>

              <nav className="flex flex-col gap-4 items-end w-full">
                <Link
                  className={`${pathname === "/pendientes" && activeClass}`}
                  href="/pendientes" >
                  pendientes
                </Link>
                <Link
                  className={`${pathname === "/realizados" && activeClass}`}
                  href="/realizados" >
                  realizados
                </Link>
                <Link
                  className={`${pathname === "/admin" && activeClass}`}
                  href="/admin" >
                  admin
                </Link>
                <Link
                  className={`${pathname === "/admin/sectores" && activeClass}`}
                  href="/admin/sectores" >
                  sectores
                </Link>
                <Link
                  className={`${pathname === "/admin/weblinks" && activeClass}`}
                  href="/admin/weblinks" >
                  weblinks
                </Link>

                <NavbarLogoutModal setShowMenu={setShowMenu} />
                <ThemeSwitcher />

              </nav>

            </div>
          </>
        )
      }

    </>
  )
}
