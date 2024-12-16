import React from 'react'
import RubroFilter from './RubroFilter'
import MenuLinks from './MenuLinks'

export default function RightSide() {
  return (
    <div className='h-[95dvh] flex flex-col justify-between bg-slate-800 p-8'>
        <RubroFilter />
        <MenuLinks />
    </div>
  )
}