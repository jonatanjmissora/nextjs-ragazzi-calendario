"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { getSectoresActualesDB, getSectoresResetDB, updateSectoresActualesDB, updateSectoresResetDB } from "../db/sectores.db"

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
export const updateSectoresResetAction = async (rubro: string, newSectores: string[]) => {

  const res = await updateSectoresResetDB(rubro, newSectores)
  if (res.success) {
    revalidateTag("sectores")
  }

  return res
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const updateSectoresActualesAction = async (rubro: string, newSectores: string[]) => {

  const res = await updateSectoresActualesDB(rubro, newSectores)
  if (res.success) {
    revalidateTag("sectores")
  }

  return res
}