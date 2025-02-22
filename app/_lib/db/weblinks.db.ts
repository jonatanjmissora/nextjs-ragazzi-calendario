"use server"

import { WeblinkType } from "../schema/weblink.type"
import { getErrorMessage } from "../utils/getErrorMessage"
import getDatabase from "./connect"

/////////////////////////////////////////////////////////////////////////////////////////////////
export async function getWeblinksDB() {
  const db = await getDatabase()
  return await db.collection<WeblinkType>("ConstantAdminLinks").find().toArray()
}


/////////////////////////////////////////////////////////////////////////////////////////////////
export const getWeblinkByIdDB = async (_id: string) => {
  // await new Promise(res => setTimeout(res, 2000))
  const db = await getDatabase()
  return await db.collection<WeblinkType>("ConstantAdminLinks").findOne({ _id })
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarWeblinkDB = async (weblink: WeblinkType) => {
  try {
    // const db = await getDatabase()
    // const res = await db.collection<WeblinkType>("ConstantAdminLinks").deleteOne({ _id: weblink._id })
    // if (res?.deletedCount !== 1) {
    //   return { success: false, prevState: weblink, message: "No se pudo eliminar el link"  }
    // } else
    return { success: true, prevState: weblink, message: "Link eliminado con éxito" }

  } catch (error) {
    return { success: false, prevState: weblink, message: `server-error: ${getErrorMessage(error)}` }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarWeblinkDB = async (newWeblink: WeblinkType) => {
  try {
    // const db = await getDatabase()
    // const res = await db.collection<WeblinkType>("ConstantAdminLinks").insertOne(pendiente)
    // if (!res?.insertedId.toString()) {
    //   return { success: false, prevState: newWeblink, message: "Error al insertar en DB" }
    // } else  
    return { success: true, prevState: newWeblink, message: "Link agregado con éxito" }

  } catch (error) {
    return { success: false, prevState: newWeblink, message: `server-error: ${getErrorMessage(error)}` }
  }

}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const editarWeblinkDB = async (newWeblink: WeblinkType) => {
  //await new Promise(res => setTimeout(res, 1000))

  try {
    // const db = await getDatabase()
    // const res = await db.collection<WeblinkType>("ConstantAdminLinks").updateOne(
    //   { _id: newWeblink._id },
    //   {
    //     $set: { "monto": newWeblink.monto }
    //   }
    // )
    // if (res.modifiedCount !== 1) {
    //   return { success: false, prevState: newWeblink, message: "No se pudo editar el pago" }
    // } else
    return { success: true, prevState: newWeblink, message: "Pago editado con éxito" }

  } catch (error) {
    return { success: false, prevState: newWeblink, message: `server-error: ${getErrorMessage(error)}` }
  }
}