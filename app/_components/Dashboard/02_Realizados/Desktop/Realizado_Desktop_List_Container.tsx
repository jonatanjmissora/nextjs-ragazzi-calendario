import { getCachedRealizadosFilterAction } from "@/app/_lib/actions/realizados.action"
import NoPays from "../../NoPays"
import RealizadoDesktopList from "./Realizado_Desktop_List"
import { getFullMonthOf } from "@/app/_lib/utils/getFullMonthOf"

export default async function RealizadoDesktopListContainer({ rubroFilter, dateFilter }: { rubroFilter: string, dateFilter: string }) {

    const [fromDate, toDate] = getFullMonthOf(dateFilter)
    const pagosRealizados = await getCachedRealizadosFilterAction(fromDate, toDate)
    const filteredRealizados = rubroFilter === "todos"
        ? pagosRealizados
        : pagosRealizados.filter(pago => pago.rubro === rubroFilter)

    if (filteredRealizados.length === 0) return <NoPays />

    return (
        <RealizadoDesktopList realizados={filteredRealizados} />
    )
}
