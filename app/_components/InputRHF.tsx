import { UseFormRegister } from "react-hook-form";

type InputProps = {
  label: "username" | "userpassword";
  type?: "text" | "number" | "submit" | "password";
  placeholder?: string;
  defaultValue?: string | number;
  error?: string;
  className?: string;
  register: UseFormRegister<{ username: string, userpassword: string }>;
}

export const InputRHF = ({ className, label, register, ...props }: InputProps) => {

  return (
    <>
      <input
        className={`input input-bordered text-center ${props.error && 'bg-red-300/20'}  ${className}`}
        type={props.type ?? "text"}
        placeholder={props.placeholder ?? label}
        autoComplete='off'
        {...register(`${label}`)}
        {...props}
      />
      <p id={`${label}-error`} className='text-orange-700'>{props.error && props.error}</p>
    </>
  )
}
