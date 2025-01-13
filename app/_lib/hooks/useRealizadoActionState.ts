import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { RealizadoType } from "../schema/realizado.type";

const sameId = (prevData: RealizadoType, newRealizado: RealizadoType) => {

  return (newRealizado.rubro === prevData.rubro &&
    newRealizado.sector === prevData.sector &&
    newRealizado.vencimiento === prevData.vencimiento
  )
}

type UpdateResponseType = {
  success: boolean;
  prevState: RealizadoType;
  error: string;
} | null

export const useRealizadoActionState = (realizado: RealizadoType) => {
  const router = useRouter()

  const [formState, formAction, isPending] = useActionState(async (prevState: UpdateResponseType, formData: FormData) => {

    const newRealizado = Object.fromEntries(formData.entries()) as RealizadoType
    newRealizado._id = newRealizado.vencimiento + "-" + newRealizado.rubro + "-" + newRealizado.sector
    const updateResponse = {
      success: false,
      prevState: newRealizado,
      error: ""
    }

    const serverAction = sameId(realizado, newRealizado)
      ? await editarRealizadoAction(newRealizado)
      : await editarNewRealizadoAction(realizado._id, newRealizado)

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