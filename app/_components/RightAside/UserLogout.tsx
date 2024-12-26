"use client"

import LogoutSVG from "@/app/_assets/LogoutSVG";
import { logout } from "@/app/_lib/actions/user.action";

export default function UserLogout({ username }: { username: string }) {
  return (
    <article className="text-xs text-slate-500 flex justify-between items-center w-full">
      {username.toUpperCase()}
      <form action={logout}>
        <button>
          <LogoutSVG className="size-5 hover:text-white" currentColor="currentColor" />
        </button>
      </form>
    </article>
  )
}
