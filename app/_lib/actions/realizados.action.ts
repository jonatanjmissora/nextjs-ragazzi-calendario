import { revalidateTag, unstable_cache } from "next/cache"
import { eliminarRealizadoDB, getRealizadosDB } from "../db/realizados.db"
import { getErrorMessage } from "../utils/getErrorMessage"

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedRealizadosAction = unstable_cache(async () => {
    return await getRealizadosDB()
  },
    ["realizados"],
    {
      tags: ["realizados"],
      revalidate: 3600,
    }
  )

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  export const eliminarRealizadoAction = async (id: string) => {
    try {
      const res = await eliminarRealizadoDB(id)
      if (!res.success) {
        throw new Error(res.error)
      }
  
      revalidateTag("realizados")
      return { success: true, error: "" }
  
    } catch (error) {
      return { success: false, error: `server-error: ${getErrorMessage(error)}` }
    }
  }