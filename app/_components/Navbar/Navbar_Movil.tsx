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

  return (
    <>
      <div className="border">
        <button onClick={() => setShowMenu(prev => !prev)}>
          <HambMenuSVG className="size-11 text-foreground" currentColor="currentColor" />
        </button>
      </div>

      {
        showMenu && (
          <>
            <div className="z-100 bg-[#241e34] fixed inset-0 flex flex-col items-center pt-20" onClick={() => setShowMenu(false)}>

              <nav className="flex flex-col gap-4      items-center">
                <Link
                  className={`${pathname === "/pendientes" && "border-b-[2px] border-foreground"}`}
                  href="/pendientes" >
                  pendientes
                </Link>
                <Link
                  className={`${pathname === "/realizados" && "border-b-[2px] border-foreground"}`}
                  href="/realizados" >
                  realizados
                </Link>
                <Link
                  className={`${pathname === "/admin" && "border-b-[2px] border-foreground"}`}
                  href="/admin" >
                  admin
                </Link>
                <Link
                  className={`${pathname === "/admin/sectores" && "border-b-[2px] border-foreground"}`}
                  href="/admin/sectores" >
                  sectores
                </Link>
                <Link
                  className={`${pathname === "/admin/weblinks" && "border-b-[2px] border-foreground"}`}
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
