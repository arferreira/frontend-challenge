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
        discord: {
          DEFAULT: "#5865F2",
          dark: "#434EE4",
        },
        green: "#23A559",
        black: {
          DEFAULT: "#000000",
          soft: "#111214",
          softer: "#1E1F22",
          softest: "#2B2D31",
        },
        white: {
          DEFAULT: "#FFF",
          soft: "#F0F0F0",
          softer: "#DBDEE1",
          softest: "#B5BAC1",
        },
      },
      prefix: "fb-",
      keyframes: {
        "come-from-right": {
          "0%": { right: "-100%" },
          "100%": { right: "2%" },
        },
        "go-to-right": {
          "0%": { right: "2%" },
          "100%": { right: "-100%" },
        },
      },
      animation: {
        "come-from-right": "come-from-right 0.5s ease-in-out forwards",
        "go-to-right": "go-to-right 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
