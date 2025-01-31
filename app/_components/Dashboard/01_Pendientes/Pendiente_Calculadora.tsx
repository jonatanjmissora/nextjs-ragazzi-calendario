import { PagoType } from "@/app/_lib/schema/pago.type";
import montoFormat from "@/app/_lib/utils/montoFormat";

export default function Calculadora({ calcPagos, pendientes }: { calcPagos: string[], pendientes: PagoType[] }) {

  const montos = calcPagos.map(pagoId => Number(pendientes.find(p => p._id === pagoId)?.monto) || 0)
  const total = montos.reduce((acc, monto) => acc + monto, 0)

  return (
    <div className="calc-container absolute">
      {
        calcPagos.length > 0 &&
        <span className="font-bold tracking-widest      text-foreground opacity-75">Total: {montoFormat(total)}</span>
      }
    </div>
  )
}
