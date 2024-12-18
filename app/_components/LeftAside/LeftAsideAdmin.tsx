import { getCachedSectoresConstant } from "@/app/_lib/db/sectores.db"
import FiltrosFecha from "./FiltrosFecha"
import FiltrosCategoria from "./FiltrosCategoria"

export default async function LeftAsideAdmin({ desdeFilter, hastaFilter, rubroFilter, sectorFilter, }: { desdeFilter: string, hastaFilter: string, rubroFilter: string, sectorFilter: string }) {


  const sectoresConstant = await getCachedSectoresConstant()

  return (
    <aside className="flex justify-center items-center flex-col gap-20 w-full">
      <FiltrosFecha desdeFilter={desdeFilter} hastaFilter={hastaFilter} />

      <FiltrosCategoria rubroFilter={rubroFilter} sectorFilter={sectorFilter} sectoresConstant={sectoresConstant[0].sectores} />

    </aside>
  )
}
