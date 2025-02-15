import { PagoType } from "@/app/_lib/schema/pago.type"
import montoFormat from "@/app/_lib/utils/montoFormat"
import AdminRealizadoAction from "../Admin_Realizado_Action"

const tableHeader = ["vencimiento", "rubro", "sector", "monto", "pagado", "accion"]

export default function AdminRealizadoDesktopList({ realizados }: { realizados: PagoType[] }) {

    return (
        <>

            <div className="table-container relative">
                <table className="table">
                    <thead>
                        <tr className='text-base border-b border-foreground25'>
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
        </>
    )
}

const Pago = ({ realizado }
    : { realizado: PagoType }
) => {

    return (
        <tr key={realizado._id} className={`${realizado.rubro} hover:brightness-75 border-b border-foreground25`}>
            <td>{realizado.vencimiento}</td>
            <td>{realizado.rubro}</td>
            <td>{realizado.sector}</td>
            <td>{montoFormat(Number(realizado.monto))}</td>
            <td>{realizado.pagado}</td>
            <td className="px-0"><AdminRealizadoAction realizado={realizado} /></td>
        </tr>
    )
}
