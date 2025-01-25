import { getCachedSectoresActualesAction, resetSectoresAction } from "@/app/_lib/actions/sectores.action"
import LeftAsideSectoresForm from "./LeftAside_Pendientes_Sectores_List"
import LeftAsidePendientesResetSectores from "./LeftAside_Pendientes_Reset_Sectores"

export default async function Aside() {

  const sectoresActuales = await getCachedSectoresActualesAction()

  return (
    <article className="leftAside-width flex flex-col gap-4 justify-center items-center">

      <LeftAsideSectoresForm sectoresActuales={sectoresActuales} />

      <LeftAsidePendientesResetSectores />
    </article>

  )
}


