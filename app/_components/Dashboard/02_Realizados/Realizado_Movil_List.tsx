"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import { useState } from "react";
import PagosHeader from "../Pagos_Header";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { shortVenc } from "@/app/_lib/utils/shortVenc";
import { RealizadoMovilHisto } from "./Realizado_Movil_Histo";

const movilTableHeader = ["venc", "rubro", "sector", "monto", "pag", ""]

export default function RealizadoMovilList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {

  const [actualRealizado, setActualRealizado] = useState<PagoType>(allRealizados[0])

  return (

    <article className="w-full flex flex-col justify-center items-center">

      <PagosHeader />

      <div className="table-container relative overflow-hidden">

        <table className="table">
          <thead>
            <tr className='font-bold tracking-wider border-b border-foreground25'>
              {
                movilTableHeader.map(thName => <th className="px-1 text-base" key={thName}>{thName}</th>)
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
    <tr key={realizado._id} className={`${realizado.rubro} hover:brightness-75 border-b border-foreground25  `}>

      <td className="px-2">{shortVenc(realizado.vencimiento)}</td>
      <td className="px-0">{realizado.rubro}</td>
      <td className="px-0">{realizado.sector}</td>
      <td className="px-0">{montoFormat(Number(realizado.monto))}</td>
      <td className="px-0">{shortVenc(realizado.pagado ?? "")}</td>
      <td className="px-3 m-0">
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