import React from 'react'
import DollarSVG from '@/app/_assets/DollarSVG'
import EditSVG from '@/app/_assets/EditSVG'
import TrashSVG from '@/app/_assets/TrashSVG'
import HistogramSVG from '@/app/_assets/HistogramSVG'

const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]
const desktopTableHeader = ["vencimiento", "rubro", "sector", "monto", "pagado", "accion"]
const ROWS = [1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4]

export default function SkeltonAdminDesktopMainTable() {
  return (
    <>

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
                  <td ><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td ><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td ><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td ><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td ><span className="size-4 loading loading-bars text-primary"></span></td>
                  <td className="px-0 flex justify-around items-center gap-1">
                    <EditSVG className='size-6 text-black hover:text-black80' currentColor='currentColor' />
                    <TrashSVG className='size-6 text-[#88000075] hover:text-[#880000]' currentColor='currentColor' />
                  </td>
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