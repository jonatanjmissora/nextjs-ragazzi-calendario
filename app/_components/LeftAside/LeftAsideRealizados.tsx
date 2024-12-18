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
    console.log({ newMonthFilter })
    console.log({ monthFilter })
    if (newMonthFilter === monthFilter) return

    const newDateFilter = yearFilter + "-" + newMonthFilter
    params.set('dateFilter', newDateFilter);

    router.replace(`${pathname}?${params.toString()}`);

  }

  const handleYearChange = (newYearFilter: string) => {
    const params = new URLSearchParams(searchParams);
    console.log({ newYearFilter })
    if (newYearFilter === yearFilter) return

    const newDateFilter = newYearFilter + "-" + monthFilter
    params.set('dateFilter', newDateFilter);

    router.replace(`${pathname}?${params.toString()}`);

  }

  return (
    <aside className='p-4'>
      <div className="flex flex-col gap-8">
        <div>

          <h2 className="label" >archivo</h2>
          <div className='flex flex-wrap gap-2'>

            {
              meses.map((mes, index) =>
                <div
                  className={`flex justify-between w-[45%] font-bold tracking-wider border border-slate-500 text-slate-500 p-1 rounded-lg hover:text-slate-300 hover:border-slate-300 ${mes === meses[+monthFilter - 1] && "bg-slate-400 text-slate-900"}`}
                  key={mes}
                  onClick={() => handleMonthChange(index)}
                >
                  <span>{mes}</span>
                  <span>{index + 1}</span>
                </div>)
            }

          </div>
        </div>

        <div className="w-[45%]">
          <label className='label' htmlFor='anio'>año</label>
          <select
            className='text-slate-500 p-1 bg-transparent w-full border-b border-slate-500'
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
      </div>
    </aside>
  )
}
