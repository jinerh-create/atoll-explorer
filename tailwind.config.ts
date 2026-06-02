import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0AC4A0",
        "primary-dark": "#089E83",
        "primary-light": "#E6FAF6",
        "primary-mid": "#C8F3EB",
        surface: "#FFFFFF",
        "surface-2": "#F0F4F3",
        background: "#F5F9F8",
        border: "#E2ECEB",
        "text-base": "#1A2B2A",
        "text-muted": "#6B7B7A",
        "text-light": "#9AADAC",
        // keep ocean for map components
        "ocean-deep": "#0A1628",
        "ocean-mid": "#0D2137",
        "ocean-teal": "#0891B2",
        "ocean-turquoise": "#06B6D4",
        lagoon: "#22D3EE",
        coral: "#F97316",
        pearl: "#F8FAFC",
        gold: "#D4AF37",
        "maldives-blue": "#1E40AF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideUp: "slideUp 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 1.5s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #0AC4A0 0%, #089E83 100%)",
        "gradient-hero": "linear-gradient(160deg, #0AC4A0 0%, #089E83 50%, #067A65 100%)",
        "gradient-card": "linear-gradient(135deg, #0AC4A0 0%, #0BB89A 50%, #089E83 100%)",
        // keep ocean for map
        "gradient-ocean": "linear-gradient(135deg, #0A1628 0%, #0D2137 50%, #0891B2 100%)",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(10,196,160,0.08)",
        md: "0 4px 20px rgba(10,196,160,0.12)",
        lg: "0 8px 40px rgba(10,196,160,0.18)",
        card: "0 2px 12px rgba(0,0,0,0.07)",
        "card-hover": "0 8px 30px rgba(10,196,160,0.18)",
        primary: "0 4px 15px rgba(10,196,160,0.35)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      screens: { xs: "375px" },
    },
  },
  plugins: [],
};

export default config;
