import { z } from "zod"

const text = new RegExp(
  /^[A-Za-z0-9 -]+$/
)
const number = new RegExp(
  /^[0-9.,]+$/
)
//yyyy-mm-dd
const date = new RegExp(
  /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
)

const RUBROS = ["ragazzi", "patricios", "palihue", "jmolina"] as const

export const pagoSchema = z.object({

  _id: z
    .string()
    .trim()
    .min(1, { message: "El id debe tener mas de 1 caracter" })
    .regex(text, { message: "El id no es valido" }),

  rubro: z
    .enum(RUBROS, { message: "El rubro no es valido" }),

  sector: z
    .string()
    .trim()
    .min(1, { message: "El sector debe tener mas de 1 caracter" })
    .regex(text, { message: "El sector no es valido" }),

  monto: z
    .string()
    .trim()
    .min(1, { message: "El monto debe tener mas de 1 caracter" })
    .regex(number, { message: "El monto no es valido" }),

  vencimiento: z
    .string()
    .trim()
    .min(1, { message: "El vencimiento debe tener mas de 1 caracter" })
    .regex(date, { message: "El vencimiento no es valido" }),

  pagado: z
    .string()
    .trim()
    .min(1, { message: "El pagado debe tener mas de 1 caracter" })
    .regex(date, { message: "El pagado no es valido" })
    .optional(),

})

export type PagoType = z.infer<typeof pagoSchema>

export type RubroType = typeof RUBROS