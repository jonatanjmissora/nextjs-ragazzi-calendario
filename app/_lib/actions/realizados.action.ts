"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { eliminarRealizadoDB, getRealizadoByIdDB, getRealizadosDB, insertarRealizadoDB, editarRealizadoDb } from "../db/realizados.db"
import { getErrorMessage } from "../utils/getErrorMessage"
import { realizadoSchema, RealizadoType } from "../schema/realizado.type"

export const getRealizadoByIdAction = async (id: string) => {
  return await getRealizadoByIdDB(id)
}

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarRealizadoAction = async (newRealizado: RealizadoType) => {
  //server-valiation
  const { success, data, error } = realizadoSchema.safeParse(newRealizado)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return { success: false, error: `server-error: ${JSON.stringify(errors)}` }
  }

  try {
    const res = await editarRealizadoDb(data)
    if (!res.success) {
      throw new Error(res.error)
    }

    revalidateTag("realizados")
    return { success: true, error: "" }

  } catch (error) {
    return { success: false, error: JSON.stringify(error) + `server-error: ` }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarNewRealizadoAction = async (id: string, newRealizado: RealizadoType) => {
  console.log("Editar con nuevo id")
  //server-valiation
  const { success, data, error } = realizadoSchema.safeParse(newRealizado)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return { success: false, error: `server-error: ${JSON.stringify(errors)}` }
  }

  try {
    const deleteResponse = await eliminarRealizadoDB(id)
    if (!deleteResponse.success) throw new Error(deleteResponse.error)

    const insertResponse = await insertarRealizadoDB(data)
    if (!insertResponse.success) {
      throw new Error(insertResponse.error)
    }

    revalidateTag("realizados")
    return { success: true, error: "" }

  } catch (error) {
    return { success: false, error: JSON.stringify(error) + `server-error: ` }
  }

}