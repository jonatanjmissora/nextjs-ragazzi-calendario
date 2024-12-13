import { getCachedSectoresActuales } from "@/app/_lib/db/sectores.db"
import { SectoresType } from "@/app/_lib/types/sectores.type"
import { revalidateTag } from "next/cache"

export default async function Aside() {

  const sectoresActuales = await getCachedSectoresActuales()
  const formAction = async () => {
    "use server"
    revalidateTag("sectores")
  }
  return (
    <aside className="bg-slate-800 flex flex-col gap-4 justify-center items-center">
      <h2>Sectores</h2>
      <ul>
        {
          sectoresActuales.map(sector => 
            <div className="collapse collapse-arrow join-item border-base-300 border rounded-none w-[20dvw]">
            
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">{sector.rubro} ({sector.sectores.length})</div>
            <div className="collapse-content flex flex-wrap gap-4">
              {sector.sectores.map(sector => <span>{sector}</span>)}
            </div>
          </div>
          )
        
        }
      </ul>
      <form action={formAction}><button className="btn btn-primary">reload</button></form>
    </aside>

  )
}

const Rubro = ({ rubro }: { rubro: SectoresType }) => {
  return (
    <li className="flex flex-col gap-4 border p-4">
      <h3>{rubro.rubro}</h3>
      <div className="flex gap-4 flex-wrap">
        {
          rubro.sectores.map((sector, index) => <span key={index}>{sector}</span>)
        }
      </div>
    </li>
  )
}
