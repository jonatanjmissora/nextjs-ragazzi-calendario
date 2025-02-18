import React from 'react'
import SkeltonInput from '../Skelton_Input'

const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]
const ROWS = [1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4]

export default function SkeltonAdminDesktopMainTable({ desktopTableHeader }: { desktopTableHeader: string[] }) {
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
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput /></td>
                  <td><SkeltonInput className='w-32' /></td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </>
  )
}