"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { useState } from "react";
import { RealizadosModal } from "./Realizados_Modal";

const tableHeader = ["histo", "vencimiento", "rubro", "sector", "monto", "pagado"]

export default function RealizadosList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {

  const [actualRealizado, setActualRealizado] = useState<PagoType>(allRealizados[0])

  return (

    <div className="h-full table-container px-40 py-12 flex-1">
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
  )
}

const Pago = ({ realizado, allRealizados, actualRealizado, setActualRealizado }
  : { realizado: PagoType, allRealizados: PagoType[], actualRealizado: PagoType, setActualRealizado: React.Dispatch<React.SetStateAction<PagoType>> }
) => {

  return (
    <tr key={realizado._id} className="hover">
      <td className="inline-flex">
        <RealizadosModal
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

