import { z } from "zod"

const text = new RegExp(
  /^[0-9a-z-\w\s]*$/
)
const number = new RegExp(
  /^[0-9.,]*$/
)
//yyyy-mm-dd
const date = new RegExp(
  /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
)

export const pendienteSchema = z.object({

  _id: z
    .string()
    .trim()
    .min(1, { message: "El contenido debe tener mas de 1 caracter" })
    .regex(text, { message: "El contenido no es valido" }),

  rubro: z
    .enum(["ragazzi", "patricios", "palihue", "jmolina"], { message: "El rubro no es valido" }),

  sector: z
    .string()
    .trim()
    .min(1, { message: "El contenido debe tener mas de 1 caracter" })
    .regex(text, { message: "El contenido no es valido" }),

  monto: z
    .string()
    .trim()
    .min(1, { message: "El monto debe tener mas de 1 caracter" })
    .regex(number, { message: "El monto no es valido" }),

  vencimiento: z
    .string()
    .trim()
    .min(1, { message: "El monto debe tener mas de 1 caracter" })
    .regex(date, { message: "El vencimiento no es valido" }),

})

export type PendienteType = z.infer<typeof pendienteSchema>

export type NewPendienteType = Omit<PendienteType, "_id">

export type RubroType = "ragazzi" | "patricios" | "palihue" | "jmolina"