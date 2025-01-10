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
export const register = async (registerUser: UserType) => {

  const { username } = registerUser
  let { userpassword } = registerUser

  const registerResponse = {
    success: false,
    prevState: { username, userpassword },
    message: ""
  }

  // server-validation
  const { success } = userSchema.safeParse({ username, userpassword })
  if (!success) {
    registerResponse.message = "Error validando servidor"
    return registerResponse
  }

  // verificacion de nombre registrado
  const actualUser = await getUserByName(username)
  if (actualUser) {
    registerResponse.message = "Nombre ya registrado"
    return registerResponse
  }

  // si todo esta bien creo el usuario en la base de datos
  const salt = bcrypt.genSaltSync(10)
  userpassword = bcrypt.hashSync(userpassword, salt)

  try {
    //insertar en DB
    const res = await insertUser({ username, userpassword })
    if (!res.insertedId.toString()) {
      registerResponse.message = "Error en el servidor"
      return registerResponse
    }
    await setUserToCookie(username, res.insertedId.toString())
    registerResponse.success = true
    registerResponse.message = "Usuario registrado"
    return registerResponse
  } catch (error) {
    registerResponse.message = getErrorMessage(error)
    return registerResponse
  }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const login = async function (loginUser: UserType) {

  const { username, userpassword } = loginUser

  const loginResponse = {
    success: false,
    prevState: { username, userpassword },
    message: ""
  }

  // server-validation
  const { success } = userSchema.safeParse({ username, userpassword })
  if (!success) {
    loginResponse.message = "Error validando servidor"
    return loginResponse
  }

  // verificacion de usuario registrado
  const actualUser = await getUserByName(username)
  if (!actualUser) {
    loginResponse.message = "Usuario no registrado"
    return loginResponse
  }

  // verificacion de contraseña almacenada
  const matchOrNot = bcrypt.compareSync(userpassword, actualUser.userpassword)
  if (!matchOrNot) {
    loginResponse.message = "La contraseña no corresponde al usuario"
    return loginResponse
  }

  // si todo esta bien
  await setUserToCookie(username, actualUser._id?.toString())
  redirect("/pendientes")
}