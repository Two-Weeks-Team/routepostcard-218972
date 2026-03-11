const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        card: "var(--color-card)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        warning: "var(--color-warning)"
      },
      borderRadius: {
        DEFAULT: "var(--radius)"
      },
      boxShadow: {
        DEFAULT: "var(--shadow)"
      },
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
        serif: ['"Playfair Display"', ...fontFamily.serif]
      }
    }
  },
  plugins: []
};
