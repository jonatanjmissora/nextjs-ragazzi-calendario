import { getCachedSectoresActuales } from "@/app/_lib/db/sectores.db"
import { revalidateTag } from "next/cache"

export default async function Aside() {

  const sectoresActuales = await getCachedSectoresActuales()

  const formAction = async () => {
    "use server"
    revalidateTag("sectores")
  }

  return (
    <>
      <h2>Sectores</h2>
      <ul>
        {
          sectoresActuales.map(rubro =>
            <li key={rubro._id} className="collapse collapse-arrow join-item border-base-300 border rounded-none">

              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">{rubro._id} ({rubro.sectores.length})</div>
              <Sectores sectores={rubro.sectores} />
            </li>
          )
        }
      </ul>
      <form action={formAction}><button className="btn btn-primary">reload</button></form>
    </>

  )
}

const Sectores = ({ sectores }: { sectores: string[] }) => {
  return (
    <ul className="collapse-content flex flex-wrap gap-1">
      {
        sectores.map((sector, index) =>
          <li
            className="hover:bg-slate-900 py-1 px-2 rounded"
            key={index}
          >
            {sector}
          </li>)
      }
    </ul>
  )
}
