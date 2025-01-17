"use server"

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { WeblinkType } from "../schema/weblink.type";
import { getWeblinkByIdDB, getWeblinksDB } from "../db/weblinks.db";
import { redirect } from "next/navigation";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedWeblinksAction = unstable_cache(async () => {
  return await getWeblinksDB()
},
  ["weblinks"],
  {
    tags: ["weblinks"],
    revalidate: 3600,
  }
)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const addWeblinkAction = async (newWeblink: WeblinkType) => {
  await new Promise(res => setTimeout(res, 1000))
  revalidateTag("weblinks")
  return { success: true, prevState:{name: "", href: ""}, message: "Link agregado exitosamente" }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getWeblinkByIdAction = async (id: string) => {
  return await getWeblinkByIdDB(id)
}