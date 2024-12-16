import { getCachedPendientes } from "@/app/_lib/db/pendientes.db"
import RubroFilter from "./RubroFilter"
import PendientesList from "./PendientesList"

export default async function Dashboard({ rubroFilter }: { rubroFilter: string }) {

  const pagosPendientes = await getCachedPendientes()
  const filteredPendientes = rubroFilter === "todo"
    ? pagosPendientes
    : pagosPendientes.filter(pago => pago.rubro === rubroFilter)

  return (
    <article className="h-full flex">
      <div className="h-full overflow-y-scroll flex-1 px-40 py-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>vencimiento</th>
              <th>rubro</th>
              <th>sector</th>
              <th>monto</th>
              <th>accion</th>
            </tr>
          </thead>
          <tbody>

            <PendientesList pendientes={filteredPendientes} />

          </tbody>
        </table>
      </div>

      <RubroFilter />

    </article>
  )
}
