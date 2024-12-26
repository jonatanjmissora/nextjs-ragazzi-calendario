import React from 'react'
import RubroFilter from './RubroFilter'
import MenuLinks from './MenuLinks'
import UserLogout from './UserLogout'
import getUserFromCookie from '@/app/_lib/utils/getUserFromCookies'
import { JwtPayload } from 'jsonwebtoken'

export default async function RightSide() {

  const user = await getUserFromCookie() as JwtPayload

  return (
    <div className='main-height rightAside-width flex flex-col justify-between items-center bg-slate-800 px-8 py-2'>
      <UserLogout username={user?.username} />
      <RubroFilter />
      <MenuLinks />
    </div>
  )
}