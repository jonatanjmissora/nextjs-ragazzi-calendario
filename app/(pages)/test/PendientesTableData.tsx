import NoPays from "@/app/_components/Dashboard/NoPays"
import { getPendientesAction } from "@/app/_lib/actions/pendientes.action"
import montoFormat from "@/app/_lib/utils/montoFormat"
import { shortVenc } from "@/app/_lib/utils/shortVenc"

export default async function PendientesTableData() {

    const pendientes = await getPendientesAction()
    
    if (pendientes.length === 0) return <NoPays />

  return (
    <>
    <table className="table">
            <tbody>
  
    {
        pendientes.map(pendiente =>
            
            <tr key={`desktop-${pendiente._id}`} className={`${pendiente.rubro} hover:brightness-75 border-b border-foreground25`}>
                    <td><input type="checkbox"/></td>
                    <td>{shortVenc(pendiente.vencimiento)}</td>
                    <td>{pendiente.rubro}</td>
                    <td>{pendiente.sector}</td>
                    <td>{montoFormat(Number(pendiente.monto))}</td>
                    <td className="p-0 m-0"> hola</td>
                  </tr>
                )
            }
            </tbody>
          </table>
    </>
  )
}
