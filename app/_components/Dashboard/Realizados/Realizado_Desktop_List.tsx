"use client"

import { PagoType } from "@/app/_lib/schema/pago.type";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { useState } from "react";
import PagosHeader from "../Pagos_Header";
import { RealizadoDesktopHisto } from "./Realizado_Desktop_Histo";

const desktopTableHeader = ["", "venc", "rubro", "sector", "monto", "pagado"]

export default function RealizadoDesktopList({ realizados, allRealizados }: { realizados: PagoType[], allRealizados: PagoType[] }) {

  const [actualRealizado, setActualRealizado] = useState<PagoType>(allRealizados[0])

  return (

    <article className="hidden w-full sm:flex flex-col justify-center items-center">

      <PagosHeader />

      <div className="table-container relative">

        <table className="table">
          {/* head */}
          <thead>
            <tr className='text-lg border-b border-foreground25'>
              {
                desktopTableHeader.map(thName => <th key={thName}>{thName}</th>)
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
        <RealizadoDesktopHisto
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

