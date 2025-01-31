import { PagoType } from '@/app/_lib/schema/pago.type'
import { cookies } from 'next/headers'
import AdminRealizadoDesktopList from './Admin_Realizado_Desktop_List'
import AdminRealizadoMovilList from './Admin_Realizado_Movil_List'

const tableHeader = ["vencimiento", "rubro", "sector", "monto", "pagado", "accion"]

export default async function AdminRealizadoList({ realizados }: { realizados: PagoType[] }) {

  const viewport = (await cookies()).get("viewport")?.value

  if (realizados.length === 0) return <div className="flex-1 flex justify-center items-center"><h1 className="text-center      ">No hay pagos registrados...</h1></div>

  return (
   <>
    {
      viewport === "desktop" 
        ? <AdminRealizadoDesktopList realizados={realizados} />
        : <AdminRealizadoMovilList realizados={realizados} />
    }
   </>
  )
}