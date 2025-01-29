"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import PagosHeader from "../Pagos_Header";
import { useRef, useState } from "react";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { shortVenc } from "@/app/_lib/utils/shortVenc";
import DotsSVG from "@/app/_assets/DotsSVG copy";
import PendienteDesktopAction from "./Pendiente_Desktop_Action";
import PlusSVG from "@/app/_assets/PlusSVG";

const movilTableHeader = ["", "venc", "rubro", "sector", "monto", "  "]

export default function PendienteListMovil({ pendientes }: { pendientes: PagoType[] }) {

  const [calcPagos, setCalcPagos] = useState<string[]>([])

  const handleChange = (id: string) => {
    if (calcPagos.includes(id)) {
      setCalcPagos(calcPagos.filter(p => p !== id))
    } else {
      setCalcPagos([...calcPagos, id])
    }
  }

  return (
    <article className="sm:hidden flex flex-col justify-center items-center w-full">

      <PagosHeader
        calcPagos={calcPagos}
        pendientes={pendientes}
      />

      <div className="table-container relative">

        <table className="table">
          {/* head */}
          <thead>
            <tr className='text-xs border-b border-foreground25'>
              {
                movilTableHeader.map(thMovilName => <th key={thMovilName}>{thMovilName}</th>)
              }
            </tr>
          </thead>
          <tbody>

            {
              pendientes.map(pendiente =>
                <tr key={pendiente._id} className={`${pendiente.rubro} hover:brightness-75 border-b border-foreground25 text-xs`}>
                  <td>
                    <input
                      type="checkbox"
                      className={`${calcPagos.includes(pendiente._id) ? "opacity-100" : "opacity-20"}`}
                      defaultChecked={calcPagos.includes(pendiente._id)}
                      onChange={() => handleChange(pendiente._id)}
                    />
                  </td>
                  <td>{shortVenc(pendiente.vencimiento)}</td>
                  <td>{pendiente.rubro}</td>
                  <td>{pendiente.sector}</td>
                  <td>{montoFormat(Number(pendiente.monto))}</td>
                  <td className="p-0 m-0"><Modal pendiente={pendiente} /></td>
                </tr>
              )
            }

          </tbody>
        </table>

      </div>


    </article>
  )
}


const Modal = ({ pendiente }: { pendiente: PagoType }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <DotsSVG className="size-5 text-foreground" currentColor="currentColor" />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card p-4 text-[#222] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="flex flex-col gap-8">
            <div className="w-full">
              <button className="block ml-auto" onClick={() => dialogRef.current?.close()}>
                <PlusSVG className=" size-7 rotate-45 text-[#222] hover:text-black85" currentColor="currentColor" />
              </button>
            </div>
            <div className="w-full flex justify-between items-center text-base">
              <span>{shortVenc(pendiente.vencimiento)}</span>
              <span>{pendiente.rubro}</span>
              <span>{pendiente.sector}</span>
              <span>$ {montoFormat(Number(pendiente.monto))}</span>
            </div>
            <PendienteDesktopAction pendiente={pendiente} />
          </div>
        </div>
      </dialog>
    </>
  )
}