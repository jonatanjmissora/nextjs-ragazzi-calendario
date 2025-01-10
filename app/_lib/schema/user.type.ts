import { ObjectId } from "mongodb"
import { z } from "zod"

const nameValidation = new RegExp(
  /^[a-zA-Z0-9]*$/
)

const passwordValidation = new RegExp(
  /^[a-zA-Z0-9#&*-_]*$/
)

export const userSchema = z.object({

  username: z
    .string()
    .trim()
    .min(1, { message: "Complete el nombre" })
    .max(11, { message: "11 caracteres máximo" })
    .regex(nameValidation, { message: "Caracteres no permitidos" }),

  userpassword: z
    .string()
    .trim()
    .min(1, { message: "Complete la contraseña" })
    .max(15, { message: "15 caracteres máximo" })
    .regex(passwordValidation, { message: "Caracteres no permitidos" })
})

export type UserType = z.infer<typeof userSchema>

export type UserWithIdType = UserType & { _id: ObjectId }