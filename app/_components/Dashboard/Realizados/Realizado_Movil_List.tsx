"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import { useState } from "react";
import PagosHeader from "../Pagos_Header";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { shortVenc } from "@/app/_lib/utils/shortVenc";
import { RealizadoMovilHisto } from "./Realizado_Movil_Histo";

const movilTableHeader = ["venc", "rubro", "sector", "monto", "pagado"]

export default function RealizadoMovilList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {

  const [actualRealizado, setActualRealizado] = useState<PagoType>(allRealizados[0])

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
      <td>
        <RealizadoMovilHisto
          allRealizados={allRealizados}
          realizado={realizado}
          actualRealizado={actualRealizado}
          setActualRealizado={setActualRealizado}
        />
      </td>

    </tr>
  )
}