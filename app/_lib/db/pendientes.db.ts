import { unstable_cache } from "next/cache"
import getDatabase from "./connect"
import { PendienteType } from "../schema/pendientes.type"



export const getPagosPendientes = async () => {
  const db = await getDatabase()
  return await db.collection<PendienteType>("PagosPendientes").find().sort({ "vencimiento": 1 }).toArray()
}

export const getCachedPagosPendientes = unstable_cache(async () => {
  return await getPagosPendientes()
},
  ["pendientes"],
  {
    tags: ["pedientes"],
    revalidate: 3600,
  }
)

export const insertarPendienteDB = async (pendiente: PendienteType) => {
  // const db = await getDatabase()
  // return db.collection<PendienteType>("PagosPendientes").insertOne(pendiente)
  console.log("INSERTADO")
  return { success: true, error: "" }
}

export const eliminarPendienteDB = async (id: string) => {
  // const db = await getDatabase()
  // return db.collection<PendienteType>("PagosPendientes").deleteOne({"_id": id})
  console.log("ELIMINADO")
  return { success: true, error: "" }
}

export const editarPendienteDB = async () => {
}