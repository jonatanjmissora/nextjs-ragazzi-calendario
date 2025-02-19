"use client"

import Link from 'next/link';
import { useState, useRef, startTransition } from "react";
import CloseEyeSVG from '@/app/_assets/CloseEyeSVG';
import OpenEyeSVG from '@/app/_assets/OpenEyeSVG';
import { InputRHF } from '../InputRHF';
import { useForm } from 'react-hook-form';
import { userSchema, UserType } from '@/app/_lib/schema/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterActionState } from '@/app/_lib/hooks/useRegisterActionState';
import SubmitBtn from '../SubmitBtn';
import LogoSVG from '@/app/_assets/LogoSVG';

export default function RegisterForm() {

  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { register, formState: { errors }, handleSubmit } = useForm<UserType>({ resolver: zodResolver(userSchema) })
  const [formState, formAction, isPending] = useRegisterActionState()
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    handleSubmit(() => {
      startTransition(() => formAction(new FormData(formRef.current!)))
    })(evt);
  }


  return (
    <div className='w-[90%] sm:w-[20rem] h-full flex flex-col justify-center items-center'>

      <picture className="h-full scale-150 sm:scale-100 flex items-center justify-center fixed top-0 z-5 translate-x-[55%] sm:translate-x-[120%]">
        <LogoSVG className="w-full h-full text-[#0f0404]" currentColor="currentColor" />
      </picture>

      <form
        ref={formRef}
        className='flex flex-col w-full gap-2 relative z-100'
        action={formAction}
        onSubmit={onSubmit}
      >

        <h2 className='font-bold text-2xl tracking-wider italic pb-4'>Registra tus datos</h2>

        <div className='flex flex-col gap-1 h-20'>
          <InputRHF
            className=""
            label="username"
            defaultValue={formState?.prevState.username}
            error={errors.username?.message}
            register={register}
          />
        </div>

        <div className='relative h-20'>

          <div className='flex flex-col gap-1'>
            <InputRHF
              className="w-full"
              label="userpassword"
              type={showPassword ? "text" : "password"}
              defaultValue={formState?.prevState.userpassword}
              error={errors.userpassword?.message}
              register={register}
            />
          </div>

          <button className="p-2 absolute right-4 top-1" type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <CloseEyeSVG className='size-6' currentColor='#666' /> : <OpenEyeSVG className='size-6' currentColor='#666' />}
          </button>
        </div>

        <div className='h-20 w-full flex flex-col items-end gap-2'>
          <div className='w-1/2 flex'>
            <SubmitBtn text={"Registrar"} isPending={isPending} className='size-11' />
          </div>
          <p className='text-orange-700'>{formState?.message}</p>
        </div>

        <div className="w-full flex gap-2 opacity-50">
          <span>¿Tienes una cuenta?</span>
          <Link className='link link-primary' href="/">Ingresa</Link>
        </div>

      </form>
    </div>
  )
}