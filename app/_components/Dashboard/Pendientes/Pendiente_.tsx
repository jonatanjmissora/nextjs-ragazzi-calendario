"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import PendienteAction from "./Pendiente_Action";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { useState } from "react";
import PagosHeader from "../Pagos_Header";

const tableHeader = ["", "vencimiento", "rubro", "sector", "monto", "accion"]

export default function PendientesList({ pendientes }: { pendientes: PagoType[] }) {

  const [calcPagos, setCalcPagos] = useState<string[]>([])

  const handleChange = (id: string) => {
    if (calcPagos.includes(id)) {
      setCalcPagos(calcPagos.filter(p => p !== id))
    } else {
      setCalcPagos([...calcPagos, id])
    }
  }

  if (pendientes.length === 0) return <div className="flex-1 flex justify-center items-center"><h1 className="text-center text-2xl">No hay pagos registrados...</h1></div>

  return (
    <article className="ml-[10rem]"> 

      <PagosHeader
        calcPagos={calcPagos}
        pendientes={pendientes}
      />
      <div className="table-container relative pr-8">

        <table className="table">
          {/* head */}
          <thead>
            <tr className='text-lg border-b border-foreground25'>
              {
                tableHeader.map(thName => <th key={thName}>{thName}</th>)
              }
            </tr>
          </thead>
          <tbody>

            {
              pendientes.map(pendiente =>

                <tr key={pendiente._id} className={`${pendiente.rubro} hover:brightness-75 border-b border-foreground25`}>
                  <td>
                    <input
                      type="checkbox"
                      className={`mx-3 checkbox-xs ${calcPagos.includes(pendiente._id) ? "opacity-100" : "opacity-20"}`}
                      defaultChecked={calcPagos.includes(pendiente._id)}
                      onChange={() => handleChange(pendiente._id)}
                    />
                  </td>
                  <td>{pendiente.vencimiento}</td>
                  <td>{pendiente.rubro}</td>
                  <td>{pendiente.sector}</td>
                  <td>{montoFormat(Number(pendiente.monto))}</td>
                  <td className=""><PendienteAction pendiente={pendiente} /></td>
                </tr>
              )
            }

          </tbody>
        </table>

      </div>
    </article>
  )
}
