import { getCachedPagosPendientes } from "@/app/_lib/db/pendientes.db"

export default async function Dashboard() {

  const pagosPendientes = await getCachedPagosPendientes()

  return (
    <div className="h-[80%] w-[60%] overflow-y-scroll">
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
            pagosPendientes.map(pago =>

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
  )
}
