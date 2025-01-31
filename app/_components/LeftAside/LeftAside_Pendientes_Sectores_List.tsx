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
    <li
      key={rubro._id}
      className={`collapse collapse-arrow hover:bg-${rubro._id} join-item border-t border-foreground25 rounded-none last:border-b`}
    >

      <input
        type="checkbox"
        name="my-accordion-4"
        checked={rubro._id === actualRubro}
        onChange={() => handleChange(rubro._id)}
      />

      <p className={`collapse-title font-medium text-foreground hover:text-foreground80 transition hover:${rubro} leftAside-sectores`}>{rubro._id} ({rubro.sectores.length})</p>

      {<Sectores rubro={rubro._id} sectores={rubro.sectores} setActualRubro={setActualRubro} />}
    </li>
  )
}
