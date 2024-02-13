import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx", "./node_modules/flowbite-react/lib/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
