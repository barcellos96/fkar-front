import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      s: "360px",
      sm: "426px",
      slg: "600px",
      md: "860px",
      lg: "1024px",
      xlg: "1320px",
      xl: "1650px",
    },
    fontSize: {
      sm: "0.7rem",
      base: "0.85rem",
      lg: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      gridTemplateColumns: {
        app: "minmax(16rem, 19rem) 1fr",
        profileLayout: "minmax(9.5rem, 20rem) minmax(18rem, 1fr)",
        profileLayoutSm: "minmax(9.5rem, 1fr)",
        profileSideBar: "max-content 1fr max-content",
        dashUpLg: "minmax(25rem,100rem) minmax(14rem, 40rem)",
      },
    },
  },
  plugins: [],
};
export default config;
