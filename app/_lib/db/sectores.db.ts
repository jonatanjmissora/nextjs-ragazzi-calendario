import { unstable_cache } from "next/cache"
import { SectoresType } from "../schema/sectores.type"
import getDatabase from "./connect"


export async function getSectoresActuales() {
    const db = await getDatabase()
    return await db.collection<SectoresType>("SectoresActuales").find().toArray()
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