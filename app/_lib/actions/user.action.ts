"use server"

import bcrypt from "bcryptjs"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getErrorMessage } from "../utils/getErrorMessage";
import { userSchema, UserType, UserWithIdType } from "../schema/user.type";
import setUserToCookie from "../utils/setUserToCookie";
import { getCollection } from "../db/connect";

export type ResponseType = {
  success: boolean;
  prevState: { username: string, userpassword: string },
  errors: { username: string, userpassword: string }
} | null

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getUserByName = async (name: string) => {
  const usersCollection = await getCollection("users")
  return await usersCollection.findOne({ username: name }) as UserWithIdType
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const insertUser = async (newUser: UserType) => {
  const usersCollection = await getCollection("users")
  return await usersCollection.insertOne(newUser)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const logout = async function () {
  const cookie = await cookies()
  cookie.delete("usertoken")
  redirect("/")
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const register = async (prevState: ResponseType, formData: FormData) => {

  const username = formData.get("username") as string
  let userpassword = formData.get("userpassword") as string

  const registerResponse = {
    success: false,
    prevState: { username, userpassword },
    errors: { username: "", userpassword: "" }
  }

  // server-validation
  const { success, error } = userSchema.safeParse({ username, userpassword })
  if (!success) {
    const { username: userError, userpassword: passwordError } = error.flatten().fieldErrors
    if (userError) registerResponse.errors.username = userError[0]
    if (passwordError) registerResponse.errors.userpassword = passwordError[0]
    return registerResponse
  }

  // verificacion de nombre registrado
  const user = await getUserByName(username)
  if (user) {
    registerResponse.errors.username = "nombre ya registrado"
    registerResponse.errors.userpassword = ""
    return registerResponse
  }

  // si todo esta bien creo el usuario en la base de datos
  const salt = bcrypt.genSaltSync(10)
  userpassword = bcrypt.hashSync(userpassword, salt)

  try {
    //insertar en DB
    const res = await insertUser({ username, userpassword })
    if (!res.insertedId.toString()) {
      registerResponse.errors.userpassword = "Error en el servidor"
      return registerResponse
    }
    await setUserToCookie(username, res.insertedId.toString())
    redirect("/")
  } catch (error) {
    registerResponse.errors.userpassword = getErrorMessage(error)
    return registerResponse
  }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const login = async function (loginUser: UserType) {

  const { username, userpassword } = loginUser

  const loginResponse = {
    success: false,
    prevState: { username, userpassword },
    errors: { username: "", userpassword: "" }
  }

  // server-validation
  const { success, error } = userSchema.safeParse({ username, userpassword })
  if (!success) {
    const { username: userError, userpassword: passwordError } = error.flatten().fieldErrors
    if (userError) loginResponse.errors.username = userError[0]
    if (passwordError) loginResponse.errors.userpassword = passwordError[0]
    return loginResponse
  }

  // verificacion de usuario registrado
  const user = await getUserByName(username)
  if (!user) {
    loginResponse.errors.username = "usuario no registrado"
    loginResponse.errors.userpassword = ""
    return loginResponse
  }

  // verificacion de contraseña almacenada
  const matchOrNot = bcrypt.compareSync(userpassword, user.userpassword)
  if (!matchOrNot) {
    loginResponse.errors.userpassword = "La contraseña no corresponde al usuario"
    return loginResponse
  }

  // si todo esta bien
  await setUserToCookie(username, user._id?.toString())
  redirect("/pendientes")
}