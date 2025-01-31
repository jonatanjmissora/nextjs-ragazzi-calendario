"use client"

import { SectoresType } from "@/app/_lib/schema/sectores.type";
import EditForm from "../EditForm";
import { useRealizadoActionState } from "@/app/_lib/hooks/useRealizadoActionState";
import { PagoType } from "@/app/_lib/schema/pago.type";

export default function RealizadoEditForm({ realizado, sectoresReset }: { realizado: PagoType, sectoresReset: SectoresType[] }) {

  const [formState, formAction, isPending] = useRealizadoActionState(realizado)

  return (
    <EditForm
      pagoType={"realizado"}
      pago={realizado}
      sectoresReset={sectoresReset}
      formState={formState}
      formAction={formAction}
      isPending={isPending}
    />
  )
}
