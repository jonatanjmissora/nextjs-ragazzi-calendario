"use client"

import { editarNewPendienteAction, editarPendienteAction } from "@/app/_lib/actions/pendientes.action";
import { pendienteSchema, PendienteType } from "@/app/_lib/schema/pendientes.type";
import { SectoresType } from "@/app/_lib/schema/sectores.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import ToastWithConfirm from "../ToastWithConfirm";

const noNewData = (prevData: PendienteType, newPendiente: PendienteType) => {

    return (newPendiente.rubro === prevData.rubro &&
        newPendiente.sector === prevData.sector &&
        newPendiente.monto === prevData.monto &&
        newPendiente.vencimiento === prevData.vencimiento
    )
}

const sameId = (prevData: PendienteType, newPendiente: PendienteType) => {

    return (newPendiente.rubro === prevData.rubro &&
        newPendiente.sector === prevData.sector &&
        newPendiente.vencimiento === prevData.vencimiento
    )
}

type UpdateResponseType = {
    success: boolean;
    prevState: PendienteType;
    error: string;
} | null

export default function PendienteEditForm({ pendiente, sectoresReset }: { pendiente: PendienteType, sectoresReset: SectoresType[] }) {

    const { vencimiento, rubro, sector, monto } = pendiente
    const router = useRouter()
    const [currentRubro, setCurrentRubro] = useState<string>(pendiente.rubro)
    const sectores = sectoresReset.find(r => r._id === currentRubro)?.sectores

    const [formState, formAction, isPending] = useActionState(async (prevState: UpdateResponseType, formData: FormData) => {

        const newPendiente = Object.fromEntries(formData.entries()) as PendienteType
        newPendiente._id = newPendiente.vencimiento + "-" + newPendiente.rubro + "-" + newPendiente.sector
        const updateResponse = {
            success: false,
            prevState: newPendiente,
            error: ""
        }

        if (noNewData(pendiente, newPendiente)) return updateResponse

        //validacion cliente
        const { success, error } = pendienteSchema.safeParse(newPendiente)

        if (!success) {
            const errors = error.flatten().fieldErrors
            updateResponse.error = errors.monto ? errors.monto[0] : ""
            return updateResponse
        }
        const serverAction = sameId(pendiente, newPendiente)
            ? await editarPendienteAction(newPendiente)
            : await editarNewPendienteAction(pendiente._id, newPendiente)

        if (!serverAction?.success)
            return { ...updateResponse, error: serverAction?.error }
        else {
            toast.success("Pago editado con exito")
            router.push("/pendientes")

            toast.custom((t: string) => (
                <div className="flex flex-col">
                    <ToastWithConfirm t={t} title={"pendiente anterior"} content={JSON.stringify(pendiente)} />
                    <ToastWithConfirm t={t} title={"pendiente nuevo"} content={JSON.stringify(newPendiente)} />
                </div>
            ))

            return { ...updateResponse, success: true }
        }

    }, null)

    const handleRubroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentRubro(e.currentTarget.value)
    }

    return (
        <div className="container h-full flex justify-center items-center">

            <form action={formAction} className="w-max flex flex-col gap-4 min-w-80">
                <Link className="btn btn-primary w-max" href={"/"}>Volver</Link>
                <input className="input" type="date" name="vencimiento" id="vencimiento" defaultValue={vencimiento} />

                <select
                    className="flex-1 select"
                    name="rubro" id="rubro" defaultValue={rubro}
                    onChange={handleRubroChange}>
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

                <button className="btn btn-primary w-max ml-auto" type="submit" disabled={isPending}>{isPending ? "..." : "Editar"}</button>


            </form>
        </div>
    )
}
