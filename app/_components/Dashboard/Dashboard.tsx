import { getCachedPagosPendientes } from "@/app/_lib/db/pendientes.db"
import RubroFilter from "./RubroFilter"

export default async function Dashboard({ rubroFilter }: { rubroFilter: string }) {

  const pagosPendientes = await getCachedPagosPendientes()
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

            {
              filteredPendientes.map(pago =>

                <tr key={pago._id} className="hover">
                  <th>{pago.vencimiento}</th>
                  <td>{pago.rubro}</td>
                  <td>{pago.sector}</td>
                  <td>{pago.monto}</td>
                  <td>menu</td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>

      <RubroFilter />

    </article>
  )
}
