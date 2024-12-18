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
    <>
      <h2>Filtros categoria</h2>

      <div className="w-3/4">
        <h3>rubro</h3>
        <select name="rubro" className="select w-full" defaultValue={rubroFilter} onChange={(e) => handleRubroChange(e.currentTarget.value)}>
          {rubros.map(rubro => <option key={rubro} className="option" value={rubro}>{rubro}</option>)}
        </select>
      </div>

      <div className="w-3/4">
        <h3>sector</h3>
        <select name="sector" className="select w-full" defaultValue={sectorFilter} onChange={(e) => handleSectorChange(e.currentTarget.value)}>
          {
            sectoresConstant.map(sector => <option key={sector} className="option">{sector}</option>)
          }
        </select>
      </div>
    </>
  )
}
