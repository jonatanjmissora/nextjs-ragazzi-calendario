"use server"

import { revalidateTag, unstable_cache } from "next/cache";
import { WeblinkType } from "../schema/weblink.type";
import { eliminarWeblinkDB, getWeblinkByIdDB, getWeblinksDB, insertarWeblinkDB } from "../db/weblinks.db";

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getWeblinkByIdAction = async (id: string) => {
  return await getWeblinkByIdDB(id)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const insertarWeblinkAction = async (newWeblink: WeblinkType) => {
  const res = await insertarWeblinkDB(newWeblink)
  if (res.success) {
    revalidateTag("weblinks")
  }
  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const eliminarWeblinkAction = async (weblink: WeblinkType) => {
  const res = await eliminarWeblinkDB(weblink)
  if (res.success) {
    revalidateTag("realizados")
  }

  return res
}