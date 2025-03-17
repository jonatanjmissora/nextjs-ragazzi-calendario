"use client"

import { useState } from "react"
import PagosHeader from "../../Pagos_Header"
import montoFormat from "@/app/_lib/utils/montoFormat"
import { PagoType } from "@/app/_lib/schema/pago.type"
import PendienteDesktopAction from "./Pendiente_Desktop_Action"
import { shortVenc } from "@/app/_lib/utils/shortVenc"

const desktopTableHeader = ["", "venc", "rubro", "sector", "monto", "accion"]

export default function PendienteDesktopList({ pendientes }: { pendientes: PagoType[] }) {

  const [calcPagos, setCalcPagos] = useState<string[]>([])

  const handleChange = (id: string) => {
    if (calcPagos.includes(id)) {
      setCalcPagos(calcPagos.filter(p => p !== id))
    } else {
      setCalcPagos([...calcPagos, id])
    }
  }

  return (
    <>

      <PagosHeader
        calcPagos={calcPagos}
        pendientes={pendientes}
      />
      <div className="table-container h-full relative">

        <table className="table overflow-y-scroll">
          <thead>
            <tr className='text-base border-b border-foreground25 bg-navbg'>
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
                      className={`${calcPagos.includes(pendiente._id) ? "opacity-100" : "opacity-50"}`}
                      defaultChecked={calcPagos.includes(pendiente._id)}
                      onChange={() => handleChange(pendiente._id)}
                    />
                  </td>
                  <td>{shortVenc(pendiente.vencimiento)}</td>
                  <td>{pendiente.rubro}</td>
                  <td>{pendiente.sector}</td>
                  <td>{montoFormat(Number(pendiente.monto))}</td>
                  <td className="p-0"> <PendienteDesktopAction pendiente={pendiente} /></td>
                </tr>
              )
            }

          </tbody>
        </table>

      </div>
    </>
  )
}
