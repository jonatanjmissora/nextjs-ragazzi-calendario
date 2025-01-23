import { PagoType } from "@/app/_lib/schema/pago.type";
import Calculadora from "./Pendientes/Pendiente_Calculadora";
import RubroFilter from "./Rubro_Filter";

export default function PagosHeader({ calcPagos, pendientes }: { calcPagos?: string[], pendientes?: PagoType[] }) {
  return (
    <article className="w-[60dvw] m-auto flex justify-end items-center relative pago-header">

      {
        (calcPagos && pendientes) &&
        <Calculadora calcPagos={calcPagos} pendientes={pendientes} />
      }

      <RubroFilter />

    </article>
  )
}
