/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
import flowbite from "flowbite-react/tailwind";
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

    flowbite.content(),
  ],
  theme: {
    colors: {
      darkBlue: "#233754",
      darkBrown: "#9b5647",
      Orange: "#eb7a3c",
    },
    extend: {},
  },
  darkMode: "class",

  plugins: [
    flowbite.plugin(),
    nextui(),
    daisyui,
    "@tailwindcss/aspect-ratio",
     "@tailwindcss/forms"
  ],
  daisyui: {
    themes: false,
  },
};
