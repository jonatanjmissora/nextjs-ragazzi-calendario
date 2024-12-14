import { RealizadoType } from "../schema/realizado.type"

export const insertarRealizadoDB = async (pendiente: RealizadoType) => {
  // const db = await getDatabase()
  // return db.collection<PendienteType>("PagosPendientes").insertOne(pendiente)
  console.log("INSERTADO")
  return { success: true, error: "" }
}