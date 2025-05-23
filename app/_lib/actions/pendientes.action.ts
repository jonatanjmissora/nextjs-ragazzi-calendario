"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { editarPendienteDB, eliminarPendienteDB, getPendienteByIdDB, getPendientesDB, insertarPendienteDB } from "../db/pendientes.db"
import { pagoSchema, PagoType } from "../schema/pago.type"

export const getPendienteByIdAction = async (id: string) => {
  return await getPendienteByIdDB(id)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getPendientesAction = async () => {
  return await getPendientesDB()
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedPendientesAction = unstable_cache(async () => {
  return await getPendientesDB()
},
  ["pendientes"],
  {
    tags: ["pendientes"],
    revalidate: 3600,
  }
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarPendienteAction = async (pendiente: PagoType) => {
  const res = await eliminarPendienteDB(pendiente)
  if (res.success) {
    revalidateTag("pendientes")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarPendienteAction = async (newPendiente: PagoType) => {

  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newPendiente)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newPendiente,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const res = await editarPendienteDB(data)
  if (res.success) {
    revalidateTag("pendientes")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarNewPendienteAction = async (oldPendiente: PagoType, newPendiente: PagoType) => {

  //server-valiation
  const { success, data, error } = pagoSchema.safeParse(newPendiente)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newPendiente,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const deleteResponse = await eliminarPendienteDB(oldPendiente)
  if (!deleteResponse.success) {
    return deleteResponse
  }

  const insertResponse = await insertarPendienteDB(data)
  if (!insertResponse.success) {
    return insertResponse
  }

  revalidateTag("pendientes")
  return {
    success: true,
    prevState: newPendiente,
    message: `Dato editado con éxito`
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarPendienteAction = async (newPendiente: PagoType) => {
  const res = await insertarPendienteDB(newPendiente)
  if (res.success) {
    revalidateTag("pendientes")
  }

  return res
}
