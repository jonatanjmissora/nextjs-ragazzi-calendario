"use client"

import LogoutSVG from "@/app/_assets/LogoutSVG";
import { logout } from "@/app/_lib/actions/user.action";

export default function UserLogout({ username }: { username: string }) {
  return (
    <article className="tracking-widest text-sm text-slate-400 flex justify-between items-center">
      <span>Hola, {username.toUpperCase()}</span>
      <form action={logout}>
        <button>
          <LogoutSVG className="size-5 hover:text-white" currentColor="currentColor" />
        </button>
      </form>
    </article>
  )
}
