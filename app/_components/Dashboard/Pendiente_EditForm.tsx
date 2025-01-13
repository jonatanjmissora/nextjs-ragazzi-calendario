"use client"

import { SectoresType } from "@/app/_lib/schema/sectores.type";
import { usePendienteActionState } from "@/app/_lib/hooks/usePendienteActionState";
import { PendienteType } from "@/app/_lib/schema/pendientes.type";
import EditForm from "./EditForm";

export default function PendienteEditForm({ pendiente, sectoresReset }: { pendiente: PendienteType, sectoresReset: SectoresType[] }) {

    const [formState, formAction, isPending] = usePendienteActionState(pendiente)

    return (
        <EditForm
            pago={pendiente}
            sectoresReset={sectoresReset}
            formState={formState}
            formAction={formAction}
            isPending={isPending}
        />
    )
}


