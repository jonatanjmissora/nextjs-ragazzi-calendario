import { PendienteType } from "../schema/pendientes.type"
import { SectoresType } from "../schema/sectores.type"
import getDatabase from "./connect"

/////////////////////////////////////////////////////////////////////////////////////////////////
export async function getSectoresResetDB() {
    const db = await getDatabase()
    return await db.collection<SectoresType>("ConstantMenuSectores").find().toArray()
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export async function getSectoresActualesDB() {
    // await new Promise(res => setTimeout(res, 3000))
    const db = await getDatabase()
    return await db.collection<SectoresType>("SectoresActuales").find().toArray()
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const insertSectorDB = async (sector: string) => {
    // const db = await getDatabase()
    // const res = await db.collection<PendienteType>("PagosPendientes").insertOne(pendiente)
    // if (!res?.insertedId.toString()) {
    //   return { success: false, error: "Error al insertar en DB" }
    // } else  
    return { success: true, error: "" }
}

export const updateSectorDB = async (rubro: string, sectores: string[], sector: string) => {
    // const newSectores = sectores.filter(sec => sec !== sector)
    // const db = await getDatabase()
    // const res = await db.collection<PendienteType>("PagosPendientes").updateOne(
    // { _id: rubro },
    //   {
    //     $set: { "sectores": newSectores }
    //   }
    //  )
    // if (res.modifiedCount !== 1) {
    //   return { success: false, error: "No se pudo editar el pago" }
    // } else
    return { success: true, error: "" }
}