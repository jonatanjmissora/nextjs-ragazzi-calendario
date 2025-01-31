import MenuLinks from "./Navbar_Desktop_MenuLinks";
import UserMenu from "./Navbar_Desktop_User_Menu";

export default function NavbarDesktop({ username }: { username: string }) {

  return (

    <nav className='flex w-full navbar-container justify-between items-center pl-8'>
      <MenuLinks />
      <UserMenu username={username} />
    </nav>

  )
}
