
const filters = ["todos", "ragazzi", "patricios", "palihue", "jmolina"]
const ROWS = [1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4, 1, 1, 2, 4, 2, 3, 3, 4]

export default function Skelton() {
  return (
    <table className="table">
        
          <tbody>
          
            {
              ROWS.map((row, index) =>

                <tr key={index} className={`${filters[row]} hover:brightness-75 border-b border-foreground25 w-[1100px]`}>
                  <td className='w-[125px]'>
                    <input
                      type="checkbox"
                      className={"mx-3 opacity-100"}
                    />
                  </td>
                  <td ><span className="size-4 loading loading-bars"></span></td>
                  <td ><span className="size-4 loading loading-bars"></span></td>
                  <td ><span className="size-4 loading loading-bars"></span></td>
                  <td ><span className="size-4 loading loading-bars"></span></td>
                  <td className="p-0 m-0"> hola</td>
                </tr>
              )
            }

          </tbody>
        </table>
  )
}
