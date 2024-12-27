import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { pendienteSchema, PendienteType } from "../schema/pendientes.type";
import { editarNewPendienteAction, editarPendienteAction } from "../actions/pendientes.action";

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

export const usePendienteActionState = (pendiente: PendienteType) => {
  const router = useRouter()

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

      router.push("/pendientes")

      return { ...updateResponse, success: true }
    }

  },
    null
  );

  return [formState, formAction, isPending] as const
}