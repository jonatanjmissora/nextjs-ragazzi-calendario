import { PagoType } from "@/app/_lib/schema/pago.type"
import montoFormat from "@/app/_lib/utils/montoFormat"
import AdminRealizadoMovilAction from "./Admin_Realizado_Movil_Action"
import { shortVenc } from "@/app/_lib/utils/shortVenc"

const tableHeader = ["venc", "rubro", "sector", "monto", "pagado", ""]

export default function AdminRealizadoMovilList({ realizados }: { realizados: PagoType[] }) {

    return (
        <article className="w-full flex flex-col justify-center items-center">
        
            <div className="table-container relative">
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
                    />
                    )
                }
                </tbody>
            </table>
            </div>
        </article>
    )
  }
  
const Pago = ({ realizado }
: { realizado: PagoType }
) => {

return (
    <tr key={realizado._id} className={`${realizado.rubro} hover:brightness-75 border-b border-foreground25`}>
    <td>{shortVenc(realizado.vencimiento)}</td>
    <td>{realizado.rubro}</td>
    <td>{realizado.sector}</td>
    <td>{montoFormat(Number(realizado.monto))}</td>
    <td>{shortVenc(realizado.pagado ?? "")}</td>
    <td className="p-0 m-0"><AdminRealizadoMovilAction realizado={realizado} /></td>
    </tr>
)
}
