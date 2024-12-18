"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FiltrosFecha({ desdeFilter, hastaFilter }: { desdeFilter: string, hastaFilter: string }) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleDesdeChange = (filterName: string) => {
    const params = new URLSearchParams(searchParams);

    if (desdeFilter !== "") {
      params.set('desdeFilter', filterName);
    } else {
      params.delete('desdeFilter');
    }
    router.replace(`${pathname}?${params.toString()}`);

  }

  const handleHastaChange = (filterName: string) => {
    const params = new URLSearchParams(searchParams);

    if (hastaFilter !== "") {
      params.set('hastaFilter', filterName);
    } else {
      params.delete('hastaFilter');
    }
    router.replace(`${pathname}?${params.toString()}`);

  }

  return (
    <>
      <h2>Filtros fecha</h2>

      <div className="w-3/4">
        <label className="label" htmlFor="desde">desde</label>
        <input className="input w-full" type="date" id="desde" defaultValue={desdeFilter} onChange={(e) => handleDesdeChange(e.currentTarget.value)} />
      </div>

      <div className="w-3/4">
        <label className="label" htmlFor="desde">hasta</label>
        <input className="input w-full" type="date" id="desde" defaultValue={hastaFilter} onChange={(e) => handleHastaChange(e.currentTarget.value)} />
      </div>
    </>
  )
}
