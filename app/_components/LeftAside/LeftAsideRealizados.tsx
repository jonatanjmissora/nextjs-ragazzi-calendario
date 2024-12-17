import { getLocaleDate } from '@/app/_lib/utils/getActualDate'
import React from 'react'

export default function LeftAsideRealizados({yearFilter, monthFilter}:{yearFilter: number, monthFilter: number}) {

  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  const anios = [2023, 2024, 2025]

  const handleMonthChange

  const handleYearChange
  

  return (
    <aside className='p-4'>
      <div>
        <h2 className="label" >archivo</h2>
        <div className='flex flex-wrap gap-2'>

          {
            meses.map(mes => <span className={`font-bold tracking-wider border border-slate-500 text-slate-500 p-1 rounded-lg hover:text-slate-300 hover:border-slate-300 ${mes === meses[monthFilter] && "bg-slate-400 text-slate-900"}`} key={mes}>{mes}</span>)
          }

        </div>

        <label className='label' htmlFor='anio'>año</label>
        <select className='text-slate-500 p-1 bg-transparent w-1/2 border-b border-slate-500' name="anio" id="anio" defaultValue={yearFilter.toString()}>
          {
           anios.map(anio => <option key={anio}>{anio}</option>) 
          }
        </select>
      </div>
    </aside>
  )
}
