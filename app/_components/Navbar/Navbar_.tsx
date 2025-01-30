import { JwtPayload } from "jsonwebtoken"
import getUserFromCookie from "../../_lib/utils/getUserFromCookies"
import NavbarDesktop from "./Navbar_Desktop"
import NavbarMovil from "./Navbar_Movil"
import { cookies } from "next/headers"

export default async function Navbar() {

  const user = await getUserFromCookie() as JwtPayload
  const viewport = (await cookies()).get("viewport")?.value

  if (!user) return

  return (
    <>

      {viewport === "desktop"
        ? <NavbarDesktop username={user?.username} />
        : <NavbarMovil />
      }

    </>
  )
}
