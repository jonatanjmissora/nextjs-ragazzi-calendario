import { unstable_cache } from "next/cache"
import { PendientesType } from "../types/pendientes.type"
import getDatabase from "./connect"

export async function getPagosPendientesCollection(collectionName: string) {
  const db = await getDatabase()
  return await db.collection<PendientesType>(collectionName).find().toArray()
}

export const getCachedPagosPendientes = unstable_cache(async () => {
  const doc = await getPagosPendientesCollection("PagosPendientes")
  return doc
},
  ["sectores"],
  {
    tags: ["sectores"],
    revalidate: 3600,
  }
)