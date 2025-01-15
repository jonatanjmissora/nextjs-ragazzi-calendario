import { PagoType } from "../schema/pago.type"

export const getFilteredPagos = (realizados: PagoType[], rubroFilter: string, sectorFilter?: string, yearMonthFilter?: string, hastaFilter?: string, desdeFilter?: string) => {
    const filteredRubroAux = rubroFilter === "todos"
        ? realizados
        : realizados.filter(pago => pago.rubro === rubroFilter)

    const filteredRubro = sectorFilter === "todos"
        ? filteredRubroAux
        : filteredRubroAux.filter(pago => pago.sector === sectorFilter)

    if (yearMonthFilter) {
        return filteredRubro.filter(pago => pago.vencimiento.includes(yearMonthFilter))
    }

    else if (desdeFilter && hastaFilter) {
        return filteredRubro.filter(pago => pago.vencimiento >= desdeFilter && pago.vencimiento <= hastaFilter)
    }

}