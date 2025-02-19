"use client"

import MoonSVG from '@/app/_assets/MoonSVG'
import SunSVG from '@/app/_assets/SunSVG'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className='w-60 border-t border-foreground25 text-right pt-4 flex items-center justify-end gap-2 hover:text-foreground80' onClick={handleClick}>
      {
        theme === "light"

          ? <SunSVG className="size-5" currentColor="currentColor" />
          : <MoonSVG className="size-5" currentColor="currentColor" />
      }
      <span className='text-base'>Tema</span>
    </div>
  )
}

export default ThemeSwitcher