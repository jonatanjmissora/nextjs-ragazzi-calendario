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

      <div className={`${pathname.includes("/admin") ? "block" : "hidden"}   w-full flex justify-center items-center gap-3`}>
        <ActualLink text={'sectores'} pathname={pathname} href={"/admin/sectores?type=actuales"} />
        <ActualLink text={'weblink'} pathname={pathname} href={"/admin/weblinks"} />
      </div>
    </nav>
  )
}

const ActualLink = ({ text, pathname, href }: { text: string, pathname: string, href: string }) => {

  return (
    <Link
      className={`badge-main ${pathname.includes(text)
        && "bg-foreground25"}`}
      href={href}
    >
      {text}
    </Link>
  )
}