"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { useState } from "react";
import { RealizadosModal } from "./Realizados_Modal";
import PagosHeader from "../Pagos_Header";

const tableHeader = ["histo", "vencimiento", "rubro", "sector", "monto", "pagado"]

export default function RealizadosList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {

  const [actualRealizado, setActualRealizado] = useState<PagoType>(allRealizados[0])

  if (realizados.length === 0) return <div className="flex-1 flex justify-center items-center"><h1 className="text-center text-2xl">No hay pagos registrados...</h1></div>

  return (

    <article className="flex-1">

      <PagosHeader />

      <div className="table-container relative px-8">

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
    <tr key={realizado._id} className={`${realizado.rubro} hover:brightness-75 border-b border-foreground25`}>
      <td className="inline-flex mx-3">
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
      <td>{montoFormat(Number(realizado.monto))}</td>
      <td>{realizado.pagado}</td>
    </tr>
  )
}

