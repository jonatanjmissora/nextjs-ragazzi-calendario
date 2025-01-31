"use client"

import { updateSectoresActualesAction, updateSectoresResetAction } from '@/app/_lib/actions/sectores.action';
import { SectoresType } from '@/app/_lib/schema/sectores.type';
import React, { useActionState } from 'react'
import toast from 'react-hot-toast';
import SubmitBtn from '../../SubmitBtn';
import PlusSVG from '@/app/_assets/PlusSVG';

type RespType = {
  success: boolean;
  message: string;
} | null

export default function AdminSectoresNewForm({ sectoresType, sectoresList, rubroActual }: { sectoresType: string, sectoresList: SectoresType[], rubroActual: SectoresType }) {

  const [, formAction, isPending] = useActionState(async (prevState: RespType, formData: FormData) => {

    const rubro = formData.get("rubro") as string
    const newSector = formData.get("newSector")?.toString().trim()
    if (!newSector) return null

    const sectoresActual = sectoresList.filter(r => r._id === rubro)[0].sectores

    if (sectoresActual.includes(newSector)) {
      toast.error("Ya se encuentra")
      return null
    }

    const newSectores = [...sectoresActual, newSector]

    const serverResp = sectoresType === "reset"
      ? await updateSectoresResetAction(rubro, newSectores)
      : await updateSectoresActualesAction(rubro, newSectores)
    if (!serverResp.success) {
      toast.error("No fue posible agregar sector")
    }
    toast.success(`${newSector} añadido con éxito`)
    return serverResp

  }, null)

  return (
    <form action={formAction} className="flex justify-center items-center gap-2 admin-sectores-new">
      <input type="hidden" name="rubro" defaultValue={rubroActual._id} />
      <input type="text" className="input-main w-40 py-1 text-center" name="newSector" placeholder="nuevo..." required />
      <SubmitBtn isPending={isPending} className="h-9 w-9 flex justify-center items-center" classNameSVG="size-6">
        <PlusSVG className="size-6 p-0 text-foreground hover:text-foreground80" currentColor="currentColor" />
      </SubmitBtn>
    </form>
  )
}
