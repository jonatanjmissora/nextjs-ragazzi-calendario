import { z } from "zod"

const text = new RegExp(
  /[^A-Za-z0-9-]/
)

const path = new RegExp(
  /[^A-Za-z0-9-.:_/]/
)

const imgDataReg = new RegExp(
  /[^A-Za-z0-9-/+=]/
)

export const weblinkSchema = z.object({

  _id: z
    .string()
    .trim()
    .min(1, { message: "Complete el nombre" })
    .max(20, { message: "20 caracteres máximo" })
    .regex(text, { message: "Caracteres no permitidos" }),

  href: z
    .string()
    .trim()
    .min(1, { message: "Complete la contraseña" })
    .regex(path, { message: "Caracteres no permitidos" }),

  imgData: z
    .string()
    .trim()
    .min(1, { message: "Complete la contraseña" })
    .regex(imgDataReg, { message: "Caracteres no permitidos" }),
})

export type WeblinkType = z.infer<typeof weblinkSchema>