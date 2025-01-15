import getDatabase from "./connect"
import { PagoType } from "../schema/pago.type"

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
export const insertarPendienteDB = async (pendiente: PagoType) => {
  // const db = await getDatabase()
  // const res = await db.collection<PagoType>("PagosPendientes").insertOne(pendiente)
  // if (!res?.insertedId.toString()) {
  //   return { success: false, error: "Error al insertar en DB" }
  // } else  
  return { success: true, error: "" }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarPendienteDB = async (id: string) => {
  // const db = await getDatabase()
  // const res = await db.collection<PagoType>("PagosPendientes").deleteOne({ _id: id })
  // if (res?.deletedCount !== 1) {
  //   return { success: false, error: "No se pudo elimianr el pago" }
  // } else
  return { success: true, error: "" }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const editarPendienteDB = async (newPendiente: PagoType) => {
  // const db = await getDatabase()
  // const res = await db.collection<PagoType>("PagosPendientes").updateOne(
  //   { _id: newPendiente._id },
  //   {
  //     $set: { "monto": newPendiente.monto }
  //   }
  // )
  // if (res.modifiedCount !== 1) {
  //   return { success: false, error: "No se pudo editar el pago" }
  // } else
  return { success: true, error: "" }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const editarNewPenidenteDB = (id: string, newPendiente: PagoType) => {
  return { success: true, error: "" }
}