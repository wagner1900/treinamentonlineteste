import { type Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
      colors: {
        primary: {
          500: "#facc15", // amarelo oriental
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
