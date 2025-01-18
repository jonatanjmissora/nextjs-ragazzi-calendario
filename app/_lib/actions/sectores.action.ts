"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { getSectoresActualesDB, getSectoresResetDB, updateSectorDB } from "../db/sectores.db"

export const getCachedSectoresResetAction = unstable_cache(async () => {
  return await getSectoresResetDB()
},
  ["sectores"],
  {
    tags: ["sectores"],
    revalidate: 3600,
  }
)

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedSectoresActualesAction = unstable_cache(async () => {
  return await getSectoresActualesDB()
},
  ["sectores"],
  {
    tags: ["sectores"],
    revalidate: 3600,
  }
)

/////////////////////////////////////////////////////////////////////////////////////////////////
export const updateSectorAction = async (rubro: string, newSectores: string[]) => {

  const res = await updateSectorDB(rubro, newSectores)
  if (res.success) {
    revalidateTag("sectores")
  }

  return res
}