import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-blue': '0 5px 5px rgba(42, 42, 238, 0.322)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customDark: "#272727",
        customGreen: "#228B22",
        customLightGreen: {
          100: "#00C700",
          200: "#006400",
          300: "#006400",
        },
      },
    },
  },
  plugins: [],
};
export default config;
