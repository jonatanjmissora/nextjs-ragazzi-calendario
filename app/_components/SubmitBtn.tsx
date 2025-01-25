import { ReactNode } from "react";

export default function SubmitBtn({ isPending, text, className, classNameSVG, children }: { isPending: boolean, text?: string, className?: string, classNameSVG?: string, children?: ReactNode }) {

  return (
    <button
      type="submit"
      className={`${text && "btn-main"} border border-green-500 flex justify-center items-center ${className}`}
      disabled={isPending}
    >
      {
        isPending 
          ? <div className={`size-9 p-2 flex justify-center items-center ${classNameSVG} size-9 p-0 border border-blue-500`}>
              <span className={`loading loading-bars border border-red-500`}></span> 
            </div>
          : text 
            ? text 
            : children
      }
    </button>
  )
}