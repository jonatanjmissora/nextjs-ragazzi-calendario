"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { eliminarRealizadoDB, getRealizadoByIdDB, getRealizadosDB, editarRealizadoDb, insertarRealizadoDB, getRealizadosFilterDB } from "../db/realizados.db"
import { pagoSchema, PagoType } from "../schema/pago.type"

export const getRealizadoByIdAction = async (id: string) => {
  return await getRealizadoByIdDB(id)
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosAction = async () => {
  return await getRealizadosDB()
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

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosFilterAction = async (fromDate: string, toDate: string) => {
  return await getRealizadosFilterDB(fromDate, toDate)
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedRealizadosFilterAction = unstable_cache(async (fromDate: string, toDate: string) => {
  return await getRealizadosFilterDB(fromDate, toDate)
},
  ["realizados"],
  {
    tags: ["realizados"],
    revalidate: 3600,
  }
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarRealizadoAction = async (realizado: PagoType) => {
  const res = await eliminarRealizadoDB(realizado)
  if (res.success) {
    revalidateTag("realizados")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarRealizadoAction = async (newRealizado: PagoType) => {
  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newRealizado)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newRealizado,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const res = await editarRealizadoDb(data)
  if (res.success) {
    revalidateTag("realizados")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarNewRealizadoAction = async (realizado: PagoType, newRealizado: PagoType) => {
  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newRealizado)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newRealizado,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const deleteResponse = await eliminarRealizadoDB(realizado)
  if (!deleteResponse.success) {
    return {
      success: false,
      prevState: newRealizado,
      message: deleteResponse.message
    }
  }

  const insertResponse = await insertarRealizadoDB(data)
  if (!insertResponse.success) {
    return {
      success: false,
      prevState: newRealizado,
      message: insertResponse.message
    }
  }

  revalidateTag("realizados")
  return insertResponse
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarRealizadoAction = async (newRealizado: PagoType) => {
  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newRealizado)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newRealizado,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const insertResponse = await insertarRealizadoDB(data)
  if (!insertResponse.success) {
    return {
      success: false,
      prevState: newRealizado,
      message: insertResponse.message
    }
  }

  revalidateTag("realizados")
  return insertResponse
}