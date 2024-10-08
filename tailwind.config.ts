import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./(app|komponenMDX)/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
    "./komponen/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              fontSize: '0.8rem',
              lineHeight: '1.5'
            },
            h1: {
              fontSize: '1.2rem',
              marginTop: '0.5em',
              marginBottom: '1em',
              lineHeight: '1.5'
              
            },
            h2: {
              fontSize: '1.1rem',
              marginTop: '0.5em',
              marginBottom: '1em',
              lineHeight: '1.5'
            },
            h3: {
              fontSize: '1rem',
              marginTop: '0.5em',
              marginBottom: '1em',
              lineHeight: '1.5'
            },
            ol: {
              fontSize: '0.8rem'
            }
          }
        }
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)"],
        inconsolata: ["var(--font-inconsolata)"],
        robotoMono: ["var(--font-roboto-mono)"],
        jetbrainsMono: ["var(--font-jetbrains-mono)"],
        wotfard: ["var(--font-wotfard)"],
        bizUDMincho: ["var(--font-biz-ud-mincho)"],
        monaspaceArgon: ["var(--font-monaspace-argon)"],
        monaspaceKrypton: ["var(--font-monaspace-krypton)"],
        monaspaceNeon: ["var(--font-monaspace-neon)"],
        monaspaceRadon: ["var(--font-monaspace-radon)"],
        monaspaceXenon: ["var(--font-monaspace-xenon)"],
        geistSans: ["var(--font-geist-sans)"],
        geistMono: ["var(--font-geist-mono)"],
      },
      colors: {
        "pitch-black": {
          DEFAULT: "#000000"
        },
        "eerie-black": {
          DEFAULT: "#1B1B1B"
        },
        "chinese-black": {
          DEFAULT: "#141414"
        },
        "vampire-black": {
          DEFAULT: "#090909"
        },
        "special-background": {
          DEFAULT: "#fef6e4",
          "100": "#fcedc9",
          "200": "#f9d88e",
          "300": "#f6be53",
          "400": "#f3a72c",
          "500": "#ed8513",
          "600": "#d1610e",
          "700": "#ae430f",
          "800": "#8d3413",
          "900": "#742c13",
          "950": "#431405",
        },
        background: {
          "50": "#fcf7f4",
          "100": "#faede6",
          "200": "#f7ded1",
          DEFAULT: "#f3d2c1",
          "400": "#e5a584",
          "500": "#d7865c",
          "600": "#c36c3f",
          "700": "#a35832",
          "800": "#884b2c",
          "900": "#71432b",
          "950": "#3d2112",
        },
        "cobalt-off-blue": {
          "50": "#f1f9fe",
          "100": "#e1f2fd",
          "200": "#bde2fa",
          "300": "#82c8f7",
          "400": "#3faaf1",
          "500": "#1690e1",
          "600": "#0977c0",
          "700": "#09619b",
          "800": "#0c5280",
          "900": "#10466a",
          DEFAULT: "#0d3a58",
        },
        "cobalt-yellow": {
          "50": "#ffffea",
          "100": "#fffdc5",
          "200": "#fffb85",
          "300": "#fff246",
          "400": "#ffe51b",
          DEFAULT: "#ffc600",
          "600": "#e29a00",
          "700": "#bb6d02",
          "800": "#985408",
          "900": "#7c450b",
          "950": "#482400",
        },
        "cobalt-orange": {
          "50": "#fffcea",
          "100": "#fff3c5",
          "200": "#ffe785",
          "300": "#ffd546",
          "400": "#ffc01b",
          DEFAULT: "#ff9d00",
          "600": "#e27500",
          "700": "#bb5002",
          "800": "#983d08",
          "900": "#7c330b",
          "950": "#481800",
        },
        "cobalt-mint": {
          "50": "#eefffb",
          "100": "#c5fff5",
          "200": "#8bffee",
          DEFAULT: "#2affdf",
          "400": "#14edd3",
          "500": "#00d1ba",
          "600": "#00a89a",
          "700": "#00857c",
          "800": "#056a64",
          "900": "#0a5753",
          "950": "#003534",
        },
        "cobalt-blue": {
          "50": "#f3f8fc",
          "100": "#e6f1f8",
          "200": "#c7e1f0",
          "300": "#96c9e3",
          "400": "#5dadd3",
          "500": "#3993be",
          "600": "#2876a1",
          "700": "#225e82",
          "800": "#20516c",
          "900": "#1f445b",
          DEFAULT: "#193549",
        },
        "cobalt-dusty-blue": {
          "50": "#f3f7f8",
          "100": "#e0eaed",
          "200": "#c5d6dc",
          "300": "#9db8c3",
          "400": "#6d92a3",
          "500": "#527688",
          "600": "#466374",
          "700": "#3e5360",
          DEFAULT: "#35434d",
          "900": "#323d47",
          "950": "#1e262e",
        },
        "cobalt-dark-blue": {
          "50": "#f1f8fa",
          "100": "#dcecf1",
          "200": "#bcdbe5",
          "300": "#8ec1d2",
          "400": "#599eb7",
          "500": "#3e829c",
          "600": "#366b84",
          "700": "#31586d",
          "800": "#2f4b5b",
          "900": "#2b404e",
          DEFAULT: "#15232d",
        },
        "cobalt-pink": {
          "50": "#fef4ff",
          "100": "#fde7ff",
          "200": "#fbceff",
          DEFAULT: "#fb94ff",
          "400": "#fa74fe",
          "500": "#f240f5",
          "600": "#d920d9",
          "700": "#b417b1",
          "800": "#93158e",
          "900": "#781772",
          "950": "#51014d",
        },
        "cobalt-light-blue": {
          "50": "#ebfffd",
          "100": "#cdfffe",
          DEFAULT: "#9effff",
          "300": "#62fcfe",
          "400": "#1beff5",
          "500": "#00d2db",
          "600": "#02a8b8",
          "700": "#0a8594",
          "800": "#126b78",
          "900": "#135866",
          "950": "#063b46",
        },
      },
      lineClamp: {
        10: "10",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
