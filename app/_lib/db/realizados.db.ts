import { unstable_cache } from "next/cache"
import { RealizadoType } from "../schema/realizado.type"
import getDatabase from "./connect"

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