"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import PagosHeader from "../../Pagos_Header";
import { useState } from "react";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { shortVenc } from "@/app/_lib/utils/shortVenc";
import PendienteMovilAction from "./Pendiente_Movil_Action";

const movilTableHeader = ["", "venc", "rubro", "sector", "monto", "  "]

export default function PendienteMovilList({ pendientes }: { pendientes: PagoType[] }) {

  const [calcPagos, setCalcPagos] = useState<string[]>([])

  const handleChange = (id: string) => {
    if (calcPagos.includes(id)) {
      setCalcPagos(calcPagos.filter(p => p !== id))
    } else {
      setCalcPagos([...calcPagos, id])
    }
  }

  return (
    <article className="flex flex-col justify-center items-center w-full">

      <PagosHeader
        calcPagos={calcPagos}
        pendientes={pendientes}
      />

      <div className="table-container relative overflow-hidden">

        <table className="table table-pendiente">
          <thead>
            <tr className='font-bold tracking-wider border-b border-foreground25'>
              {
                movilTableHeader.map(thMovilName => <th className="text-base" key={thMovilName}>{thMovilName}</th>)
              }
            </tr>
          </thead>
          <tbody>

            {
              pendientes.map(pendiente =>
                <tr key={pendiente._id} className={`${pendiente.rubro} hover:brightness-75 border-b border-foreground25`}>
                  <td className="px-0 text-center">
                    <input
                      type="checkbox"
                      className={`size-3 ${calcPagos.includes(pendiente._id) ? "opacity-100" : "opacity-50"}`}
                      defaultChecked={calcPagos.includes(pendiente._id)}
                      onChange={() => handleChange(pendiente._id)}
                    />
                  </td>
                  <td className="px-0">{shortVenc(pendiente.vencimiento)}</td>
                  <td className="px-0">{pendiente.rubro}</td>
                  <td className="px-0">{pendiente.sector}</td>
                  <td className="px-0">{montoFormat(Number(pendiente.monto))}</td>
                  <td className="px-0 m-0 text-center"><PendienteMovilAction pendiente={pendiente} /></td>
                </tr>
              )
            }

          </tbody>
        </table>

      </div>


    </article>
  )
}