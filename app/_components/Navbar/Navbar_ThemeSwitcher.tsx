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
    <div className='flex items-center gap-4 px-5 text-white hover:text-white80' onClick={handleClick}>
      <span>Tema</span>
      {
        theme === "light"

          ? <SunSVG className="size-5 text-inherit" currentColor="currentColor" />
          : <MoonSVG className="size-5 text-inherit" currentColor="currentColor" />
      }
    </div>
  )
}

export default ThemeSwitcher