import PlusSVG from "@/app/_assets/PlusSVG";
import Image from "next/image";
import { useRef } from "react";

export default function AdminWeblinkEditFormModal({ imgData, imgFileName }: { imgData: string, imgFileName: string }) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="bg-slate-300 rounded-lg shadow border border-black25 overflow-hidden w-[160px] h-[100px] relative" type="button" onClick={() => dialogRef.current?.showModal()}>
        <Image src={imgData} alt={imgFileName} fill className="p-2 object-contain" />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="card weblink-modal-container fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="w-full flex justify-end">
            <button className="btn btn-ghost rounded-full" type="button" onClick={() => dialogRef.current?.close()}><PlusSVG className="size-7 rotate-45 text-slate-300" currentColor="currentColor" /></button>
          </div>
          <div className="bg-black rounded-lg overflow-hidden relative weblink-modal-img">
            <Image src={imgData} alt={imgFileName} fill className="p-2 object-contain" />
          </div>
        </div>
      </dialog>
    </>
  )
}
