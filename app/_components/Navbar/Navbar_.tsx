import { JwtPayload } from "jsonwebtoken"
import getUserFromCookie from "../../_lib/utils/getUserFromCookies"
import NavbarDesktop from "./Navbar_Desktop"
import NavbarMovil from "./Navbar_Movil"

export default async function Navbar() {

  const user = await getUserFromCookie() as JwtPayload

  if (!user) return

  return (
    <>

      <NavbarDesktop username={user.username} />
      <NavbarMovil />

    </>
  )
}
