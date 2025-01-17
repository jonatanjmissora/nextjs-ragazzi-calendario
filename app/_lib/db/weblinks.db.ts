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