import React from 'react'

export default function Footer() {

  const year = new Date().getFullYear()

  return (
    <footer className='text-slate-400 footer-height w-full flex justify-end items-center px-5'>K@to {year}</footer>
  )
}
