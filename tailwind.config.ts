import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#08090c",
          900: "#0c0e12",
          850: "#101319",
          800: "#15181f",
          700: "#1d222b"
        },
        aura: {
          50: "#eef7ff",
          200: "#b8dcff",
          400: "#71b0ff",
          500: "#4b8cf8",
          600: "#2f6ee6"
        },
        mint: {
          400: "#62e6c4",
          500: "#28c9a5"
        }
      },
      boxShadow: {
        panel: "0 20px 60px -30px rgba(4, 6, 10, 0.9)",
        glow: "0 0 0 1px rgba(113, 176, 255, 0.18), 0 22px 70px -40px rgba(75, 140, 248, 0.8)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
