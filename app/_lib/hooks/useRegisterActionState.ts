import { useActionState } from "react";
import { UserType } from "../schema/user.type";
import { register } from "../actions/user.action";
import { useRouter } from "next/navigation";

type RegisterRespType = {
  success: boolean;
  message: string;
} | null

export const useRegisterActionState = () => {

  const router = useRouter()
  const [formState, formAction, isPending] = useActionState(async (prevState: RegisterRespType, formData: FormData) => {

    let { username, userpassword } = Object.fromEntries(formData.entries()) as { username: string, userpassword: string }
    username = username.toLowerCase()
    userpassword = userpassword.toLowerCase()
    const user = { username, userpassword } as UserType

    const serverResponse = await register(user)
    if (serverResponse.success) {
      router.push("/pendientes")
    }
    return serverResponse

  },
    null
  );

  return [formState, formAction, isPending] as const
}
