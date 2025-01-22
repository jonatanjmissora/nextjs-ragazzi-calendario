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

  return (
    <article className="flex-1">

      <PagosHeader
        calcPagos={calcPagos}
        pendientes={pendientes}
      />
      <div className="table-container relative px-8">

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

      </div>
    </article>
  )
}
