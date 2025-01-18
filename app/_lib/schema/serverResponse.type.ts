import { PagoType } from "./pago.type";

export type ServerResponseType = {
  success: boolean;
  prevState: PagoType | { _id: string, href: string };
  message: string;
} | null