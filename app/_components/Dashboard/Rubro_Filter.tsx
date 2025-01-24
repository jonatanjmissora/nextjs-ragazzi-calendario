"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function RubroFilter() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  if (pathname.includes("/admin")) return

  // const [actualFilter, setActualFilter] = useState<string>("todos")
  const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]

  const rubroFilter = searchParams.get("rubroFilter") || "todos"

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
    <div className='rubro-filter flex justify-center items-center pb-3'>
      <ul className="flex gap-1">
        {
          filters.map(filter =>
            <li
              key={filter}
              className={`badge-main text-sm ${filter === rubroFilter && filter}`}
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