"use client"

import PlusSVG from "@/app/_assets/PlusSVG";
import TrashSVG from "@/app/_assets/TrashSVG";
import { SectoresType } from "@/app/_lib/schema/sectores.type";
import { useActionState, useRef } from "react";
import toast from "react-hot-toast";
import SubmitBtn from "../../SubmitBtn";
import { updateSectoresActualesAction, updateSectoresResetAction } from "@/app/_lib/actions/sectores.action";
import Link from "next/link";

type RespType = {
  success: boolean;
  message: string;
} | null

export default function AdminSectoresList({ sectoresType, sectoresList }: { sectoresType: string, sectoresList: SectoresType[] }) {

  const [, formAction, isPending] = useActionState(async (prevState: RespType, formData: FormData) => {

    const rubro = formData.get("rubro") as string
    const newSector = formData.get("newSector")?.toString().trim()
    if (!newSector) return null

    const sectoresActual = sectoresList.filter(r => r._id === rubro)[0].sectores

    if (sectoresActual.includes(newSector)) {
      toast.error("Ya se encuentra")
      return null
    }

    const newSectores = [...sectoresActual, newSector]

    const serverResp = sectoresType === "reset"
      ? await updateSectoresResetAction(rubro, newSectores)
      : await updateSectoresActualesAction(rubro, newSectores)
    if (!serverResp.success) {
      toast.error("No fue posible agregar sector")
    }
    toast.success(`${newSector} añadido con éxito`)
    return serverResp

  }, null)

  return (
    <article className="table-width flex flex-col gap-2 items-center flex-1 mt-10">

      <div className="w-1/2 flex gap-2 items-center jsutify-center">
        <Link
          className={`badge-main w-1/2 ${sectoresType === "actuales" && "bg-foreground25"}`}
          href={"/admin/sectores?type=actuales"}>Sectores Actuales
        </Link>

        <Link
          className={`badge-main w-1/2 ${sectoresType === "constantes" && "bg-foreground25"}`}
          href={"/admin/sectores?type=constantes"}>Sectores Constantes
        </Link>
      </div>

      {
        sectoresList.map((rubroActual, index) =>

          <div key={index} className="w-[90%] flex flex-col border-t border-foreground25 last:border-b px-5 pt-2">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-bold">{rubroActual._id}</span>
              <form action={formAction} className="flex gap-2">
                <input type="hidden" name="rubro" defaultValue={rubroActual._id} />
                <input type="text" className="input-main py-1 text-center" name="newSector" placeholder="nuevo..." required />
                <SubmitBtn isPending={isPending} className="h-9 w-9 flex justify-center items-center" classNameSVG="size-6">
                  <PlusSVG className="size-6 p-0 text-foreground hover:text-foreground80" currentColor="currentColor" />
                </SubmitBtn>
              </form>
            </div>

            <div className="flex flex-wrap my-4 sectores-gap">
              {
                rubroActual.sectores.map((sector, index) =>
                  <span key={index} className={`flex gap-2 badge-main ${rubroActual._id} text-sm w-max`}>
                    {sector}
                    <Modal
                      sectoresType={sectoresType}
                      rubro={rubroActual._id}
                      sector={sector}
                      sectores={rubroActual.sectores}
                    />
                  </span>
                )
              }
            </div>

          </div>
        )
      }
    </article>
  )
}

const Modal = ({ sectoresType, rubro, sector, sectores }: { sectoresType: string, rubro: string, sector: string, sectores: string[] }) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const [, formAction, isPending] = useActionState(async () => {

    const newSectores = sectores.filter(sc => sc !== sector)

    const res = sectoresType === "reset"
      ? await updateSectoresResetAction(rubro, newSectores)
      : await updateSectoresActualesAction(rubro, newSectores)
    if (!res?.success) {
      toast.error(res.message)
    }
    else toast.success(res.message)
    dialogRef.current?.close()

  }, null)

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className="size-4 text-foreground hover:text-foreground80" currentColor="currentColor" />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="modal-container card fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="flex gap-2 flex-wrap">
            <span className="font-bold text-xl text-center tracking-widest">¿ Seguro desea elimiar</span>
            <span className="font-bold text-xl text-center tracking-widest">{sector} ?</span>
          </div>
          <div className="modal-action">
            <form action={formAction} className="flex gap-1 w-1/2">
              <SubmitBtn isPending={isPending} text="Si" className="size-11" />
              <button onClick={() => dialogRef.current?.close()} type="button" className="btn-main-error">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}