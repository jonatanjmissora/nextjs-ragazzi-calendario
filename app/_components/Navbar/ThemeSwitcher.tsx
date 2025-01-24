"use client"

import MoonSVG from '@/app/_assets/MoonSVG'
import SunSVG from '@/app/_assets/SunSVG'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className='flex items-center gap-4 px-5'>
      <span>Tema</span>
      {
        theme === "light"

          ? <button onClick={() => setTheme('dark')}>
            <SunSVG className="size-5 text-white" currentColor="currentColor" />
          </button>

          : <button onClick={() => setTheme('light')}>
            <MoonSVG className="size-5 text-white" currentColor="currentColor" />
          </button>
      }
    </div>
  )
}

export default ThemeSwitcher