import FiltrosFecha from "./FiltrosFecha"
import FiltrosCategoria from "./FiltrosCategoria"
import { getCachedSectoresConstantAction } from "@/app/_lib/actions/sectores.action"

export default async function LeftAsideAdmin({ desdeFilter, hastaFilter, rubroFilter, sectorFilter, }: { desdeFilter: string, hastaFilter: string, rubroFilter: string, sectorFilter: string }) {


  const sectoresConstant = await getCachedSectoresConstantAction()

  return (
    <aside className="flex justify-center items-center flex-col gap-20 w-full">
      <FiltrosFecha desdeFilter={desdeFilter} hastaFilter={hastaFilter} />

      <FiltrosCategoria rubroFilter={rubroFilter} sectorFilter={sectorFilter} sectoresConstant={sectoresConstant[0].sectores} />

    </aside>
  )
}
