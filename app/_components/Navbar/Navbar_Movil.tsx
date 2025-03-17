"use client"

import HambMenuSVG from "@/app/_assets/HambMenuSVG"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ThemeSwitcher from "./Navbar_ThemeSwitcher"
import NavbarLogoutModal from "./Navbar_Logout_Modal"
import LogoSVG from "@/app/_assets/LogoSVG"

const LINKS = [
  { href: "/pendientes", text: "pendientes" },
  { href: "/realizados", text: "realizados" },
  { href: "/admin", text: "admin" },
  { href: "/admin/sectores", text: "sectores" },
  { href: "/admin/weblinks", text: "weblinks" },
]

export default function NavbarMovil() {

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const pathname = usePathname()

  const activeClass = "border-b-[2px] border-foreground80 italic text-foreground80"

  return (
    <>
      <div className="flex justify-between items-center p-4 py-2 h-navbar sm:hidden">

        <picture className="size-12">
          <LogoSVG className="w-full h-full text-foreground80" currentColor="currentColor" />
        </picture>

        <span className="text-lg">{pathname}</span>

        <button onClick={() => setShowMenu(prev => !prev)}>
          <HambMenuSVG className="size-11 text-foreground rounded-lg" currentColor="currentColor" />
        </button>
      </div>

      {
        showMenu && (
          <>
            <div className="text-xl tracking-widest flex flex-col items-end justify-center p-6 bg-navbg" onClick={() => setShowMenu(false)}>

              <nav>
                <ul className="flex flex-col gap-4 items-end w-full movil-navbar">

                  {
                    LINKS.map((link, index) => (
                      <li
                        key={index}
                        style={{ '--i': index, animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                      >
                        <Link
                          className={`${pathname === link.href && activeClass}`}
                          href={link.href} >
                          {link.text}
                        </Link>
                      </li>
                    ))
                  }

                  <li
                    style={{ '--i': 5, animationDelay: `${5 * 0.1}s` } as React.CSSProperties}
                  >
                    <NavbarLogoutModal setShowMenu={setShowMenu} />
                  </li>
                  <li
                    style={{ '--i': 6, animationDelay: `${6 * 0.1}s` } as React.CSSProperties}
                  >
                    <ThemeSwitcher />
                  </li>
                </ul>

              </nav>

            </div>
          </>
        )
      }

    </>
  )
}
