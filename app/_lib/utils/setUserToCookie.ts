import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export default async function setUserToCookie(username: string, userId?: string) {

  const SECRET = process.env.JWTSECRET

  // create jwt value
  const ourTokenValue = jwt.sign({ username, _id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 100 }, SECRET!)

  // log the user in by giving them a cookie
  const cookie = await cookies()
  cookie.set("usertoken", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 100,
    secure: true
  })

}