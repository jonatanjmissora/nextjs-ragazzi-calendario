import { unstable_cache } from "next/cache"
import getDatabase from "./connect"
import { PendienteType } from "../schema/pendientes.type"
import { ObjectId } from "mongodb"

export const getPendienteByIdDB = async (_id: string) => {
  const db = await getDatabase()
  return await db.collection<PendienteType>("PagosPendientes").findOne({_id})
}

export const getPendientes = async () => {
  const db = await getDatabase()
  return await db.collection<PendienteType>("PagosPendientes").find().sort({ "vencimiento": 1 }).toArray()
}

export const getCachedPendientes = unstable_cache(async () => {
  return await getPendientes()
},
  ["pendientes"],
  {
    tags: ["pedientes"],
    revalidate: 3600,
  }
)

export const insertarPendienteDB = async (pendiente: PendienteType) => {
  // const db = await getDatabase()
  // const res = await db.collection<PendienteType>("PagosPendientes").insertOne(pendiente)
  // if (!res?.insertedId.toString()) {
  //   return { success: false, error: "Error al insertar en DB" }
  // } else  
    return { success: true, error: "" }
}

export const eliminarPendienteDB = async (id: string) => {
  // const db = await getDatabase()
  // const res = await db.collection<PendienteType>("PagosPendientes").deleteOne({ _id: id })
  // if (res?.deletedCount !== 1) {
  //   return { success: false, error: "No se pudo elimianr el pago" }
  // } else
  return { success: true, error: "" }
}

export const editarPendienteDB = async (newPendiente: PendienteType) => {
  // const db = await getDatabase()
  // const res = await db.collection<PendienteType>("PagosPendientes").updateOne(
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

export const editarNewPenidenteDB = (id: string, newPendiente: PendienteType) => {
  return { success: true, error: "" }
}