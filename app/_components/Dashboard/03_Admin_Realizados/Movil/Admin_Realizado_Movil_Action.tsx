"use client"

import DotsSVG from "@/app/_assets/DotsSVG copy"
import PlusSVG from "@/app/_assets/PlusSVG"
import { PagoType } from "@/app/_lib/schema/pago.type"
import montoFormat from "@/app/_lib/utils/montoFormat"
import { shortVenc } from "@/app/_lib/utils/shortVenc"
import { useRef } from "react"
import AdminRealizadoAction from "../Admin_Realizado_Action"

export default function AdminRealizadoMovilAction({ realizado }: { realizado: PagoType }) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <DotsSVG className="size-5 text-foreground" currentColor="currentColor" />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card p-4 text-[#222] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">

          <div className="flex flex-col gap-4">

            <div className="w-full">
              <button className="block ml-auto" onClick={() => dialogRef.current?.close()}>
                <PlusSVG className=" size-7 rotate-45 text-[#222] hover:text-black85" currentColor="currentColor" />
              </button>
            </div>

            <Table realizado={realizado} />

            <div className="w-full flex justify-end">
              <span>pagado: {realizado.pagado}</span>
            </div>

            <AdminRealizadoAction
              realizado={realizado}
              dialogRef={dialogRef}
            />

          </div>

        </div>
      </dialog>
    </>
  )
}


const Table = ({ realizado }: { realizado: PagoType }) => {
  return (
    <table className="table">
      <thead>
        <tr className="text-sm text-[#222] font-bold tracking-wider border-b border-black80">
          <td>venc</td>
          <td>rubro</td>
          <td>sector</td>
          <td>monto</td>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-black80">
          <td>{shortVenc(realizado.vencimiento)}</td>
          <td>{realizado.rubro}</td>
          <td>{realizado.sector}</td>
          <td>{montoFormat(Number(realizado.monto))}</td>
        </tr>
      </tbody>
    </table>
  )
}
