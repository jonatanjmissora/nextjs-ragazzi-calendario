"use client"

import { RealizadoType } from "@/app/_lib/schema/realizado.type";
import { SectoresType } from "@/app/_lib/schema/sectores.type";
import EditForm from "./EditForm";
import { useRealizadoActionState } from "@/app/_lib/hooks/useRealizadoActionState";

export default function RealizadoEditForm({ realizado, sectoresReset }: { realizado: RealizadoType, sectoresReset: SectoresType[] }) {

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
