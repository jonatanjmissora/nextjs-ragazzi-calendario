"use client"

import PlaySVG from "@/app/_assets/PlaySVG"
import { insertarPendienteAction } from "@/app/_lib/actions/pendientes.action"
import { updateSectoresActualesAction } from "@/app/_lib/actions/sectores.action"
import { PagoType } from "@/app/_lib/schema/pago.type"
import { getActualDateStr } from "@/app/_lib/utils/getActualDate"
import { useActionState, useState } from "react"
import toast from "react-hot-toast"
import SubmitBtn from "../SubmitBtn"

type RespType = {
  success: boolean;
  message: string;
} | null

export const Sectores = ({ rubro, sectores, setActualRubro }: { rubro: string, sectores: string[], setActualRubro: React.Dispatch<React.SetStateAction<string>> }) => {

  const [actualSector, setActualSector] = useState<string>("")

  const [formState, formAction, isPending] = useActionState(async (prevState: RespType, formData: FormData) => {
    const newPendiente = Object.fromEntries(formData.entries()) as PagoType

    if (!newPendiente.sector) {
      return {
        success: false,
        message: "No hay sector seleccionado"
      }
    }

    newPendiente._id = newPendiente.vencimiento + "-" + newPendiente.rubro + "-" + newPendiente.sector

    // insertar en pagosPendientes
    const serverResp = await insertarPendienteAction(newPendiente)
    if (!serverResp.success) {
      return {
        success: false,
        message: "Error al insertar pago"
      }
    }

    // actualizar el sector del menu
    const newSectores = sectores.filter(sector => sector !== newPendiente.sector)
    const respDelete = await updateSectoresActualesAction(rubro, newSectores)
    if (!respDelete.success) {
      return {
        success: false,
        message: "Error al quitar sector"
      }
    }

    // cerrar el Dropdown menu
    if (serverResp.success && respDelete.success) {
      toast.success(serverResp.message)
      setActualRubro("")
    }

    return null

  }, null)


  return (
    <ul className={`collapse-content pt-2 bg-foreground25 rounded`}>

      <div className="flex flex-wrap gap-1">
        {
          sectores.map((sector, index) =>
            <li
              className={`${actualSector === sector && "bg-foreground80"} border border-transparent hover:text-foreground80 py-1 px-2 rounded`}
              key={index}
            >
              <button onClick={() => setActualSector(sector)}>
                {sector}
              </button>
            </li>)
        }
      </div>

      <form action={formAction} className="flex gap-4 pt-2">
        <input type="hidden" name="rubro" defaultValue={rubro} />
        <input type="hidden" name="sector" defaultValue={actualSector} />
        <input className="w-5/12 bg-slate-500 p-1 bg-background border-b border-foreground text-sm" type="date" name="vencimiento" defaultValue={getActualDateStr()} />
        <input className="w-5/12 bg-slate-500 text-center px-1 bg-background border-b border-foreground" placeholder="monto" defaultValue={0} type="number" name="monto" onFocus={(e) => e.currentTarget.select()} />
        <SubmitBtn isPending={isPending} className="px-1 rounded bg-foreground25 hover:bg-foreground80 hover:text-slate-800 transition">
          <PlaySVG className="size-5 text-inherit" currentColor="currentColor" />
        </SubmitBtn>
      </form>

      <p className="text-orange-700">{formState?.message}</p>

    </ul>
  )
}