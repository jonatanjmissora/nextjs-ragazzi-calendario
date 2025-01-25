import { ReactNode } from "react";

export default function SubmitBtn({ isPending, text, className, classNameSVG, children }: { isPending: boolean, text?: string, className?: string, classNameSVG?: string, children?: ReactNode }) {

  return (
    <button
      type="submit"
      className={`${text && "btn-main"} ${className}`}
      disabled={isPending}
    >
      {
        isPending
          ? <div className={`size-9 p-2 flex justify-center items-center ${classNameSVG}`}>
            <span className={`loading loading-bars`}></span>
          </div>
          : text
            ? text
            : children
      }
    </button>
  )
}