import { unstable_cache } from "next/cache"
import { RealizadoType } from "../schema/realizado.type"
import getDatabase from "./connect"

export const getRealizados = async () => {
  // await new Promise(res => setTimeout(res, 5000))
  const db = await getDatabase()
  return await db.collection<RealizadoType>("PagosRealizados").find().sort({ "vencimiento": 1 }).toArray()
}

export const getCachedRealizados = unstable_cache(async () => {
  return await getRealizados()
},
  ["pendientes"],
  {
    tags: ["pedientes"],
    revalidate: 3600,
  }
)

export const insertarRealizadoDB = async (pendiente: RealizadoType) => {
  // const db = await getDatabase()
  // return db.collection<PendienteType>("PagosPendientes").insertOne(pendiente)
  return { success: true, error: "" }
}