import { unstable_cache } from "next/cache"
import { SectoresType } from "../types/sectores.type"
import getDatabase from "./connect"


export async function getSectoresActualesCollection(collectionName: string) {
    const db = await getDatabase()
    return db.collection<SectoresType>(collectionName).find().toArray() 
}

export const getCachedSectoresActuales = unstable_cache( async() => {
    return await getSectoresActualesCollection("SectoresActuales")
    },
    ["sectores"],
    {
        tags: ["sectores"],
        revalidate: 3600,
    }
)