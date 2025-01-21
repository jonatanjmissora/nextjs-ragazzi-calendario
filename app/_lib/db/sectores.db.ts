import { SectoresType } from "../schema/sectores.type"
import { getErrorMessage } from "../utils/getErrorMessage"
import getDatabase from "./connect"

/////////////////////////////////////////////////////////////////////////////////////////////////
export async function getSectoresResetDB() {
    //await new Promise(res => setTimeout(res, 10000))
    const db = await getDatabase()
    return await db.collection<SectoresType>("ConstantMenuSectores").find().toArray()
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export async function getSectoresActualesDB() {
    //await new Promise(res => setTimeout(res, 10000))
    const db = await getDatabase()
    return await db.collection<SectoresType>("SectoresActuales").find().toArray()
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const updateSectoresResetDB = async (rubro: string, newSectores: string[]) => {
    try {
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
        return { success: true, message: "Sector eliminado con éxito" }

    } catch (error) {
        return { success: false, message: `server-error: ${getErrorMessage(error)}` }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
export const updateSectoresActualesDB = async (rubro: string, newSectores: string[]) => {
    try {
        // const db = await getDatabase()
        // const res = await db.collection<SectoresType>("SectoresActuales").updateOne(
        // { _id: rubro},
        //      {
        //          $set { "sectores": newSectores}
        //      }
        //  )
        // if (res.modifiedCount !== 1) {
        //   return { success: false, error: "No se pudo editar el sector" }
        // } else
        return { success: true, message: "Sector eliminado con éxito" }

    } catch (error) {
        return { success: false, message: `server-error: ${getErrorMessage(error)}` }
    }
}
