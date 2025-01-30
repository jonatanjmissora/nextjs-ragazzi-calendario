import HistogramSVG from "@/app/_assets/HistogramSVG"
import PlusSVG from "@/app/_assets/PlusSVG"
import { PagoType } from "@/app/_lib/schema/pago.type"
import montoFormat from "@/app/_lib/utils/montoFormat"

export const RealizadoMovilHisto = ({ allRealizados, realizado, actualRealizado, setActualRealizado }: { allRealizados: PagoType[], realizado: PagoType, actualRealizado: PagoType, setActualRealizado: React.Dispatch<React.SetStateAction<PagoType>> }) => {

  const histogramArray = allRealizados
    .filter(pago => pago.rubro === actualRealizado.rubro && pago.sector === actualRealizado.sector)
    .slice(0, 3)
  const maximoMonto = Math.max(...histogramArray.map(pago => Number(pago.monto)))

  const getMontoHeight = (monto: string) => {
    return (Number(monto) / maximoMonto * 10)
  }

  const handleClick = (realizado: PagoType) => {
    const dialog = document?.getElementById('my_modal_3') as HTMLDialogElement
    dialog?.showModal()
    setActualRealizado(realizado)
    console.log({ realizado })
  }

  return (
    <>
      <button className="" onClick={() => handleClick(realizado)}>
        <HistogramSVG className="size-5 text-foreground" currentColor="currentColor" />
      </button>
      <dialog id="my_modal_3" className="w-full h-full bg-transparent relative">

        <div className="histo-modal-container card px-4 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <PlusSVG className="size-7 rotate-45 text-foreground80" currentColor="currentColor" />
            </button>
          </form>

          <div className="flex-1 flex flex-col justify-evenly items-center">
            <h3 className="font-semibold text-lg text-center text-foreground">{actualRealizado.rubro} - {actualRealizado.sector}</h3>
            <div className="w-full flex flex-row-reverse justify-center items-end">
              {
                histogramArray.map(pago =>
                  <Bar key={pago.vencimiento} rubro={actualRealizado.rubro} fecha={pago.vencimiento} monto={montoFormat(Number(pago.monto))} heightPercentage={getMontoHeight(pago.monto)} />)
              }
            </div>

          </div>

        </div>
      </dialog>
    </>
  )
}

const Bar = ({ rubro, fecha, monto, heightPercentage }: { rubro: string, fecha: string, monto: string, heightPercentage: number }) => {

  const isLower = (!heightPercentage || heightPercentage < 3) ? true : false
  return (
    <div className="w-full text-center my-2 mx-1">
      <div
        style={{ height: `${heightPercentage}rem` }}
        className={`relative w-full text-xs ${rubro} rounded-t-lg border border-black pt-1 flex justify-center shadow `}>
        <span className={`absolute ${isLower ? "-top-5 text-foreground" : "top-2"}`}>$ {monto}</span>
      </div>
      <p className="w-full text-xs text-center text-foreground mt-1">{fecha.substring(0, 7)}</p>
    </div>
  )
}