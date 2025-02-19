"use client"

import { PagoType } from "@/app/_lib/schema/pago.type"
import { SectoresType } from "@/app/_lib/schema/sectores.type"
import { ServerResponseType } from "@/app/_lib/schema/serverResponse.type"
import montoFormat from "@/app/_lib/utils/montoFormat"
import Link from "next/link"
import { useState } from "react"
import SubmitBtn from "../SubmitBtn"

type PType = "pendiente" | "realizado"

type FormActionType = (payload: FormData) => void

const isSame = (pagoType: string, oldPendiente: PagoType, newPendiente: PagoType) => {

  if (pagoType === "realizado" && oldPendiente?.pagado !== newPendiente?.pagado) {
    return false
  }

  return (newPendiente.rubro === oldPendiente.rubro &&
    newPendiente.sector === oldPendiente.sector &&
    newPendiente.monto === oldPendiente.monto &&
    newPendiente.vencimiento === oldPendiente.vencimiento
  )
}

export default function EditForm({ pagoType, pago, sectoresReset, formState, formAction, isPending }: { pagoType: PType, pago: PagoType, sectoresReset: SectoresType[], formState: ServerResponseType, formAction: FormActionType, isPending: boolean }) {

  const { vencimiento, rubro, sector, monto } = pago
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [inputValues, setInputValues] = useState<PagoType>({ _id: "", vencimiento: "", rubro: "ragazzi", sector: "", monto: "", pagado: "" })
  const [currentRubro, setCurrentRubro] = useState<string>(pago.rubro)
  const sectores = sectoresReset.find(r => r._id === currentRubro)?.sectores

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPago = Object.fromEntries(formData.entries()) as PagoType
    newPago._id = newPago.vencimiento + "-" + newPago.rubro + "-" + newPago.sector

    if (isSame(pagoType, pago, newPago)) return
    setShowConfirm(true)
    setInputValues(newPago)
  }

  return (
    <div className="h-full w-full flex justify-center items-center">

      {
        showConfirm

          ?
          <form action={formAction} className="flex flex-col gap-2 edit-form-container card">
            <h2 className="my-4 tracking-wider font-bold text-xl">¿ Confirmar cambio ?</h2>

            <input type="hidden" name="_id" defaultValue={inputValues._id} />
            <input type="hidden" name="vencimiento" defaultValue={inputValues.vencimiento} />
            <input type="hidden" name="rubro" defaultValue={inputValues.rubro} />
            <input type="hidden" name="sector" defaultValue={inputValues.sector} />
            <input type="hidden" name="monto" defaultValue={inputValues.monto} />
            {pagoType === "realizado" && <input type="hidden" name="pagado" defaultValue={inputValues?.pagado ?? ""} />}

            <Table pagoType={pagoType} oldValues={pago} newValues={inputValues} />

            <div className="flex gap-1 mt-10 w-full">
              <SubmitBtn text="Confirma" isPending={isPending} className="size-11 p-0 w-1/2" classNameSVG="p-0" />
              <button type="button" className="btn-main-error w-1/2" onClick={() => setShowConfirm(false)}>Cancelar</button>
            </div>

          </form>

          :
          <form onSubmit={onSubmit} className="edit-form-container flex flex-col gap-4 min-w-80 card">
            <h2 className="text-xl tracking-wider font-bold">Editar pago {pagoType}:</h2>

            <div className="flex flex-col gap-1">
              <label className="text-xs" htmlFor="vencimiento">vencimiento</label>
              <input className="input-main" type="date" name="vencimiento" id="vencimiento" defaultValue={vencimiento} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs" htmlFor="rubro">rubro</label>
              <select
                className="input-main h-11"
                name="rubro" id="rubro" defaultValue={rubro}
                onChange={(e) => setCurrentRubro(e.currentTarget.value)}>
                <option value="ragazzi">ragazzi</option>
                <option value="patricios">patricios</option>
                <option value="palihue">palihue</option>
                <option value="jmolina">jmolina</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs" htmlFor="sector">sector</label>
              <select className="input-main h-11" name="sector" id="sector" defaultValue={sector} >
                {
                  sectores?.map(sector => <option key={sector} value={sector}>{sector}</option>)
                }
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs" htmlFor="monto">monto</label>
              <input className="input-main" type="number" name="monto" id="monto" defaultValue={monto} />
            </div>

            {
              pago.pagado !== "" &&
              <div className="flex flex-col gap-1">
                <label className="text-xs" htmlFor="pagado">pagado</label>
                <input className="input-main" type="date" name="pagado" id="pagado" defaultValue={pago.pagado} />
              </div>
            }

            {formState?.message ? <span className="text-red-900 italic">{formState.message}</span> : <span className="text-transparent"></span>}

            <div className="w-full flex gap-1">
              <SubmitBtn text="Editar" isPending={isPending} className="size-11 w-1/2" />
              <Link href={pagoType === "pendiente" ? "/pendientes" : "/admin"} className="btn-main-error w-1/2" type="button">Cancelar</Link>
            </div>

          </form>
      }
    </div>
  )
}

const Table = ({ pagoType, oldValues, newValues }: { pagoType: string, oldValues: PagoType, newValues: PagoType }) => {
  return (
    <table>
      <tbody>
        <EditRow label={"venc"} oldValue={oldValues.vencimiento} newValue={newValues.vencimiento} />
        <EditRow label={"rubro"} oldValue={oldValues.rubro} newValue={newValues.rubro} />
        <EditRow label={"sector"} oldValue={oldValues.sector} newValue={newValues.sector} />
        <EditRow label={"monto"} oldValue={montoFormat(Number(oldValues.monto))} newValue={montoFormat(Number(newValues.monto))} />
        {
          pagoType === "realizado" &&
          <EditRow label={"pagado"} oldValue={oldValues.pagado ?? ""} newValue={newValues?.pagado ?? ""} />
        }
      </tbody>
    </table>
  )
}

const EditRow = ({ label, oldValue, newValue }: { label: string, oldValue: string, newValue: string }) => {

  const isTheSame = oldValue === newValue

  return (
    <tr className="border-white25 border-b border-t">
      <td className="py-2">{label} : </td>
      <td>{oldValue}</td>
      {!isTheSame && <td>▶</td>}
      {!isTheSame && <td>{newValue}</td>}
    </tr>
  )
}