"use server"

import { eliminarPendienteDB } from "../db/pendientes.db"
import { insertarRealizadoDB } from "../db/realizados"
import { PendienteType } from "../schema/pendientes.type"
import { localeStringToDBDate } from "../utils/date.toLocaleString_to_dbDate"
import { getErrorMessage } from "../utils/getErrorMessage"

export const pagarPendienteAction = async (pendiente: PendienteType) => {
  //agregar pago a pagosRealizados
  const actualDate = localeStringToDBDate(new Date().toLocaleDateString())
  const realizado = { ...pendiente, pagado: actualDate }

  try {
    const resInsert = await insertarRealizadoDB(realizado)
    if (!resInsert.success) {
      throw new Error(resInsert.error)
    }

    const resDelete = await eliminarPendienteDB(pendiente._id)
    if (!resDelete.success) {
      throw new Error(resDelete.error)
    }

    // revalidateTag("pendientes")
    // revalidateTag("realizados")
    return "Pago realizado con exito"
  } catch (error) {
    return getErrorMessage(error)
  }



}

export const eliminarPendienteAction = async (pendiente: PendienteType) => {
  console.log("elimiando del servidor", pendiente)
}

export const editarPendienteAction = async (pendiente: PendienteType) => {
  console.log("editando del servidor", pendiente)
}