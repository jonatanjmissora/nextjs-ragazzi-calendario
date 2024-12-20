"use client"

import { SectoresType } from "@/app/_lib/schema/sectores.type";
import toast from "react-hot-toast";

export default function AdminSectoresList({ sectoresList }: { sectoresList: SectoresType[] }) {

  const handleClick = () => {
    //eliminar sector de la base de datos
    toast.success("Sector eliminado")
  }

  return (
    <article className="table-width flex flex-col justify-center items-center">

      {
        sectoresList.map((rubro, index) =>

          <div key={index} className="w-[90%] flex flex-col gap-2 rounded-lg bg-slate-700 p-4 mx-auto my-4">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-bold">{rubro._id}</span>
              <div className="flex gap-2">
                <input type="text" className="bg-slate-700 border-b border-slate-400 text-center" placeholder="nuevo..." />
                +
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {
                rubro.sectores.map((sector, index) =>
                  <span key={index} className={`flex gap-2 badge badge-outline text-slate-400 text-sm font-bold`}>
                    {sector}
                    <button onClick={handleClick} className="text-slate-500 hover:text-slate-200">X</button>
                  </span>
                )
              }
            </div>

          </div>
        )
      }

    </article>
  )
}
