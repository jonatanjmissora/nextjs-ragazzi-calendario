import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { getErrorMessage } from "./getErrorMessage"

export default async function getUserFromCookie() {
  const cookie = (await cookies()).get("usertoken")?.value
  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWTSECRET!)
      return decoded
    } catch (error) {
      return getErrorMessage(error)
    }
  }
}