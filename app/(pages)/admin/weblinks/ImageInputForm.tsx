"use client"

import { addWeblink } from "@/app/_lib/actions/weblinks.action";
import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import Image from "next/image";
import { useActionState, useRef, useState } from "react"

type FormStateType = {
  success: boolean;
  message: string;
} | null

export default function ImageInputForm() {

  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgData, setImgData] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const baseURL = reader.result as string;
        console.log({ baseURL })
        setImgData(baseURL)
        setImgFile(file)
      };
    }
  }

  const handleReset = () => {
    setImgFile(null)
    setImgData("")
  }

  const [formState, formAction, isPending] = useActionState(async (prevState: FormStateType, formData: FormData) => {
    const newWeblink = Object.fromEntries(formData.entries()) as WeblinkType

    return await addWeblink(newWeblink)

  }, null)

  return (
    <>
      <form action={formAction} className="flex flex-col items-center justify-center gap-10">

        <div className="flex flex-col items-center justify-center gap-4">

          <label className="input input-bordered p-4 py-2 cursor-pointer flex justify-center items-center" htmlFor="file">Elija imagen</label>
          <input ref={inputRef} className={"hidden"} type="file" name="image" id="file" accept=".jpeg, .png, .jpg, .webp"
            onChange={handleChange}
          />
          {
            imgFile &&
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex justify-center items-center">
                <span className="w-1/2 truncate">{imgFile.name}</span>
                <button className="btn btn-outline" type="button" onClick={handleReset}>X</button>
              </div>
              <Image src={imgData} alt={imgFile.name} width={150} height={150} className="object-contain" />
            </div>
          }
        </div>

        <div className="w-full flex flex-col justify-end items-end gap-2">
          <button type="submit" className="btn btn-primary w-1/2 ml-auto" >{isPending ? <span className="loading loading-spinner"></span> : "Upload"}</button>
          <span className="text-yellow-700">{formState?.message}</span>
        </div>

      </form>

    </>
  )
}
