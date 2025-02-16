import React from 'react'
import DollarSVG from '@/app/_assets/DollarSVG'
import EditSVG from '@/app/_assets/EditSVG'
import TrashSVG from '@/app/_assets/TrashSVG'
import HistogramSVG from '@/app/_assets/HistogramSVG'
import SkeltonInput from '../Skelton_Input'

const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]
const ROWS = [1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4]

export default function SkeltonAdminDesktopMainTable({desktopTableHeader}: {desktopTableHeader: string[]}) {
  return (
    <>
    
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