import { revalidateTag } from "next/cache"
import { Sectores } from "./LeftAside_Pendientes_SectoresForm"
import { getCachedSectoresActualesAction } from "@/app/_lib/actions/sectores.action"

export default async function Aside() {

  const sectoresActuales = await getCachedSectoresActualesAction()

  const formAction = async () => {
    "use server"
    revalidateTag("sectores")
  }

  return (
    <>
      <ul className="w-full">
        {
          sectoresActuales.map(rubro =>
            <li key={rubro._id} className="collapse collapse-arrow join-item border-base-300 border rounded-none">

              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">{rubro._id} ({rubro.sectores.length})</div>
              {<Sectores rubro={rubro._id} sectores={rubro.sectores} />}
            </li>
          )
        }
      </ul>
      <form action={formAction}><button className="btn btn-primary">reload</button></form>
    </>

  )
}


