import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",

        foreground: "var(--foreground)",
        foreground80: "var(--foreground80)",
        foreground25: "var(--foreground25)",
        card: "var(--bg-card)",

        ragazzi: "var(--ragazzi)",
        patricios: "var(--patricios)",
        palihue: "var(--palihue)",
        jmolina: "var(--jmolina)",

        black: "var(--black)",
        black80: "var(--black80)",
        black25: "var(--black25)",
        white: "var(--white)",
        white80: "var(--white80)",
        white25: "var(--white25)",
        gray: "var(--gray)",
      },
    },
  },
  plugins: [
    daisyui,
  ],
} satisfies Config;
