import { unstable_cache } from "next/cache"
import { PendientesType } from "../types/pendientes.type"
import getDatabase from "./connect"

export const getPagosPendientes = async () => {
  const db = await getDatabase()
  return await db.collection<PendientesType>("PagosPendientes").find().sort({"vencimiento": 1}).toArray()
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

export const pagarPendiente = async () => {
}

export const eliminarPendiente = async () => {
}

export const editarPendiente = async () => {
}