"use client"

import { SectoresType } from '@/app/_lib/schema/sectores.type'
import { useState } from 'react'
import { Sectores } from './LeftAside_Pendientes_SectoresForm'

export default function LeftAsideSectoresForm({ sectoresActuales }: { sectoresActuales: SectoresType[] }) {

  const [actualState, setActualState] = useState<string>("")

  return (
    <ul className="w-full">
      {
        sectoresActuales.map(rubro =>
          <Input key={rubro._id} rubro={rubro} actualState={actualState} setActualSector={setActualState} />
        )
      }
    </ul>
  )
}

const Input = ({ rubro, actualState, setActualSector }: { rubro: SectoresType, actualState: string, setActualSector: React.Dispatch<React.SetStateAction<string>> }) => {

  return (
    <li key={rubro._id} className="collapse collapse-arrow join-item border-base-300 border border-l-0 border-r-0 rounded-none">

      <input
        type="checkbox"
        name="my-accordion-4"
        className={rubro._id}
        checked={rubro._id === actualState}
        onChange={() => setActualSector(rubro._id)}
      />
      <div className="collapse-title text-xl font-medium">{rubro._id} ({rubro.sectores.length})</div>
      {<Sectores rubro={rubro._id} sectores={rubro.sectores} setMainActualSector={setActualSector} />}
    </li>
  )
}
