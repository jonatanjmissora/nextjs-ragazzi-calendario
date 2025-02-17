import React from 'react'
import Title from '../Title'
import SkeltonInput from '../Skelton_Input'

const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]
const ROWS = [1, 1, 2, 4, 2, 3, 3]

export default function SkeltonMovilMainTable({movilTableHeader}: {movilTableHeader: string[]}) {
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
  
        <div className="table-container relative overflow-hidden">
          <table className="table table-realizado">
          <thead>
              <tr className='font-bold tracking-wider border-b border-foreground25'>
                {
                  movilTableHeader.map((thMovilName, index) => <th className='px-1 text-base' key={index}>{thMovilName}</th>)
                }
              </tr>
            </thead>
            <tbody>
            
              {
                ROWS.map((row, index) =>
  
                  <tr key={index} className={`${filters[row]} hover:brightness-75 border-b border-foreground25`}>
                    <td><SkeltonInput className='w-12'/></td>
                    <td><SkeltonInput className='w-12'/></td>
                    <td><SkeltonInput className='w-12'/></td>
                    <td><SkeltonInput className='w-12'/></td>
                    <td><SkeltonInput className='w-12'/></td>
                    <td><SkeltonInput className='w-4'/></td>
                  </tr>
                )
              }
  
            </tbody>
          </table>
        </div>
      </>
    )
}
