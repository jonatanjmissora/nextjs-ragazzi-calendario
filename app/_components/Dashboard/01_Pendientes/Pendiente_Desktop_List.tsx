"use client"

import { useState } from "react"
import PagosHeader from "../Pagos_Header"
import montoFormat from "@/app/_lib/utils/montoFormat"
import { PagoType } from "@/app/_lib/schema/pago.type"
import PendienteDesktopAction from "./Pendiente_Desktop_Action"

const desktopTableHeader = ["", "vencimiento", "rubro", "sector", "monto", "accion"]

export default function PendienteListDesktop({ pendientes }: { pendientes: PagoType[] }) {

  const [calcPagos, setCalcPagos] = useState<string[]>([])

  const handleChange = (id: string) => {
    if (calcPagos.includes(id)) {
      setCalcPagos(calcPagos.filter(p => p !== id))
    } else {
      setCalcPagos([...calcPagos, id])
    }
  }

  return (
    <article className="flex w-full flex-col justify-center items-center">

      <PagosHeader
        calcPagos={calcPagos}
        pendientes={pendientes}
      />
      <div className="table-container relative">

        <table className="table">
          {/* head */}
          <thead>
            <tr className='        border-b border-foreground25'>
              {
                desktopTableHeader.map(thDesktopName => <th key={thDesktopName}>{thDesktopName}</th>)
              }
            </tr>
          </thead>
          <tbody>

            {
              pendientes.map(pendiente =>

                <tr key={`desktop-${pendiente._id}`} className={`${pendiente.rubro} hover:brightness-75 border-b border-foreground25`}>
                  <td>
                    <input
                      type="checkbox"
                      className={`mx-3 ${calcPagos.includes(pendiente._id) ? "opacity-100" : "opacity-20"}`}
                      defaultChecked={calcPagos.includes(pendiente._id)}
                      onChange={() => handleChange(pendiente._id)}
                    />
                  </td>
                  <td>{pendiente.vencimiento}</td>
                  <td>{pendiente.rubro}</td>
                  <td>{pendiente.sector}</td>
                  <td>{montoFormat(Number(pendiente.monto))}</td>
                  <td className="p-0 m-0"><PendienteDesktopAction pendiente={pendiente} /></td>
                </tr>
              )
            }

          </tbody>
        </table>

      </div>
    </article>
  )
}
