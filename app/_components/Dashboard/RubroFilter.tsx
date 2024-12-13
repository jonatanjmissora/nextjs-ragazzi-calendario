"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function RubroFilter() {

    // const [actualFilter, setActualFilter] = useState<string>("todos")
    const filters = ["todo", "ragazzi", "patricios", "palihue", "jmolina"]

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const rubroFilter = searchParams.get("rubroFilter") || ""

    console.log({rubroFilter})

    const handleClick = (filterName: string) => {
        const params = new URLSearchParams(searchParams);

    if (rubroFilter !== "") {
      params.set('rubroFilter', filterName);
    } else {
      params.delete('rubroFilter');
    }
    router.replace(`${pathname}?${params.toString()}`);

    }

  return (
    <ul className="flex flex-col gap-3 bg-slate-800 p-8">
        {
            filters.map(filter => 
            <li 
                key={filter}
                className={`badge badge-outline text-slate-600 ${filter === rubroFilter && "badge-primary"} px-5 py-3 text-base`}>
                <button onClick={() => handleClick(filter)}>
                {filter}
                </button>
            </li>
            )
        }
      
    </ul>
  )
}
