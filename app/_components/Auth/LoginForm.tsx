"use client"

import Link from 'next/link';
import { useState, useRef, startTransition } from "react";
import CloseEyeSVG from '@/app/_assets/CloseEyeSVG';
import OpenEyeSVG from '@/app/_assets/OpenEyeSVG';
import { useLoginActionState } from '@/app/_lib/hooks/useLoginActionState';
import { InputRHF } from '../InputRHF';
import { useForm } from 'react-hook-form';
import { userSchema, UserType } from '@/app/_lib/schema/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitBtn from '../SubmitBtn';

export default function LoginForm() {

  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { register, formState: { errors }, handleSubmit } = useForm<UserType>({ resolver: zodResolver(userSchema) })
  const [formState, formAction, isPending] = useLoginActionState()
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    handleSubmit(() => {
      startTransition(() => formAction(new FormData(formRef.current!)))
    })(evt);
  }


  return (
    <div className='w-[20rem] h-full flex justify-center items-center'>

      <form
        ref={formRef}
        className='flex flex-col w-full gap-2'
        action={formAction}
        onSubmit={onSubmit}
      >

        <h2 className='text-3xl font-semibold h-20 leading-[5rem]'>Ingresa tus datos</h2>

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

        <div className='h-20'>
          <SubmitBtn text={"Ingresar"} isPending={isPending} />
          <p className='text-orange-700'>{formState?.message}</p>
        </div>

        <div className="w-full flex gap-2 justify-end">
          <span>¿No tienes cuenta?</span>
          <Link className='link link-primary' href="/register">Registrate</Link>
        </div>

      </form>
    </div>
  )
}