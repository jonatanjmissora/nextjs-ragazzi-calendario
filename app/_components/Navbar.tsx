import { JwtPayload } from "jsonwebtoken"
import getUserFromCookie from "../_lib/utils/getUserFromCookies"
import MenuLinks from "./RightAside/MenuLinks"
import UserLogout from "./RightAside/UserLogout"

export default async function Navbar() {

  const user = await getUserFromCookie() as JwtPayload

  return (
    <nav className='main-width navbar-height flex justify-between items-center px-8 py-2'>
      <MenuLinks />
      <UserLogout username={user?.username} />
    </nav>
  )
}
