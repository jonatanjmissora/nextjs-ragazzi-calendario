"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { getErrorMessage } from "../utils/getErrorMessage"
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

  try {
    const res = await updateSectorDB(rubro, newSectores)
    if (!res.success) {
      throw new Error(res.error)
    }

    revalidateTag("sectores")
    return { success: true, error: "" }

  } catch (error) {
    return { success: false, error: `server-error: ${getErrorMessage(error)}` }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteSectorAction = async (rubro: string, sectores: string[]) => {
  try {
    const res = await updateSectorDB(rubro, sectores)
    if (!res.success) {
      throw new Error(res.error)
    }

    revalidateTag("sectores")
    return { success: true, error: "" }

  } catch (error) {
    return { success: false, error: `server-error: ${getErrorMessage(error)}` }
  }
}