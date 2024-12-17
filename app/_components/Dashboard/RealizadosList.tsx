import { RealizadoType } from "@/app/_lib/schema/realizado.type";

export default function RealizadosList({ realizados }: { realizados: RealizadoType[] }) {

  return (
    <>
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
    </>
  )
}
