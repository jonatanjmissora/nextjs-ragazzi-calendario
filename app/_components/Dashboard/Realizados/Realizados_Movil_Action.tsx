import DotsSVG from "@/app/_assets/DotsSVG copy"
import PlusSVG from "@/app/_assets/PlusSVG"
import { PagoType } from "@/app/_lib/schema/pago.type"
import montoFormat from "@/app/_lib/utils/montoFormat"
import { shortVenc } from "@/app/_lib/utils/shortVenc"
import { useRef } from "react"
import { RealizadoDeleteModal } from "./Realizado_Delete_Modal"
import Link from "next/link"
import EditSVG from "@/app/_assets/EditSVG"
import { RealizadoHisto } from "./Realizado_Desktop_Histo"

export default function RealizadosMovilAction({ allRealizados, realizado, actualRealizado, setActualRealizado }: { allRealizados: PagoType[], realizado: PagoType, actualRealizado: PagoType, setActualRealizado: React.Dispatch<React.SetStateAction<PagoType>> }) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <DotsSVG className="size-5 text-foreground" currentColor="currentColor" />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card p-4 text-[#222] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">

          <div className="flex flex-col gap-4">

            <div className="w-full">
              <button className="block ml-auto" onClick={() => dialogRef.current?.close()}>
                <PlusSVG className=" size-7 rotate-45 text-[#222] hover:text-black85" currentColor="currentColor" />
              </button>
            </div>

            <Table realizado={realizado} />

            <div className="w-full flex justify-end">
              <span>pagado: {realizado.pagado}</span>
            </div>

            <RealizadoMovilAction
              allRealizados={allRealizados}
              realizado={realizado}
              actualRealizado={actualRealizado}
              setActualRealizado={setActualRealizado}
            />

          </div>

        </div>
      </dialog>
    </>
  )
}


const Table = ({ realizado }: { realizado: PagoType }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>venc</td>
          <td>rubro</td>
          <td>sector</td>
          <td>monto</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{shortVenc(realizado.vencimiento)}</td>
          <td>{realizado.rubro}</td>
          <td>{realizado.sector}</td>
          <td>$ {montoFormat(Number(realizado.monto))}</td>
        </tr>
      </tbody>
    </table>
  )
}

function RealizadoMovilAction({ allRealizados, realizado, actualRealizado, setActualRealizado }: { allRealizados: PagoType[], realizado: PagoType, actualRealizado: PagoType, setActualRealizado: React.Dispatch<React.SetStateAction<PagoType>> }) {

  return (
    <div className='flex justify-around items-center gap-1 px-5'>

      <RealizadoHisto
        allRealizados={allRealizados}
        realizado={realizado}
        actualRealizado={actualRealizado}
        setActualRealizado={setActualRealizado}
      />

      <RealizadoDeleteModal realizado={realizado} />

      <Link href={{
        pathname: '/realizados/edit',
        query: { id: realizado._id },
      }}
      >
        <EditSVG className='size-9 p-[0.4rem] text-black hover:text-[#222]' currentColor='currentColor' />
      </Link>

    </div>
  )
}