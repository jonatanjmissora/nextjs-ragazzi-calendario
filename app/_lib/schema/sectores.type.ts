import { z } from "zod"

const text = new RegExp(
    /^[a-zA-Z]*$/
)

export const sectoresSchema = z.object({

    _id: z.enum(["ragazzi", "patricios", "palihue", "jmolina"], { message: "El id no es valido" }),

    sectores: z
        .string()
        .regex(text, { message: "El sector no es valido" })
        .array(),

})

export type SectoresType = z.infer<typeof sectoresSchema>