import { RealizadoType } from "../schema/realizado.type";

export const getFilteredRealizados = (realizados: RealizadoType[], yearMonthFilter: string, rubroFilter: string) => {

    const filteredRubro = rubroFilter === "todo"
        ? realizados
        : realizados.filter(pago => pago.rubro === rubroFilter)
        
        const filteredDate = filteredRubro.filter(pago => pago.vencimiento.includes(yearMonthFilter))

    return filteredDate
}