"use server"

import { revalidateTag, unstable_cache } from "next/cache";
import { WeblinkType } from "../schema/weblink.type";
import { eliminarWeblinkDB, getWeblinkByIdDB, getWeblinksDB, insertarWeblinkDB } from "../db/weblinks.db";
import { getErrorMessage } from "../utils/getErrorMessage";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedWeblinksAction = unstable_cache(async () => {
  return await getWeblinksDB()
},
  ["weblinks"],
  {
    tags: ["weblinks"],
    revalidate: 3600,
  }
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarWeblinkAction = async (newWeblink: WeblinkType) => {
  try {
    const res = await insertarWeblinkDB(newWeblink)
    if (res.success) {
      revalidateTag("weblinks")
    }
    return res

  } catch (error) {
    return { success: false, prevState: { name: "", href: "" }, message: `server-error: ${getErrorMessage(error)}` }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getWeblinkByIdAction = async (id: string) => {
  return await getWeblinkByIdDB(id)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarWeblinkAction = async (id: string) => {
  try {
    const res = await eliminarWeblinkDB(id)
    if (!res.success) {
      throw new Error(res.error)
    }

    revalidateTag("realizados")
    return { success: true, error: "" }

  } catch (error) {
    return { success: false, error: `server-error: ${getErrorMessage(error)}` }
  }
}