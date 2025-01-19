"use server"

import { revalidateTag, unstable_cache } from "next/cache";
import { weblinkSchema, WeblinkType } from "../schema/weblink.type";
import { editarWeblinkDB, eliminarWeblinkDB, getWeblinkByIdDB, getWeblinksDB, insertarWeblinkDB } from "../db/weblinks.db";

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarWeblinkAction = async (newWeblink: WeblinkType) => {

  //server-valiation
  const { success, data, error } = weblinkSchema.safeParse(newWeblink)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newWeblink,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const res = await editarWeblinkDB(data)
  if (res.success) {
    revalidateTag("weblink")
  }

  return res
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const editarNewWeblinkAction = async (oldWeblink: WeblinkType, newWeblink: WeblinkType) => {

  //server-valiation
  const { success, data, error } = weblinkSchema.safeParse(newWeblink)
  if (!success) {
    const errors = error.flatten().fieldErrors
    return {
      success: false,
      prevState: newWeblink,
      message: `server-error: ${JSON.stringify(errors)}`
    }
  }

  const deleteResponse = await eliminarWeblinkDB(oldWeblink)
  if (!deleteResponse.success) {
    return deleteResponse
  }

  const insertResponse = await insertarWeblinkDB(data)
  if (!insertResponse.success) {
    return insertResponse
  }

  revalidateTag("weblink")
  return {
    success: true,
    prevState: newWeblink,
    message: `Link editado con éxito`
  }
}