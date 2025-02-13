import React from 'react'
import Loading from './Loading'

export default function SkeltonDesktopEditForm({pagoType}: {pagoType: string}) {
  return (
    <div className="h-full w-full flex justify-center items-center">

      
          <div className="edit-form-container flex flex-col gap-4 min-w-80 card">
            <h2 className="text-xl tracking-wider font-bold">Editar pago {pagoType}:</h2>

            <div className="input-main h-[42px]"><span className="size-4 loading loading-bars text-primary mx-2"></span></div>

            <div className="input-main"><span className="size-4 loading loading-bars text-primary mx-2"></span></div>

            <div className="input-main"><span className="size-4 loading loading-bars text-primary mx-2"></span></div>

            <div className="input-main h-[42px]"><span className="size-4 loading loading-bars text-primary mx-2"></span></div>

            <span className="text-transparent"></span>

            <div className="w-full flex gap-1">
              <button className="btn-main size-11 w-1/2">Editar</button>
              <button className="btn-main-error w-1/2">Cancelar</button>
            </div>

          </div>
      
    </div>
  )
}
