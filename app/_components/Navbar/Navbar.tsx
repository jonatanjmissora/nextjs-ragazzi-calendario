import { JwtPayload } from "jsonwebtoken"
import getUserFromCookie from "../../_lib/utils/getUserFromCookies"
import MenuLinks from "./MenuLinks"
import UserLogout from "./UserLogout"

export default async function Navbar() {

  const user = await getUserFromCookie() as JwtPayload

  if (!user) return

  return (
    <nav className='w-full navbar-container flex justify-between items-center pl-8'>
      {user &&
        (<>
          <MenuLinks />
          <UserLogout username={user?.username} />
        </>
        )
      }
    </nav>
  )
}
