import { getCachedRealizadosFilterAction } from "@/app/_lib/actions/realizados.action"
import { getFullYearOf } from "@/app/_lib/utils/getFullYearOf"
import NoPays from "../../NoPays"
import RealizadoMovilList from "./Realizado_Movil_List"
import { getFullMonthOf } from "@/app/_lib/utils/getFullMonthOf"

export default async function RealizadoMovilListContainer({ rubroFilter, dateFilter }: { rubroFilter: string, dateFilter: string }) {

  const [fromDate, toDate] = getFullMonthOf(dateFilter)
  const pagosRealizados = await getCachedRealizadosFilterAction(fromDate, toDate)
  const filteredRealizados = rubroFilter === "todos"
      ? pagosRealizados
      : pagosRealizados.filter(pago => pago.rubro === rubroFilter)

  if (filteredRealizados.length === 0) return <NoPays />

  return (
    <RealizadoMovilList realizados={filteredRealizados} />
  )
}
