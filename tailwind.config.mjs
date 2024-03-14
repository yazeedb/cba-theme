/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "cta-color": "FACC15",
        "cta-text-color": "422006",
        "primary-header-dark": "020617",
        "primary-header-light": "F1F5F9",
        "paragraph-light": "E5E7EB",
        "paragraph-dark": "475569",
        "primary-green": "072B15",
      },
      fontFamily: {
        display: "Montserrat, Arial, Helvetica, sans-serif",
      },
    },
  },
  plugins: [],
};
