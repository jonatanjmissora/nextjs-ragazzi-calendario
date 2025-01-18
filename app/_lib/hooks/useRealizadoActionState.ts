import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { editarNewRealizadoAction, editarRealizadoAction } from "../actions/realizados.action";
import { PagoType } from "../schema/pago.type";
import { ServerResponseType } from "../schema/serverResponse.type";

const sameId = (prevData: PagoType, newRealizado: PagoType) => {

  return (newRealizado.rubro === prevData.rubro &&
    newRealizado.sector === prevData.sector &&
    newRealizado.vencimiento === prevData.vencimiento
  )
}

export const useRealizadoActionState = (realizado: PagoType) => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async (prevState: ServerResponseType, formData: FormData) => {

    const newRealizado = Object.fromEntries(formData.entries()) as PagoType
    newRealizado._id = newRealizado.vencimiento + "-" + newRealizado.rubro + "-" + newRealizado.sector

    const serverAction = sameId(realizado, newRealizado)
      ? await editarRealizadoAction(newRealizado)
      : await editarNewRealizadoAction(realizado, newRealizado)

    if (!serverAction?.success) {
      toast.error(serverAction.message)
      return serverAction
    }
    else {
      toast.success(serverAction.message)
      router.push("/admin")

      return serverAction
    }

  },
    null
  );

  return [formState, formAction, isPending] as const
}