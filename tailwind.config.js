/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "ubuntu": ["Ubuntu", "sans-serif"],
      },
      colors: {
        // Primary
        "brand-marine-blue": "hsl(213, 96%, 18%)",
        "brand-purplish-blue": "hsl(243, 100%, 62%)",
        "brand-pastel-blue": "hsl(228, 100%, 84%)",
        "brand-light-blue": "hsl(206, 94%, 87%)",
        "brand-strawberry-red": "hsl(354, 84%, 57%)",

        // Neutral
        "brand-cool-gray": "hsl(231, 11%, 63%)",
        "brand-light-gray": "hsl(229, 24%, 87%)",
        "brand-magnolia": "hsl(217, 100%, 97%)",
        "brand-alabaster": "hsl(231, 100%, 99%)",
        "brand-white": "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

