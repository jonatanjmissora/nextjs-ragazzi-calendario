import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { editarNewPendienteAction, editarPendienteAction } from "../actions/pendientes.action";
import toast from "react-hot-toast";
import { PagoType } from "../schema/pago.type";
import { ServerResponseType } from "../schema/serverResponse.type";

const sameId = (prevData: PagoType, newPendiente: PagoType) => {

  return (newPendiente.rubro === prevData.rubro &&
    newPendiente.sector === prevData.sector &&
    newPendiente.vencimiento === prevData.vencimiento
  )
}

export const usePendienteActionState = (pendiente: PagoType) => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async (prevState: ServerResponseType, formData: FormData) => {

    const newPendiente = Object.fromEntries(formData.entries()) as PagoType
    newPendiente._id = newPendiente.vencimiento + "-" + newPendiente.rubro + "-" + newPendiente.sector
    console.log({newPendiente})

    const serverAction = sameId(pendiente, newPendiente)
      ? await editarPendienteAction(newPendiente)
      : await editarNewPendienteAction(pendiente, newPendiente)

    if (!serverAction?.success) {
      toast.error(serverAction.message)
      return serverAction
    }
    else {

      toast.success(serverAction.message)
      router.push("/pendientes")

      return serverAction
    }

  },
    null
  );

  return [formState, formAction, isPending] as const
}