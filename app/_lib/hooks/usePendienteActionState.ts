import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { PendienteType } from "../schema/pendientes.type";
import { editarNewPendienteAction, editarPendienteAction } from "../actions/pendientes.action";
import toast from "react-hot-toast";

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

    const serverAction = sameId(pendiente, newPendiente)
      ? await editarPendienteAction(newPendiente)
      : await editarNewPendienteAction(pendiente._id, newPendiente)

    if (!serverAction?.success) {
      toast.error("No fue posible actualizar")
      return { ...updateResponse, error: serverAction?.error }
    }
    else {

      toast.success("Pago actualizado")
      router.push("/pendientes")

      return { ...updateResponse, success: true }
    }

  },
    null
  );

  return [formState, formAction, isPending] as const
}