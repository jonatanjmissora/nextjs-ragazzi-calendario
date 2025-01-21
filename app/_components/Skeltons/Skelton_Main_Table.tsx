import React from 'react'
import Title from './Title'

export default function Skelton_Main_Table() {
  return (
    <div className="h-full table-container px-40 py-12 flex-1">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          {
            [0, 1, 2, 3, 4, 5].map(index => <th key={index}><Title /></th>)
          }
        </tr>
      </thead>
      <tbody>

        {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => 
            <tr key={index} className='border-b border-gray-400 animate-pulse'>
                <td><Title /></td>
                <td><Title /></td>
                <td><Title /></td>
                <td><Title /></td>
                <td><Title /></td>
                <td><Title /></td>
            </tr>)
        }

      </tbody>
    </table>
  </div>
    )
}
