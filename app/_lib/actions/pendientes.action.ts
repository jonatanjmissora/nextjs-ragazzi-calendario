"use server"

import { revalidateTag } from "next/cache"
import { editarPendienteDB, eliminarPendienteDB, getPendienteByIdDB, insertarPendienteDB } from "../db/pendientes.db"
import { insertarRealizadoDB } from "../db/realizados.db"
import { pendienteSchema, PendienteType } from "../schema/pendientes.type"
import { localeStringToDBDate } from "../utils/date.toLocaleString_to_dbDate"
import { getErrorMessage } from "../utils/getErrorMessage"

export const getPendienteByIdAction= async (id: string) => {
  return await getPendienteByIdDB(id)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const pagarPendienteAction = async (pendiente: PendienteType) => {
  //agregar pago a pagosRealizados
  const actualDate = localeStringToDBDate(new Date().toLocaleDateString())
  const realizado = { ...pendiente, pagado: actualDate }

  const failObject = {
    success: false,
    errors: ""
  }

  //server-valiation
  const { success, data, error } = pendienteSchema.safeParse(pendiente)
  if (!success) {
   const errors = error.flatten().fieldErrors
   return { success: false, error: `server-error: ${JSON.stringify(errors)}`}
  }

  try {
    const resInsert = await insertarRealizadoDB(realizado)
    if (!resInsert.success) {
      throw new Error(resInsert.error)
    }

    const resDelete = await eliminarPendienteDB(pendiente._id)
    if (!resDelete.success) {
      throw new Error(resDelete.error)
    }

    revalidateTag("pendientes")
    revalidateTag("realizados")

    return {success: true, error: ""}
  } catch (error) {
    return {success: false, error: `server-error: ${getErrorMessage(error)}`}
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarPendienteAction = async (id: string) => {
  try {
    const res = await eliminarPendienteDB(id)
    if(!res.success) {
      throw new Error(res.error)
    }

    revalidateTag("pendientes")
    return {success: true, error: ""}

  } catch (error) {
    return {success: false, error: `server-error: ${getErrorMessage(error)}`}
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarPendienteAction = async (newPendiente: PendienteType) => {

   //server-valiation
   const { success, data, error } = pendienteSchema.safeParse(newPendiente)
   if (!success) {
    const errors = error.flatten().fieldErrors
    return { success: false, error: `server-error: ${JSON.stringify(errors)}`}
   }

  try {
    const res = await editarPendienteDB(data)
    if(!res.success) {
      throw new Error(res.error)
    }

    revalidateTag("pendientes")
    return {success: true, error: ""}

  } catch (error) {
    return {success: false, error: `server-error: ${getErrorMessage(error)}`}
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarNewPendienteAction = async (id: string, newPendiente: PendienteType) => {

  //server-valiation
  const { success, data, error } = pendienteSchema.safeParse(newPendiente)
  if (!success) {
   const errors = error.flatten().fieldErrors
   return { success: false, error: `server-error: ${JSON.stringify(errors)}`}
  }

  try {
    const deleteResponse = await eliminarPendienteDB(id)
    if(!deleteResponse.success) throw new Error(deleteResponse.error)

  const insertResponse = await insertarPendienteDB(data)
  if (!insertResponse.success) {
    throw new Error(insertResponse.error)
  }

  revalidateTag("pendientes")
  return {success: true, error: ""}

  } catch (error) {
    return {success: false, error: `server-error: ${getErrorMessage(error)}`}
  }

}