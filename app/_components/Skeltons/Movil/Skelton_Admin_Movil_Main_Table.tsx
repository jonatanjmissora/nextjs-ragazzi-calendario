import SkeltonInput from "../Skelton_Input"

const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]
const tableHeader = ["venc", "rubro", "sector", "monto", "pag", "acc"]
const ROWS = [1, 1, 2, 4, 2, 3, 3]

export default function SkeltonAdminMovilMainTable() {
  return (
    <article className="w-full flex flex-col justify-center items-center">

      <div className="table-container relative overflow-hidden">
        <table className="table table-admin">
          <thead>
            <tr className='font-bold tracking-wider border-b border-foreground25'>
              {
                tableHeader.map(thName => <th className="px-1 text-base" key={thName}>{thName}</th>)
              }
            </tr>
          </thead>
          <tbody>

            {
              ROWS.map((row, index) =>

                <tr key={index} className={`${filters[row]} hover:brightness-75 border-b border-foreground25`}>
                  <td><SkeltonInput className='w-12' /></td>
                  <td><SkeltonInput className='w-12' /></td>
                  <td><SkeltonInput className='w-12' /></td>
                  <td><SkeltonInput className='w-12' /></td>
                  <td><SkeltonInput className='w-12' /></td>
                  <td><SkeltonInput className='w-4' /></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </article>
  )
}
