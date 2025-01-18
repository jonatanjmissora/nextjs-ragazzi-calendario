import { ReactNode } from "react";

export default function SubmitBtn({ isPending, text, className, children }: { isPending: boolean, text?: string, className?: string, children?: ReactNode }) {

  return (
    <button
      type="submit"
      className={`${text && "btn btn-primary tracking-wide font-semibold flex-1"} flex jsutify-center items-center ${className}`}
      disabled={isPending}
    >
      {isPending ? <span className="loading loading-spinner"></span> : text ? text : children}
    </button>
  )

}
