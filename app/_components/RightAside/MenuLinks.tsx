"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function MenuLinks() {

  const pathname = usePathname()

  return (
    <nav className='flex gap-3'>
      <ActualLink text={'pendientes'} pathname={pathname} href={"/pendientes"} />
      <ActualLink text={'realizados'} pathname={pathname} href={"/realizados"} />
      <ActualLink text={'admin'} pathname={pathname} href={"/admin"} />


      <div className={`${pathname.includes("/admin") ? "block" : "hidden"} text-xs w-full flex justify-center items-center gap-3`}>
        {/* <Link className={`tracking-widest text-center font-bold ${pathname === "/admin/sectores" ? "border-b-2 border-slate-200" : "border-b-2 border-transparent"}`} href={"/admin/sectores?type=actuales"}>sectores</Link>
        <Link className={`tracking-widest text-center font-bold ${pathname === "/admin/weblinks" ? "border-b-2 border-slate-200" : "border-b-2 border-transparent"}`} href={"/admin/weblinks"}>weblinks</Link> */}
        <ActualLink text={'sectores'} pathname={pathname} href={"/admin/sectores?type=actuales"} />
        <ActualLink text={'weblink'} pathname={pathname} href={"/admin/weblinks"} />
      </div>
    </nav>
  )
}

const ActualLink = ({ text, pathname, href }: { text: string, pathname: string, href: string }) => {

  return (
    <Link
      className={`tracking-widest text-center font-bold px-2 py-1 ${pathname.includes(text)
        ? "border-b-2 border-slate-200"
        : "border-b-2 border-transparent"}`}
      href={href}
    >
      {text}
    </Link>
  )
}