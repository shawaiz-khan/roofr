import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: {
          primary: "var(--purple-primary)",
          secondary: "var(--purple-secondary)",
          tertiary: "var(--purple-tertiary)",
          light: "var(--purple-light)",
        },
        black: {
          primary: "var(--black-primary)",
          secondary: "var(--black-secondary)",
          tertiary: "var(--black-tertiary)",
        },
        gray: {
          primary: "var(--gray-primary)",
          secondary: "var(--gray-secondary)",
          tertiary: "var(--gray-tertiary)",
        },
        text: {
          light: "var(--foreground)",
          dark: "var(--background)",
        },
        stroke: {
          grey: "var(--stroke-grey)",
          dark: "var(--stroke-dark)",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
