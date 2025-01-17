"use server"

import { WeblinkType } from "../schema/weblink.type"
import getDatabase from "./connect"

/////////////////////////////////////////////////////////////////////////////////////////////////
export async function getWeblinksDB() {
  const db = await getDatabase()
  return await db.collection<WeblinkType>("ConstantAdminLinks").find().toArray()
}


/////////////////////////////////////////////////////////////////////////////////////////////////
export const getWeblinkByIdDB = async (_id: string) => {
  const db = await getDatabase()
  return await db.collection<WeblinkType>("ConstantAdminLinks").findOne({ _id })
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarWeblinkDB = async (id: string) => {
  console.log("Eliminamos link:", id)
  // const db = await getDatabase()
  // const res = await db.collection<WeblinkType>("ConstantAdminLinks").deleteOne({ _id: id })
  // if (res?.deletedCount !== 1) {
  //   return { success: false, error: "No se pudo elimianr el link" }
  // } else
  return { success: true, error: "" }
}

export const insertarWeblinkDB = async (newWeblink: WeblinkType) => {
  // const db = await getDatabase()
  // const res = await db.collection<WeblinkType>("ConstantAdminLinks").insertOne(pendiente)
  // if (!res?.insertedId.toString()) {
  //   return { success: false, prevState: { name: "", href: "" }, message: "Error al insertar en DB" }
  // } else  
  return { success: true, prevState: { name: "", href: "" }, message: "Link agregado exitosamente" }

}