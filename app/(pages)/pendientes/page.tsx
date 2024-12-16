import PendientesList from '@/app/_components/Dashboard/PendientesList';
import { getCachedPendientes } from '@/app/_lib/db/pendientes.db';
import getUserFromCookie from '@/app/_lib/utils/getUserFromCookies';
import { redirect } from "next/navigation";

export default async function PendientesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const rubroFilter = (await searchParams)?.rubroFilter || "todo"
  const pagosPendientes = await getCachedPendientes()
  const filteredPendientes = rubroFilter === "todo"
    ? pagosPendientes
    : pagosPendientes.filter(pago => pago.rubro === rubroFilter)

  return (
    <section className="w-full main-height flex">

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

    </section>
  );
}
