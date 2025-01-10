import { useActionState } from "react";
import { UserType } from "../schema/user.type";
import { login } from "../actions/user.action";

type LoginRespType = {
  success: boolean;
  message: string;
} | null

export const useLoginActionState = () => {

  const [formState, formAction, isPending] = useActionState(async (prevState: LoginRespType, formData: FormData) => {

    const { username, userpassword } = Object.fromEntries(formData.entries()) as { username: string, userpassword: string }
    const user = { username, userpassword } as UserType

    return await login(user)
  },
    null
  );

  return [formState, formAction, isPending] as const
}
