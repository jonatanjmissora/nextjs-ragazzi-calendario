"use client"

import HistogramSVG from "@/app/_assets/HistogramSVG";
import PlusSVG from "@/app/_assets/PlusSVG";
import { PagoType } from "@/app/_lib/schema/pago.type";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { useState } from "react";

export default function RealizadosList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {

  const [actualRealizado, setActualRealizado] = useState<PagoType>(allRealizados[0])

  return (
    <>
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
    </>
  )
}

const Pago = ({ realizado, allRealizados, actualRealizado, setActualRealizado }
  : { realizado: PagoType, allRealizados: PagoType[], actualRealizado: PagoType, setActualRealizado: React.Dispatch<React.SetStateAction<PagoType>> }
) => {

  return (
    <tr key={realizado._id} className="hover">
      <td className="inline-flex">
        <Modal
          allRealizados={allRealizados}
          realizado={realizado}
          actualRealizado={actualRealizado}
          setActualRealizado={setActualRealizado}
        />
      </td>

      <td>{realizado.vencimiento}</td>
      <td>{realizado.rubro}</td>
      <td>{realizado.sector}</td>
      <td>{montoFormat(realizado.monto)}</td>
      <td>{realizado.pagado}</td>
    </tr>
  )
}

const Modal = ({ allRealizados, realizado, actualRealizado, setActualRealizado }: { allRealizados: PagoType[], realizado: PagoType, actualRealizado: PagoType, setActualRealizado: React.Dispatch<React.SetStateAction<PagoType>> }) => {

  const histogramArray = allRealizados
    .filter(pago => pago.rubro === actualRealizado.rubro && pago.sector === actualRealizado.sector)
    .slice(0, 13)
  const maximoMonto = Math.max(...histogramArray.map(pago => Number(pago.monto)))

  const getMontoHeight = (monto: string) => {
    return (Number(monto) / maximoMonto * 7)
  }

  const handleClick = (realizado: PagoType) => {
    const dialog = document?.getElementById('my_modal_3') as HTMLDialogElement
    dialog?.showModal()
    setActualRealizado(realizado)
  }

  return (
    <>
      <button className="" onClick={() => handleClick(realizado)}>
        <HistogramSVG className="size-5" currentColor="#ccc" />
      </button>
      <dialog id="my_modal_3" className="w-full h-full bg-transparent relative">
        <div className="w-3/4 py-20 p-10 bg-slate-900 rounded-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <PlusSVG className="size-7 rotate-45 text-slate-300" currentColor="currentColor" />
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">{actualRealizado.rubro} - {actualRealizado.sector}</h3>
          <div className="flex flex-row-reverse justify-center items-end overflow-hidden">
            {
              histogramArray.map(pago => <Bar key={pago.vencimiento} fecha={pago.vencimiento} monto={montoFormat(pago.monto)} heightPercentage={getMontoHeight(pago.monto)} />)
            }
          </div>
        </div>
      </dialog>
    </>
  )
}

const Bar = ({ fecha, monto, heightPercentage }: { fecha: string, monto: string, heightPercentage: number }) => {

  const isLower = (!heightPercentage || heightPercentage < 3) ? true : false
  return (
    <div className="w-[20%] sm:w-[10%] text-center my-2 mx-1">
      <div
        style={{ height: `${heightPercentage}rem` }}
        className={`relative w-full text-xs bg-primary/25 rounded-t-lg border-on-top pt-1 flex justify-center`}>
        <span className={`absolute ${isLower ? "-top-5 text-my-black" : "top-2"}`}>$ {montoFormat(Number(monto))}</span>
      </div>
      <p className="w-full text-xs text-center text-my-black mt-1">{fecha.substring(0, 7)}</p>
    </div>
  )
}