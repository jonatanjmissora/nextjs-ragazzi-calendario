import { unstable_cache } from "next/cache";
import { WeblinkType } from "../schema/weblink.type";
import { getWeblinksDB } from "../db/weblinks.db";

export const getCachedWeblinksAction = unstable_cache(async () => {
  return await getWeblinksDB()
},
  ["sectores"],
  {
    tags: ["sectores"],
    revalidate: 3600,
  }
)

export const addWeblink = async (newWeblink: WeblinkType) => {
  await new Promise(res => setTimeout(res, 5000))
  return { success: true, message: "Link agregado exitosamente" }
}