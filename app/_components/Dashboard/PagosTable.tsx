export const PagosTable = ({ tableHeader, children }: { tableHeader: string[], children: React.ReactNode }) => {

  return (
    <div className="h-full overflow-y-scroll flex-1 px-40 py-12">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {
              tableHeader.map(thName => <th key={thName}>{thName}</th>)
            }
          </tr>
        </thead>
        <tbody>

          {children}

        </tbody>
      </table>
    </div>
  )
}