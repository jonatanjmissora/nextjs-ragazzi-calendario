import { revalidateTag } from "next/cache"
import { getCachedSectoresActualesAction } from "@/app/_lib/actions/sectores.action"
import LeftAsideSectoresForm from "./LeftAside_Pendientes_Sectores_List"

export default async function Aside() {

  const sectoresActuales = await getCachedSectoresActualesAction()

  const formAction = async () => {
    "use server"
    revalidateTag("sectores")
  }

  return (
    <article className="leftAside-width flex flex-col gap-4 justify-center items-center">
      <LeftAsideSectoresForm sectoresActuales={sectoresActuales} />
      <form action={formAction}><button className="px-4 py-2 rounded-lg bg-foreground80 hover:bg-foreground hover:text-white transition">reload</button></form>
    </article>

  )
}


