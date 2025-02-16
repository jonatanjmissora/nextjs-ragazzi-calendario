"use client"

import { useState } from "react"

const desktopTableHeader = ["", "venc", "rubro", "sector", "monto", "accion"]

export default function PendientesTableContainer({children}:{children: React.ReactNode}) {

    const [state, setState] = useState<boolean>(true)
  
    return (
      <article className="flex w-full flex-col justify-center items-center">

        <div className="table-container relative">
  
          <table className="table">
            <thead>
              <tr className='text-base border-b border-foreground25'>
                {
                  desktopTableHeader.map(thDesktopName => <th key={thDesktopName}>{thDesktopName}</th>)
                }
              </tr>
            </thead>
            <tbody>
  
            </tbody>
          </table>
                {children}
        </div>
      </article>
    )
  }

