"use client"

import { SectoresType } from "@/app/_lib/schema/sectores.type";
import Link from "next/link";
import { usePendienteActionState } from "@/app/_lib/hooks/usePendienteActionState";
import { useState } from "react";
import { PendienteType } from "@/app/_lib/schema/pendientes.type";
import RightArrowSVG from "@/app/_assets/RightArrowSVG";

const noNewData = (prevData: PendienteType, newPendiente: PendienteType) => {

    return (newPendiente.rubro === prevData.rubro &&
        newPendiente.sector === prevData.sector &&
        newPendiente.monto === prevData.monto &&
        newPendiente.vencimiento === prevData.vencimiento
    )
}

export default function PendienteEditForm({ pendiente, sectoresReset }: { pendiente: PendienteType, sectoresReset: SectoresType[] }) {

    const { vencimiento, rubro, sector, monto } = pendiente
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [inputValues, setInputValues] = useState({ vencimiento: "", rubro: "", sector: "", monto: "" })
    const [currentRubro, setCurrentRubro] = useState<string>(pendiente.rubro)
    const sectores = sectoresReset.find(r => r._id === currentRubro)?.sectores

    const [formState, formAction, isPending] = usePendienteActionState(pendiente)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newPago = Object.fromEntries(formData.entries()) as PendienteType

        if (noNewData(pendiente, newPago)) return
        setShowConfirm(true)
        setInputValues(newPago)
    }

    return (
        <div className="container h-full flex justify-center items-center">

            {
                showConfirm

                    ?
                    <form action={formAction} className=" flex flex-col gap-2">
                        <h2 className="my-4 text-2xl tracking-wider font-bold">¿ Confirmar cambio ?</h2>

                        <EditRow label={"vencimiento"} oldValue={pendiente.vencimiento} newValue={inputValues.vencimiento} />
                        <EditRow label={"rubro"} oldValue={pendiente.rubro} newValue={inputValues.rubro} />
                        <EditRow label={"sector"} oldValue={pendiente.sector} newValue={inputValues.sector} />
                        <EditRow label={"monto"} oldValue={pendiente.monto} newValue={inputValues.monto} />

                        <div className="flex gap-1 mt-20">
                            <button type="button" className="btn btn-outline flex-1" onClick={() => setShowConfirm(false)}>Cancelar</button>
                            <button className="btn btn-primary flex-1" type="submit">
                                {
                                    isPending
                                        ? <span className="loading loading-spinner"></span>
                                        : "Confirma"
                                }
                            </button>
                        </div>

                    </form>

                    :
                    <form onSubmit={onSubmit} className="w-max flex flex-col gap-4 min-w-80">
                        <h2 className="text-2xl tracking-wider font-bold">Editar pago pendiente</h2>
                        <input className="input" type="date" name="vencimiento" id="vencimiento" defaultValue={vencimiento} />

                        <select
                            className="flex-1 select"
                            name="rubro" id="rubro" defaultValue={rubro}
                            onChange={(e) => setCurrentRubro(e.currentTarget.value)}>
                            <option className="option" value="ragazzi">ragazzi</option>
                            <option value="patricios">patricios</option>
                            <option value="palihue">palihue</option>
                            <option value="jmolina">jmolina</option>
                        </select>

                        <select className="select" name="sector" id="sector" defaultValue={sector} >
                            {
                                sectores?.map(sector => <option key={sector} value={sector}>{sector}</option>)
                            }
                        </select>

                        <input className="input" type="number" name="monto" id="monto" defaultValue={monto} />

                        {formState?.error ? <span className="text-red-700 italic">{formState.error}</span> : <span className="text-transparent">g</span>}

                        <div className="w-full flex gap-1">
                            <button className="btn btn-primary flex-1" type="submit" >Editar</button>
                            <Link href={"/"} className="btn btn-outline flex-1" type="button">Cancelar</Link>
                        </div>

                    </form>
            }
        </div>
    )
}


const EditRow = ({ label, oldValue, newValue }: { label: string, oldValue: string, newValue: string }) => {

    const isTheSame = oldValue === newValue

    return (
        <div className="grid grid-cols-[6rem_10rem_1.5rem_10rem] justify-center items-center">
            <span className="">{label} : </span>
            <input className=" text-center bg-transparent focus:outline-none" type="text" name={label} defaultValue={oldValue} readOnly />
            {!isTheSame && <RightArrowSVG className="size-5 " currentColor={"white"} />}
            {!isTheSame && <input className=" text-center bg-transparent focus:outline-none" name={label} type="text" defaultValue={newValue} readOnly />}
        </div>
    )
}