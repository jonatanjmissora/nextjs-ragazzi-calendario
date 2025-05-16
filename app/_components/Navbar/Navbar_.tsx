import { JwtPayload } from "jsonwebtoken"
import getUserFromCookie from "../../_lib/utils/getUserFromCookies"
import NavbarDesktop from "./Navbar_Desktop"

export default async function Navbar() {
  const user = await getUserFromCookie() as JwtPayload

  if (!user) return null

  return (
    <NavbarDesktop username={user.username} />
  )
}
