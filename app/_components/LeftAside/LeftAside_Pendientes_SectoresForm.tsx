"use client"

import PlaySVG from "@/app/_assets/PlaySVG"
import { insertarPendienteAction } from "@/app/_lib/actions/pendientes.action"
import { updateSectorAction } from "@/app/_lib/actions/sectores.action"
import { PendienteType, RubroType } from "@/app/_lib/schema/pendientes.type"
import { getActualDateStr } from "@/app/_lib/utils/getActualDate"
import { useState } from "react"
import toast from "react-hot-toast"

export const Sectores = ({ rubro, sectores }: { rubro: RubroType, sectores: string[] }) => {

  const [actualSector, setActualSector] = useState<string>("")
  const [error, setError] = useState<string>("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if (!actualSector) {
      setError("No seleccionó sector")
      return
    }
    const formData = new FormData(e.currentTarget)
    const newPendiente = Object.fromEntries(formData.entries()) as PendienteType
    newPendiente._id = newPendiente.vencimiento + "-" + newPendiente.rubro + "-" + newPendiente.sector

    const resp = await insertarPendienteAction(newPendiente)
    if (!resp.success) {
      setError("Error en el server")
      return
    }

    // actualizar el sector del menu
    const newSectores = sectores.filter(sector => sector !== newPendiente.sector)
    const respDelete = await updateSectorAction(rubro, newSectores)
    if (!respDelete.success) {
      setError("Error en el server")
      return
    }

    // cerrar el Dropdown menu
    toast.success("Pago creado exitosamete")
  }


  return (
    <ul className="collapse-content bg-slate-900 pt-2">

      <div className="flex flex-wrap gap-1">
        {
          sectores.map((sector, index) =>
            <li
              className={`${actualSector === sector && "bg-slate-500"} border border-transparent hover:text-cyan-800 py-1 px-2 rounded`}
              key={index}
            >
              <button onClick={() => setActualSector(sector)}>
                {sector}
              </button>
            </li>)
        }
      </div>

      <form onSubmit={onSubmit} className="flex gap-1 pt-2">
        <input type="hidden" name="rubro" defaultValue={rubro} />
        <input type="hidden" name="sector" defaultValue={actualSector} />
        <input className="w-6/12 bg-slate-500 py-1 rounded px-1" type="date" name="vencimiento" defaultValue={getActualDateStr()} />
        <input className="w-5/12 bg-slate-500 rounded text-center px-1" placeholder="monto" defaultValue={0} type="number" name="monto" onFocus={(e) => e.currentTarget.select()} />
        <button className="w-1/12 rounded bg-blue-500" type="submit"><PlaySVG className="size-5" currentColor="#ccc" /></button>
      </form>

      <p className="text-orange-700">{error}</p>

    </ul>
  )
}