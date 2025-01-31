import { PagoType } from '@/app/_lib/schema/pago.type'
import { cookies } from 'next/headers'
import AdminRealizadoDesktopList from './Admin_Realizado_Desktop_List'
import AdminRealizadoMovilList from './Admin_Realizado_Movil_List'
import NoPays from '../NoPays'

export default async function AdminRealizadoList({ realizados }: { realizados: PagoType[] }) {

  const viewport = (await cookies()).get("viewport")?.value

  if (realizados.length === 0) return <NoPays />

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