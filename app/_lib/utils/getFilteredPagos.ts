import { RealizadoType } from "../schema/realizado.type";

export const getFilteredPagos = (realizados: RealizadoType[], rubroFilter: string, sectorFilter?: string, yearMonthFilter?: string, hastaFilter?: string, desdeFilter?: string) => {
    console.log(rubroFilter, sectorFilter, yearMonthFilter, hastaFilter, desdeFilter)
    const filteredRubroAux = rubroFilter === "todos"
        ? realizados
        : realizados.filter(pago => pago.rubro === rubroFilter)

    const filteredRubro = sectorFilter === "todos"
        ? filteredRubroAux
        : filteredRubroAux.filter(pago => pago.sector === sectorFilter)

    if (yearMonthFilter) {
        return filteredRubro.filter(pago => pago.vencimiento.includes(yearMonthFilter))
    }

    else {

        if (!desdeFilter && !hastaFilter) return filteredRubro

        if (desdeFilter && hastaFilter)
            return filteredRubro.filter(pago => pago.vencimiento >= desdeFilter && pago.vencimiento <= hastaFilter)

        if (desdeFilter && !hastaFilter)
            return filteredRubro.filter(pago => pago.vencimiento === desdeFilter)

        if (!desdeFilter && hastaFilter)
            return filteredRubro.filter(pago => pago.vencimiento === hastaFilter)

    }

}