"use client"

import { SectoresType } from '@/app/_lib/schema/sectores.type'
import { useState } from 'react'
import { Sectores } from './LeftAside_Pendientes_Sectores_Form'

const RUBROS = ["ragazzi", "patricios", "palihue", "jmolina"]

const getSectoresOfRubro = (sectores: SectoresType[], rubro: string) => {
  return sectores.filter(sector => sector._id === rubro )[0].sectores.sort((a, b) => a.localeCompare(b))
}

export default function LeftAsideSectoresForm({ sectoresActuales }: { sectoresActuales: SectoresType[] }) {

  const [actualRubro, setActualRubro] = useState<string>("")

  return (
    <ul className="w-full">
      {
        RUBROS.map(RUBRO =>
          <Rubro key={RUBRO} rubro={RUBRO} sectores={getSectoresOfRubro(sectoresActuales, RUBRO)} actualRubro={actualRubro} setActualRubro={setActualRubro} />
        )
      }
    </ul>
  )
}

const Rubro = ({ rubro, sectores, actualRubro, setActualRubro }: { rubro: string, sectores: string[], actualRubro: string, setActualRubro: React.Dispatch<React.SetStateAction<string>> }) => {

  const handleChange = (rubro: string) => {
    if (actualRubro === rubro) {
      setActualRubro("")
    } else {
      setActualRubro(rubro)
    }
  }

  return (
    <li
      className={`collapse collapse-arrow hover:bg-${rubro} join-item border-t border-foreground25 rounded-none last:border-b`}
    >

      <input
        type="checkbox"
        name="my-accordion-4"
        checked={rubro === actualRubro}
        onChange={() => handleChange(rubro)}
      />

      <p 
        className={`collapse-title font-medium text-foreground hover:text-foreground80 transition hover:${rubro} leftAside-sectores`}
      >
        {rubro} <span className='text-base'>( {sectores.length} )</span>
      </p>

      {<Sectores rubro={rubro} sectores={sectores} setActualRubro={setActualRubro} />}
    </li>
  )
}
