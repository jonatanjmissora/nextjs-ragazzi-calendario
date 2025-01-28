import FiltrosFecha from "./LeftAside_Admin_FiltrosFecha"
import FiltrosCategoria from "./LeftAside_Admin_FiltrosCategoria"
import { getCachedSectoresResetAction } from "@/app/_lib/actions/sectores.action"
import { getUniqueSectors } from "@/app/_lib/utils/getUniqueSectors";

type Rubros = {
  _id: string;
  sectores: string[];
}

export default async function LeftAsideAdmin({ desdeFilter, hastaFilter, rubroFilter, sectorFilter, }: { desdeFilter: string, hastaFilter: string, rubroFilter: string, sectorFilter: string }) {

  const sectoresConstant = await getCachedSectoresResetAction() as Rubros[]
  const uniqueSectors = getUniqueSectors(sectoresConstant) as string[]
  let sectoresDelRubro = uniqueSectors
  if (rubroFilter !== "todos")
    sectoresDelRubro = sectoresConstant.filter(rubro => rubro._id === rubroFilter)[0].sectores

  return (
    <aside className="flex justify-center items-center flex-col gap-10 leftAside leftAside-admin">
      <FiltrosFecha desdeFilter={desdeFilter} hastaFilter={hastaFilter} />

      <FiltrosCategoria rubroFilter={rubroFilter} sectorFilter={sectorFilter} sectoresDelRubro={sectoresDelRubro} />

    </aside>
  )
}
