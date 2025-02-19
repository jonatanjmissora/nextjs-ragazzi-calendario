import LogoSVG from "@/app/_assets/LogoSVG";
import MenuLinks from "./Navbar_Desktop_MenuLinks";
import UserMenu from "./Navbar_Desktop_User_Menu";

export default function NavbarDesktop({ username }: { username: string }) {

  return (

    <nav className='flex w-full navbar-container justify-between items-center pl-8'>
      <div className="flex items-center gap-12">
        <picture className="size-12">
          <LogoSVG className="w-full h-full text-foreground80" currentColor="currentColor" />
        </picture>
        <MenuLinks />
      </div>
      <UserMenu username={username} />
    </nav>

  )
}
