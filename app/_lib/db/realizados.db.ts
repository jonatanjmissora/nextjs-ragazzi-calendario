import { RealizadoType } from "../schema/realizado.type"
import getDatabase from "./connect"

export const getRealizadoByIdDB = async (_id: string) => {
  const db = await getDatabase()
  return await db.collection<RealizadoType>("PagosRealizados").findOne({ _id })
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosDB = async () => {
  // await new Promise(res => setTimeout(res, 5000))
  const db = await getDatabase()
  return await db.collection<RealizadoType>("PagosRealizados").find().sort({ "vencimiento": 1 }).toArray()
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarRealizadoDB = async (pendiente: RealizadoType) => {
  // const db = await getDatabase()
  // return db.collection<PendienteType>("PagosPendientes").insertOne(pendiente)
  return { success: true, error: "" }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarRealizadoDB = async (id: string) => {
  // const db = await getDatabase()
  // const res = await db.collection<RealizadoType>("PagosRealizados").deleteOne({ _id: id })
  // if (res?.deletedCount !== 1) {
  //   return { success: false, error: "No se pudo elimianr el pago" }
  // } else
  return { success: true, error: "" }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const editarRealizadoDb = (newRealizados: RealizadoType) => {
 // const db = await getDatabase()
  // const res = await db.collection<RealizadoType>("PagosRealizados").updateOne(
  //   { _id: newRealizado._id },
  //   {
  //     $set: { "monto": newRealizado.monto }
  //   }
  // )
  // if (res.modifiedCount !== 1) {
  //   return { success: false, error: "No se pudo editar el pago" }
  // } else
  return { success: true, error: "" }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarRealizadoDb = (id: string, newRealizado: RealizadoType) => {
  return { success: true, error: "" }
}