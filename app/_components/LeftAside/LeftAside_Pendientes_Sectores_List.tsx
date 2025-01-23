"use client"

import { SectoresType } from '@/app/_lib/schema/sectores.type'
import { useState } from 'react'
import { Sectores } from './LeftAside_Pendientes_Sectores_Form'

export default function LeftAsideSectoresForm({ sectoresActuales }: { sectoresActuales: SectoresType[] }) {

  const [actualRubro, setActualRubro] = useState<string>("")

  return (
    <ul className="w-full">
      {
        sectoresActuales.map(rubro =>
          <Input key={rubro._id} rubro={rubro} actualRubro={actualRubro} setActualRubro={setActualRubro} />
        )
      }
    </ul>
  )
}

const Input = ({ rubro, actualRubro, setActualRubro }: { rubro: SectoresType, actualRubro: string, setActualRubro: React.Dispatch<React.SetStateAction<string>> }) => {

  const handleChange = (rubro: string) => {
    if (actualRubro === rubro) {
      setActualRubro("")
    } else {
      setActualRubro(rubro)
    }
  }

  return (
    <li key={rubro._id} className="collapse collapse-arrow join-item border border-foreground25  border-l-0 border-r-0 rounded-none">

      <input
        type="checkbox"
        name="my-accordion-4"
        className={rubro._id}
        checked={rubro._id === actualRubro}
        onChange={() => handleChange(rubro._id)}
      />
      <div className="collapse-title text-xl font-medium">{rubro._id} ({rubro.sectores.length})</div>
      {<Sectores rubro={rubro._id} sectores={rubro.sectores} setActualRubro={setActualRubro} />}
    </li>
  )
}
