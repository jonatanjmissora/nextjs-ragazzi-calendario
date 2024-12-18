import { unstable_cache } from "next/cache"
import { SectoresType } from "../schema/sectores.type"
import getDatabase from "./connect"


export async function getSectoresActuales() {
    // await new Promise(res => setTimeout(res, 3000))
    const db = await getDatabase()
    return await db.collection<SectoresType>("SectoresActuales").find().toArray()
}

export async function getSectoresReset() {
    const db = await getDatabase()
    return await db.collection<SectoresType>("ConstantMenuSectores").find().toArray()
}

export const getCachedSectoresActuales = unstable_cache(async () => {
    return await getSectoresActuales()
},
    ["sectores"],
    {
        tags: ["sectores"],
        revalidate: 3600,
    }
)

export type SectoresConstantType = {
    _id: string;
    sectores: string[];
}

export async function getSectoresConstant() {
    const db = await getDatabase()
    return await db.collection<SectoresConstantType>("ConstantAdminSectores").find().toArray()
}

export const getCachedSectoresConstant = unstable_cache(async () => {
    return await getSectoresConstant()
},
    ["sectoresConstant"],
    {
        tags: ["sectoresConstant"],
        revalidate: 3600,
    }
)