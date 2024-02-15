import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx", "./node_modules/flowbite-react/lib/**/*.js"],
  safelist: [
    "w-64",
    "w-1/2",
    "rounded-l-lg",
    "rounded-r-lg",
    "bg-gray-200",
    "grid-cols-4",
    "grid-cols-7",
    "h-6",
    "leading-6",
    "h-9",
    "leading-9",
    "shadow-lg",
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      colors: {
        background: "#F9F9FB",
        discord: "#434EE4",
        black: {
          DEFAULT: "#000000",
          soft: "#313338",
        },
        white: {
          DEFAULT: "#FFFFFF",
          smoke: "#FBFBFC",
        },
      },
      prefix: "fb-",
      keyframes: {
        "come-from-right": {
          "0%": { right: "-100%" },
          "100%": { right: "2%" },
        },
      },
      animation: {
        "come-from-right": "come-from-right 0.5s ease-in-out forwards",
        "go-to-right": "come-from-right reverse 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
