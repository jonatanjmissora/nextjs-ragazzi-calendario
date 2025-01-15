import { PagoType } from "../schema/pago.type"
import getDatabase from "./connect"

export const getRealizadoByIdDB = async (_id: string) => {
  const db = await getDatabase()
  return await db.collection<PagoType>("PagosRealizados").findOne({ _id })
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const getRealizadosDB = async () => {
  // await new Promise(res => setTimeout(res, 5000))
  const db = await getDatabase()
  return await db.collection<PagoType>("PagosRealizados").find().sort({ "vencimiento": 1 }).toArray()
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarRealizadoDB = async (newRealizado: PagoType) => {
  console.log("Insertamos nuevo realizado:", newRealizado)
  // const db = await getDatabase()
  // return db.collection<PagoType>("PagosRealizados").insertOne(newRealizado)
  return { success: true, error: "" }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarRealizadoDB = async (id: string) => {
  console.log("Eliminamos realizado:", id)
  // const db = await getDatabase()
  // const res = await db.collection<PagoType>("PagosRealizados").deleteOne({ _id: id })
  // if (res?.deletedCount !== 1) {
  //   return { success: false, error: "No se pudo elimianr el pago" }
  // } else
  return { success: true, error: "" }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const editarRealizadoDb = async (newRealizado: PagoType) => {
  console.log("Editamos realizado:", newRealizado)
  // const db = await getDatabase()
  // const res = await db.collection<PagoType>("PagosRealizados").updateOne(
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