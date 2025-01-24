import { ReactNode } from "react";

export default function SubmitBtn({ isPending, text, className, children }: { isPending: boolean, text?: string, className?: string, children?: ReactNode }) {

  return (
    <button
      type="submit"
      className={`${text && "btn-main-success"} flex justify-center items-center ${className}`}
      disabled={isPending}
    >
      {isPending ? <span className="size-5 loading loading-bars"></span> : text ? text : children}
    </button>
  )

}
