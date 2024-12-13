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
    <aside className="w-[20%] bg-slate-800 flex flex-col gap-4 justify-center items-center">
      <h2>Sectores</h2>
      <ul>
        {
          sectoresActuales.map(_ => <Rubro key={_.rubro} rubro={_} />)
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
