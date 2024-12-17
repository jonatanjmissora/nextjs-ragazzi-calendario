import { Suspense } from "react";
import { RealizadoType } from "@/app/_lib/schema/realizado.type";

export default function RealizadosList({ realizados }: { realizados: RealizadoType[] }) {

  return (
    <Suspense fallback={<p>Loading...Pagos Skelton</p>}>
      {
        realizados.map(realizado =>

          <tr key={realizado._id} className="hover">
            <th>{realizado.vencimiento}</th>
            <td>{realizado.rubro}</td>
            <td>{realizado.sector}</td>
            <td>{realizado.monto}</td>
            <td>{realizado.pagado}</td>
          </tr>
        )
      }
    </Suspense>
  )
}
