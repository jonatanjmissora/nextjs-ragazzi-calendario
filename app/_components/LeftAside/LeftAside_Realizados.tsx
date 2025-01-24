"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function LeftAsideRealizados({ dateFilter }: { dateFilter: string }) {

  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  const anios = [2023, 2024, 2025]
  const [yearFilter, monthFilter] = dateFilter.split("-")

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleMonthChange = (index: number) => {
    const params = new URLSearchParams(searchParams);

    const newMonthFilter = (index + 1) < 10 ? "0" + (index + 1) : (index + 1).toString()
    if (newMonthFilter === monthFilter) return

    const newDateFilter = yearFilter + "-" + newMonthFilter
    params.set('dateFilter', newDateFilter);

    router.replace(`${pathname}?${params.toString()}`);

  }

  const handleYearChange = (newYearFilter: string) => {
    const params = new URLSearchParams(searchParams);
    if (newYearFilter === yearFilter) return

    const newDateFilter = newYearFilter + "-" + monthFilter
    params.set('dateFilter', newDateFilter);

    router.replace(`${pathname}?${params.toString()}`);

  }

  return (
    <aside className='leftAside-width flex flex-col justify-center items-center gap-20'>

      <div className="w-full">
        <label className='label' htmlFor='anio'>año</label>
        <select
          className='p-1 bg-transparent w-full border-b border-foreground'
          onClick={(e) => handleYearChange(e.currentTarget.value)}
          name="anio"
          id="anio"
          defaultValue={yearFilter.toString()}>
          {
            anios.map(anio =>
              <option
                key={anio}
              >
                {anio}
              </option>)
          }
        </select>
      </div>

      <div className="">

        <h2 className="label" >mes</h2>
        <div className='flex flex-wrap gap-2 justify-center items-center'>

          {
            meses.map((mes, index) =>
              <div
                className={`flex justify-between w-[48%] font-bold tracking-wider border border-foreground80 text-foreground80 p-1 rounded-lg hover:text-foreground hover:border-foreground ${mes === meses[+monthFilter - 1] && "bg-foreground80 text-white"}`}
                key={mes}
                onClick={() => handleMonthChange(index)}
              >
                <span>{mes}</span>
                <span>{index + 1}</span>
              </div>)
          }

        </div>
      </div>

    </aside>
  )
}
