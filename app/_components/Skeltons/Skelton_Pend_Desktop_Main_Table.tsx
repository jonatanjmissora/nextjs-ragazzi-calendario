import React from 'react'
import DollarSVG from '@/app/_assets/DollarSVG'
import EditSVG from '@/app/_assets/EditSVG'
import TrashSVG from '@/app/_assets/TrashSVG'

const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]
const desktopTableHeader = ["", "venc", "rubro", "sector", "monto", "accion"]
const ROWS = [1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4]

export default function SkeltonPendDesktopMainTable() {
  return (
    <>
      <div className="m-auto flex flex-wrap justify-end items-center relative pago-header">
        <div className='rubro-filter flex justify-center items-center pb-3'>
            <ul className="flex justify-center items-center gap-2 flex-wrap">
              {
                filters.map(filter =>
                  <li
                  key={filter}
                    className={`badge-main ${filter === "todos" && filter}`}
                  >
                    {filter}
                  </li>
                )
              }

            </ul>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
        <thead>
            <tr className='text-base border-b border-foreground25'>
              {
                desktopTableHeader.map(thDesktopName => <th key={thDesktopName}>{thDesktopName}</th>)
              }
            </tr>
          </thead>
          <tbody>
          
            {
              ROWS.map((row, index) =>

                <tr key={index} className={`${filters[row]} hover:brightness-75 border-b border-foreground25 w-[1100px]`}>
                  <td className='w-[125px]'>
                    <input
                      type="checkbox"
                      className={"mx-3 opacity-20"}
                    />
                  </td>
                  <td className='w-[125]'><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td className='w-[165px]'><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td className='w-[180px]'><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td className='w-[180px]'><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td className="p-0 m-0 w-[290px]"> <PendienteDesktopAction /></td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </>
  )
}

const PendienteDesktopAction = () => {
  return (
    <div className='flex justify-around items-center gap-1 px-5'>
      <DollarSVG className='size-9 p-[0.4rem] text-[#005300] hover:text-[#35da35e7]' currentColor='currentColor' />

      <TrashSVG className='size-9 p-[0.4rem] text-[#880000aa] hover:text-[#f35252]' currentColor='currentColor' />

      <EditSVG className='size-9 p-[0.4rem] text-black hover:text-[#222]' currentColor='currentColor' />
    </div>
  )
}
