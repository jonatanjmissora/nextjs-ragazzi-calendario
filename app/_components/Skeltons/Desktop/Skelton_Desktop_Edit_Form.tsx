import React from 'react'
import SkeltonInput from '../Skelton_Input'

export default function SkeltonDesktopEditForm({ pagoType }: { pagoType: string }) {
  return (
    <div className="h-full w-full flex justify-center items-center">


      <div className="edit-form-container flex flex-col gap-4 min-w-80 card">
        <h2 className="text-xl tracking-wider font-bold">Editar pago {pagoType}:</h2>

        <div className="flex flex-col gap-1">
          <span className="text-xs">vencimiento</span>
          <div className="input-main h-11 flex items-center"><SkeltonInput className='bg-black80 w-20 h-5' /></div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs">rubro</span>
          <div className="input-main h-11 flex items-center"><SkeltonInput className='bg-black80 w-20 h-5' /></div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs">sector</span>
          <div className="input-main h-11 flex items-center"><SkeltonInput className='bg-black80 w-20 h-5' /></div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs">monto</span>
          <div className="input-main h-11 flex items-center"><SkeltonInput className='bg-black80 w-20 h-5' /></div>
        </div>

        {
          pagoType === "realizado" &&
          <div className="flex flex-col gap-1">
            <span className="text-xs" >pagado</span>
            <div className="input-main h-11 flex items-center"><SkeltonInput className='bg-black80 w-20 h-5' /></div>
          </div>
        }

        <span className="text-transparent"></span>

        <div className="w-full flex gap-1">
          <button className="btn-main size-11 w-1/2">Editar</button>
          <button className="btn-main-error w-1/2">Cancelar</button>
        </div>

      </div>

    </div>
  )
}
