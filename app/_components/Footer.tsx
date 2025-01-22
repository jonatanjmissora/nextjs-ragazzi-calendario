import Image from 'next/image'
import React from 'react'
import { getCachedWeblinksAction } from '../_lib/actions/weblinks.action'
import { WeblinkType } from '../_lib/schema/weblink.type'
import WebSVG from '../_assets/WebSVG'
import Link from 'next/link'
import getUserFromCookie from '../_lib/utils/getUserFromCookies'

export default async function Footer() {

  const year = new Date().getFullYear()
  const weblinks = await getCachedWeblinksAction() as WeblinkType[]
  const user = await getUserFromCookie()

  return (
    <footer className='text-slate-400 footer-height w-full flex justify-end items-center px-5'>

      {
        user &&
        <div className='mr-auto flex gap-2 items-center w-8 overflow-hidden hover:w-[20rem]'>
          <span className='w-8'><WebSVG className='size-7 text-slate-500' currentColor={"currentColor"} /></span>
          {weblinks.map(weblink => <Weblink key={weblink._id} weblink={weblink} />)}
        </div>
      }

      <span>K@to {year}</span>

    </footer>
  )
}

const Weblink = ({ weblink }: { weblink: WeblinkType }) => {

  return (
    <Link href={weblink.href} target="_blank" className="w-[8dvh] h-[4dvh] bg-slate-700/50 rounded-md overflow-hidden relative">
      <Image src={"data:image/jpeg;base64," + weblink.imgData} alt={weblink._id} fill className="p-1" />
    </Link>
  )
}
