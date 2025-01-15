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
export const updateSectorDB = async (rubro: string, newSectores: string[]) => {
    // const db = await getDatabase()
    // const res = await db.collection<SectoresType>("ConstantMenuSectores").updateOne(
    // { _id: rubro},
    //      {
    //          $set { "sectores": newSectores}
    //      }
    //  )
    // if (res.modifiedCount !== 1) {
    //   return { success: false, error: "No se pudo editar el sector" }
    // } else
    return { success: true, error: "" }
}
