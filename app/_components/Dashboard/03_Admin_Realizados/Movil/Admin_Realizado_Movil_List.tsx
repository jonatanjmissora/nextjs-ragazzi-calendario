import { PagoType } from "@/app/_lib/schema/pago.type"
import montoFormat from "@/app/_lib/utils/montoFormat"
import AdminRealizadoMovilAction from "./Admin_Realizado_Movil_Action"
import { shortVenc } from "@/app/_lib/utils/shortVenc"

const tableHeader = ["venc", "rubro", "sector", "monto", "pag", ""]

export default function AdminRealizadoMovilList({ realizados }: { realizados: PagoType[] }) {

    return (
        <article className="w-full flex flex-col justify-center items-center">

            <div className="table-container relative overflow-hidden">
                <table className="table">
                    <thead>
                        <tr className='font-bold tracking-wider border-b border-foreground25'>
                            {
                                tableHeader.map(thName => <th className="px-1 text-base" key={thName}>{thName}</th>)
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
            <td className="px-2">{shortVenc(realizado.vencimiento)}</td>
            <td className="px-0">{realizado.rubro}</td>
            <td className="px-0">{realizado.sector}</td>
            <td className="px-0">{montoFormat(Number(realizado.monto))}</td>
            <td className="px-0">{shortVenc(realizado.pagado ?? "")}</td>
            <td className="p-3 m-0"><AdminRealizadoMovilAction realizado={realizado} /></td>
        </tr>
    )
}
