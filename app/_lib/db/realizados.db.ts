import { PagoType } from "../schema/pago.type"
import { getErrorMessage } from "../utils/getErrorMessage"
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
  try {
    // const db = await getDatabase()
    // return db.collection<PagoType>("PagosRealizados").insertOne(newRealizado)
    return { success: true, prevState: newRealizado, message: "Pago insertado con éxito" }

  } catch (error) {
    return { success: false, prevState: newRealizado, message: `server-error: ${getErrorMessage(error)}` }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarRealizadoDB = async (realizado: PagoType) => {
  try {
    // const db = await getDatabase()
    // const res = await db.collection<PagoType>("PagosRealizados").deleteOne({ _id: realizado._id })
    // if (res?.deletedCount !== 1) {
    //   return { success: false, prevState: realizado, message: "No se pudo eliminar el pago" }
    // } else
    return { success: true, prevState: realizado, message: "Dato eliminado con éxito" }

  } catch (error) {
    return { success: false, prevState: realizado, message: `server-error: ${getErrorMessage(error)}` }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const editarRealizadoDb = async (newRealizado: PagoType) => {
  try {
    // const db = await getDatabase()
    // const res = await db.collection<PagoType>("PagosRealizados").updateOne(
    //   { _id: newRealizado._id },
    //   {
    //     $set: { "monto": newRealizado.monto, "pagado": newRealizado.pagado }
    //   }
    // )
    // if (res.modifiedCount !== 1) {
    //   return { success: false, prevState: realizado, message: "No se pudo editar el pago"  }
    // } else
    return { success: true, prevState: newRealizado, message: "Dato editado con éxito" }

  } catch (error) {
    return { success: false, prevState: newRealizado, message: `server-error: ${getErrorMessage(error)}` }
  }
}