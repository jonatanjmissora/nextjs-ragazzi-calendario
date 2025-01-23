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
      },
    },
  },
  plugins: [
    daisyui,
  ],
} satisfies Config;
