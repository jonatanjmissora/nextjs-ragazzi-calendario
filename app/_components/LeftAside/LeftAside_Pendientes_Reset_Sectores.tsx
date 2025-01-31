"use client"

import { resetSectoresAction } from "@/app/_lib/actions/sectores.action"
import { useActionState } from "react"
import SubmitBtn from "../SubmitBtn"
import toast from "react-hot-toast"

export default function LeftAsidePendientesResetSectores() {

  const [formState, formAction, isPending] = useActionState(async () => {

    const res = await resetSectoresAction()
    if (res.success) {
      toast.success("Sectores reseteados")
      return { ...res, message: "" }
    }
    return res

  }, null)

  return (
    <form action={formAction} className="flex flex-col gap-2 items-center">
      <SubmitBtn text="reload" isPending={isPending} className="  px-4 py-0 h-8 w-16" classNameSVG="" />
      <p className="text-orange-700  ">{formState?.message}</p>
    </form>
  )
}
