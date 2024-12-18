"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
const rubros = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]

export default function FiltrosCategoria({ rubroFilter, sectorFilter, sectoresConstant }: {
  rubroFilter: string, sectorFilter: string, sectoresConstant: string[]
}) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleRubroChange = (filterName: string) => {
    const params = new URLSearchParams(searchParams);

    if (rubroFilter !== "") {
      params.set('rubroFilter', filterName);
    } else {
      params.delete('rubroFilter');
    }
    router.replace(`${pathname}?${params.toString()}`);

  }

  const handleSectorChange = (filterName: string) => {
    const params = new URLSearchParams(searchParams);

    if (sectorFilter !== "") {
      params.set('sectorFilter', filterName);
    } else {
      params.delete('sectorFilter');
    }
    router.replace(`${pathname}?${params.toString()}`);

  }


  return (
    <div className="w-3/4 flex flex-col gap-4">
      <h2>Filtros categoria</h2>

      <div className="w-full">
        <label className="label">rubro</label>
        <select name="rubro" className="select w-full" defaultValue={rubroFilter} onChange={(e) => handleRubroChange(e.currentTarget.value)}>
          {rubros.map(rubro => <option key={rubro} className="option" value={rubro}>{rubro}</option>)}
        </select>
      </div>

      <div className="w-full">
        <label className="label">sector</label>
        <select name="sector" className="select w-full" defaultValue={sectorFilter} onChange={(e) => handleSectorChange(e.currentTarget.value)}>
          {
            sectoresConstant.map(sector => <option key={sector} className="option">{sector}</option>)
          }
        </select>
      </div>
    </div>
  )
}
