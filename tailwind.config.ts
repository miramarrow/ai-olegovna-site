import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "gradient": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "glow": {
          "0%, 100%": {
            "box-shadow": "0 0 20px rgba(255, 255, 255, 0.1)",
            opacity: "0.9",
          },
          "50%": {
            "box-shadow": "0 0 30px rgba(255, 255, 255, 0.2)",
            opacity: "1",
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.4",
          },
        },
        "fade-in-hero": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-badge": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "fade-in-heading": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-subheading": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-buttons": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-trust": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "slide-left": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        "mobile-menu-item": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "code-fall": {
          "0%": {
            transform: "translateY(0)",
            opacity: "0.3",
          },
          "50%": {
            opacity: "0.15",
          },
          "100%": {
            transform: "translateY(calc(100vh + 100px))",
            opacity: "0",
          },
        },
        "code-fall-muted": {
          "0%": {
            transform: "translateY(0)",
            opacity: "0.16",
          },
          "50%": {
            opacity: "0.08",
          },
          "100%": {
            transform: "translateY(calc(100vh + 100px))",
            opacity: "0",
          },
        },
        "code-fall-subtle": {
          "0%": {
            transform: "translateY(0)",
            opacity: "0.18",
          },
          "50%": {
            opacity: "0.1",
          },
          "100%": {
            transform: "translateY(calc(100vh + 100px))",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient": "gradient 15s ease infinite",
        "glow": "glow 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        "fade-in-hero": "fade-in-hero 0.6s ease-out",
        "fade-in-badge": "fade-in-badge 0.4s ease-out 0.2s both",
        "fade-in-heading": "fade-in-heading 0.6s ease-out 0.4s both",
        "fade-in-subheading": "fade-in-subheading 0.6s ease-out 0.6s both",
        "fade-in-buttons": "fade-in-buttons 0.6s ease-out 0.8s both",
        "fade-in-trust": "fade-in-trust 0.6s ease-out 1s both",
        "slide-left": "slide-left 20s linear infinite",
        "slide-left-mobile": "slide-left 15s linear infinite",
        "mobile-menu-item": "mobile-menu-item 0.3s ease-out forwards",
        "code-fall": "code-fall linear infinite",
        "code-fall-muted": "code-fall-muted linear infinite",
        "code-fall-subtle": "code-fall-subtle linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
