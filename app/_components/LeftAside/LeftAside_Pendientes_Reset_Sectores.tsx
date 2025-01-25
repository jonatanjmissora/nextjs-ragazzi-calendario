"use client"

import { resetSectoresAction } from "@/app/_lib/actions/sectores.action"
import { revalidateTag } from "next/cache"
import { useActionState } from "react"
import SubmitBtn from "../SubmitBtn"

export default function LeftAsidePendientesResetSectores() {

const [formState, formAction, isPending] = useActionState(async () => {

    const res = await resetSectoresAction()
    if(!res.success) {
        return res
    }
    
    revalidateTag("sectores")
    return res

    }, null)

  return (
    <form action={formAction}>
        <SubmitBtn text="reload" isPending={false} className="text-xs px-4 py-3"/>
        <p className="text-orange-700">{formState?.message}</p>
    </form>
  )
}
