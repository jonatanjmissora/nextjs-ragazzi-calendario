import { PagoType } from '@/app/_lib/schema/pago.type'
import { cookies } from 'next/headers'
import AdminRealizadoDesktopList from './Admin_Realizado_Desktop_List'
import AdminRealizadoMovilList from './Admin_Realizado_Movil_List'
import NoPays from '../NoPays'
import { getCachedRealizadosAction } from '@/app/_lib/actions/realizados.action'
import { getFilteredPagos } from '@/app/_lib/utils/getFilteredPagos'

export default async function AdminRealizadoList({ rubroFilter, sectorFilter, hastaFilter, desdeFilter }: { rubroFilter: string, sectorFilter: string, hastaFilter: string, desdeFilter: string }) {

  const viewport = (await cookies()).get("viewport")?.value

  const pagosRealizados = await getCachedRealizadosAction()
  const filteredRealizados = getFilteredPagos(pagosRealizados, rubroFilter, sectorFilter, undefined, hastaFilter, desdeFilter) as PagoType[]

  if (filteredRealizados.length === 0) return <NoPays />

  return (
    <>
      {
        viewport === "desktop"
          ? <AdminRealizadoDesktopList realizados={filteredRealizados} />
          : <AdminRealizadoMovilList realizados={filteredRealizados} />
      }
    </>
  )
}