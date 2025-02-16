import React from 'react'
import SkeltonInput from './Skelton_Input'
import SubmitBtn from '../SubmitBtn'

export default function SkeltonAdminWeblinksEditForm() {
  return (
    <>
      <div className="flex flex-col gap-10 weblink-edit">

      <div className="text-xl font-bold tracking-wide py-4 my-4 border-b border-foreground25 w-full"><SkeltonInput className='w-28 h-7'/></div>

        <div className="w-full flex items-center justify-center gap-4">

          <div className="flex flex-col gap-2 h-max">
            <div className="w-[160px] h-[100px] bg-foreground80 animate-pulse rounded-lg shadow border border-black25 overflow-hidden p-2"></div>
            

            <SkeltonInput className='w-[160px] h-8'/>
          </div>

          <div className="w-full flex flex-col justify-between items-start text-center gap-1">
            <label htmlFor="_id">titulo</label>
            <SkeltonInput className='w-[42rem] h-11'/>
            <label htmlFor="href">href</label>
            <SkeltonInput className='w-[42rem] h-11'/>
          </div>


        </div>

        <div className="w-full flex flex-col justify-end items-end gap-2">
          <div className="w-1/2 flex gap-2">
            <SubmitBtn text={"Upload"} isPending={false} className="size-11" />
            <button className="btn-main-error" >Cancelar</button>
          </div>
          
        </div>

      </div>

    </>
  )
}
