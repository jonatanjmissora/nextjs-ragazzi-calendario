import React from 'react'
import SkeltonInput from '../Skelton_Input'

const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]
const ROWS = [1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4]

export default function SkeltonDesktopMainTable({desktopTableHeader}: {desktopTableHeader: string[]}) {
  return (
    <>
      <div className="m-auto flex flex-wrap justify-end items-center relative pago-header">
        <div className='rubro-filter flex justify-center items-center pb-3'>
            <ul className="flex justify-center items-center gap-1 flex-wrap">
              {
                filters.map(filter =>
                  <li
                  key={filter}
                    className={`text-sm badge-main ${filter === "todos" && filter}`}
                  >
                    {filter}
                  </li>
                )
              }

            </ul>
        </div>
      </div>

      <div className="table-container">
        <table className="table table-pendiente">
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
                  <td><SkeltonInput className='w-8'/></td>
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput className='w-32'/></td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </>
  )
}
