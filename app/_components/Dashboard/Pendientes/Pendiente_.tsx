"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import PendienteAction from "./Pendiente_Action";
import montoFormat from "@/app/_lib/utils/montoFormat";
import Calculadora from "./Calculadora";
import { useState } from "react";

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

  return (
    <div className="h-full table-container px-40 py-12 flex-1 relative">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {
              tableHeader.map(thName => <th key={thName}>{thName}</th>)
            }
          </tr>
        </thead>
        <tbody>

          {
            pendientes.map(pendiente =>

              <tr key={pendiente._id} className="hover">
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox-xs ${calcPagos.includes(pendiente._id) ? "opacity-100" : "opacity-10"}`}
                    defaultChecked={calcPagos.includes(pendiente._id)}
                    onChange={() => handleChange(pendiente._id)}
                  />
                </td>
                <td>{pendiente.vencimiento}</td>
                <td>{pendiente.rubro}</td>
                <td>{pendiente.sector}</td>
                <td>{montoFormat(pendiente.monto)}</td>
                <td className="px-0"><PendienteAction pendiente={pendiente} /></td>
              </tr>
            )
          }

        </tbody>
      </table>
      <Calculadora calcPagos={calcPagos} pendientes={pendientes} />
    </div>
  )
}
