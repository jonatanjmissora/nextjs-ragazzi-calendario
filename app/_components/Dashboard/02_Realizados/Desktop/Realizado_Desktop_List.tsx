import { PagoType } from "@/app/_lib/schema/pago.type";
import montoFormat from "@/app/_lib/utils/montoFormat";
import PagosHeader from "../../Pagos_Header";
import { Suspense } from "react";
import RealizadoDesktopHistoContainer from "./Realizado_Desktop_Histo_Container";

const desktopTableHeader = ["", "venc", "rubro", "sector", "monto", "pagado"]

export default function RealizadoDesktopList({ realizados }: { realizados: PagoType[] }) {

  return (

    <>

      <PagosHeader />

      <div className="table-container relative">

        <table className="table table-realizado">
          <thead>
            <tr className='text-base border-b border-foreground25'>
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
                  realizado={realizado} />
              )
            }

          </tbody>
        </table>
      </div>
    </>
  )
}

const Pago = ({ realizado }: { realizado: PagoType }
) => {

  return (
    <tr key={realizado._id} className={`${realizado.rubro} hover:brightness-75 border-b border-foreground25`}>
      <td>

        <Suspense key={Math.random()} fallback={<span className="size-4 loading loading-bars"></span>}>
          <RealizadoDesktopHistoContainer
            realizado={realizado}
          />
        </Suspense>

      </td>

      <td>{realizado.vencimiento}</td>
      <td>{realizado.rubro}</td>
      <td>{realizado.sector}</td>
      <td>{montoFormat(Number(realizado.monto))}</td>
      <td>{realizado.pagado}</td>
    </tr>
  )
}

