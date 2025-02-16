"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function RubroFilter() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  if (pathname.includes("/admin")) return

  const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]

  const rubroFilter = searchParams.get("rubroFilter") || "todos"

  const handleClick = (filterName: string) => {
    const params = new URLSearchParams(searchParams);

    if (rubroFilter !== "") {
      params.set('rubroFilter', filterName);
    } else {
      params.delete('rubroFilter');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='rubro-filter flex justify-center items-center pb-3'>
      <ul className="flex justify-center items-center gap-1 flex-wrap">
        {
          filters.map(filter =>
            <li
              key={filter}
              className={`text-sm badge-main ${filter === rubroFilter && filter}`}
              onClick={() => handleClick(filter)}
            >
              {filter}
            </li>
          )
        }

      </ul>
    </div>
  )
}