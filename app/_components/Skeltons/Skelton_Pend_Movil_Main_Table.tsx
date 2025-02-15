import React from 'react'
import Title from './Title'

export default function SkeltonPendMovilMainTable() {
  return (
    <div className="table-container relative px-8">
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
