"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import { useRef, useState } from "react";
import PagosHeader from "../Pagos_Header";
import { RealizadosHisto } from "./Realizados_Histo";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { shortVenc } from "@/app/_lib/utils/shortVenc";
import DotsSVG from "@/app/_assets/DotsSVG copy";
import PlusSVG from "@/app/_assets/PlusSVG";
import RealizadoDesktopAction from "./Reallizado_Desktop_Action";

const movilTableHeader = ["venc", "rubro", "sector", "monto", "pagado"]

export default function RealizadoMovilList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {

  const [actualRealizado, setActualRealizado] = useState<PagoType>(allRealizados[0])

  if (realizados.length === 0) return <div className="flex-1 flex justify-center items-center"><h1 className="text-center text-2xl">No hay pagos registrados...</h1></div>

  return (

    <article className="sm:hidden w-full flex flex-col justify-center items-center">

      <PagosHeader />

      <div className="table-container relative">

        <table className="table">
          {/* head */}
          <thead>
            <tr className='text-base border-b border-foreground25'>
              {
                movilTableHeader.map(thName => <th key={thName}>{thName}</th>)
              }
            </tr>
          </thead>
          <tbody>

            {
              realizados.map(realizado =>
                <Pago
                  key={realizado._id}
                  realizado={realizado}
                  allRealizados={allRealizados}
                  actualRealizado={actualRealizado}
                  setActualRealizado={setActualRealizado} />
              )
            }

          </tbody>
        </table>
      </div>
    </article>
  )
}

const Pago = ({ realizado, allRealizados, actualRealizado, setActualRealizado }
  : { realizado: PagoType, allRealizados: PagoType[], actualRealizado: PagoType, setActualRealizado: React.Dispatch<React.SetStateAction<PagoType>> }
) => {

  return (
    <tr key={realizado._id} className={`${realizado.rubro} hover:brightness-75 border-b border-foreground25 text-xs`}>

      <td>{shortVenc(realizado.vencimiento)}</td>
      <td>{realizado.rubro}</td>
      <td>{realizado.sector}</td>
      <td>{montoFormat(Number(realizado.monto))}</td>
      <td><Modal realizado={realizado} /></td>

    </tr>
  )
}

const Modal = ({ realizado }: { realizado: PagoType }) => {

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
              <span>{shortVenc(realizado.vencimiento)}</span>
              <span>{realizado.rubro}</span>
              <span>{realizado.sector}</span>
              <span>$ {montoFormat(Number(realizado.monto))}</span>
            </div>
            <span className="ml-auto text-base">pagado: {realizado?.pagado}</span>
            <RealizadoDesktopAction realizado={realizado} />
          </div>
        </div>
      </dialog>
    </>
  )
}