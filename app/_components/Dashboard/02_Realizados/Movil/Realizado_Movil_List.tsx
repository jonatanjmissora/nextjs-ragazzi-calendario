import { PagoType } from "@/app/_lib/schema/pago.type";
import PagosHeader from "../../Pagos_Header";
import montoFormat from "@/app/_lib/utils/montoFormat";
import { shortVenc } from "@/app/_lib/utils/shortVenc";
import { Suspense } from "react";
import RealizadoMovilHistoContainer from "./Realizado_Movil_Histo_Container";

const movilTableHeader = ["venc", "rubro", "sector", "monto", "pag", ""]

export default function RealizadoMovilList({ realizados }: { realizados: PagoType[] }) {

  return (

    <>

      <PagosHeader />

      <div className="table-container relative overflow-hidden">

        <table className="table table-realizado">
          <thead>
            <tr className='text-base border-b border-foreground25'>
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
                  realizado={realizado}/>
              )
            }

          </tbody>
        </table>
      </div>
    </>
  )
}

const Pago = ({ realizado }: { realizado: PagoType }) => {

  return (
    <tr key={realizado._id} className={`${realizado.rubro} hover:brightness-75 border-b border-foreground25`}>

      <td className="px-0">{shortVenc(realizado.vencimiento)}</td>
      <td className="px-0">{realizado.rubro}</td>
      <td className="px-0">{realizado.sector}</td>
      <td className="px-0">{montoFormat(Number(realizado.monto))}</td>
      <td className="px-0">{shortVenc(realizado.pagado ?? "")}</td>
      <td className="m-0">
        <Suspense key={Math.random()} fallback={<span className="size-4 loading loading-bars"></span>}>
          <RealizadoMovilHistoContainer
            realizado={realizado}
          />
        </Suspense>
      </td>

    </tr>
  )
}