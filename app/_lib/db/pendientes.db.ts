import getDatabase from "./connect"
import { PagoType } from "../schema/pago.type"
import { getErrorMessage } from "../utils/getErrorMessage"

export const getPendienteByIdDB = async (_id: string) => {
  const db = await getDatabase()
  return await db.collection<PagoType>("PagosPendientes").findOne({ _id })
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getPendientesDB = async () => {
  // await new Promise(res => setTimeout(res, 5000))
  const db = await getDatabase()
  return await db.collection<PagoType>("PagosPendientes").find().sort({ "vencimiento": 1 }).toArray()
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarPendienteDB = async (newPendiente: PagoType) => {
  try {
    // const db = await getDatabase()
    // const res = await db.collection<PagoType>("PagosPendientes").insertOne(newPendiente)
    // if (!res?.insertedId.toString()) {
    //   return { success: false, prevState: newPendiente, message: "Error al insertar en DB" }
    // } else  
    return { success: true, prevState: newPendiente, message: "Pago insertado con éxito" }

  } catch (error) {
    return { success: false, prevState: newPendiente, message: `server-error: ${getErrorMessage(error)}` }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarPendienteDB = async (pendiente: PagoType) => {
  try {
    // const db = await getDatabase()
    // const res = await db.collection<PagoType>("PagosPendientes").deleteOne({ _id: pendiente._id })
    // if (res?.deletedCount !== 1) {
    //   return { success: false, prevState: pendiente, message: "No se pudo elimianr el pago" }
    // } else
    return { success: true, prevState: pendiente, message: "Pago eliminado con éxito" }

  } catch (error) {
    return { success: false, prevState: pendiente, message: `server-error: ${getErrorMessage(error)}` }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const editarPendienteDB = async (newPendiente: PagoType) => {

  try {
    // const db = await getDatabase()
    // const res = await db.collection<PagoType>("PagosPendientes").updateOne(
    //   { _id: newPendiente._id },
    //   {
    //     $set: { "monto": newPendiente.monto }
    //   }
    // )
    // if (res.modifiedCount !== 1) {
    //   return { success: false, prevState: newPendiente, message: "No se pudo editar el pago" }
    // } else
    return { success: true, prevState: newPendiente, message: "Pago editado con éxito" }

  } catch (error) {
    return { success: false, prevState: newPendiente, message: `server-error: ${getErrorMessage(error)}` }
  }
}