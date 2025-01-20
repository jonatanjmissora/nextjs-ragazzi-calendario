import Image from "next/image";
import { useRef } from "react";

export default function AdminweblinkEditFormModal({ imgData, imgFileName }: { imgData: string, imgFileName: string }) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="bg-slate-300 rounded-lg overflow-hidden w-[160px] h-[100px] relative" type="button" onClick={() => dialogRef.current?.showModal()}>
        <Image src={imgData} alt={imgFileName} fill className="p-2 object-contain" />
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="w-full h-full bg-transparent relative">
        <div className="p-1 bg-slate-900 rounded-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="w-full flex justify-end">
            <button className="btn btn-ghost" type="button" onClick={() => dialogRef.current?.close()}>X</button>
          </div>
          <div className="bg-slate-300 rounded-lg overflow-hidden w-[600px] h-[400px] relative m-8 mt-0">
            <Image src={imgData} alt={imgFileName} fill className="p-2 object-contain" />
          </div>
        </div>
      </dialog>
    </>
  )
}
