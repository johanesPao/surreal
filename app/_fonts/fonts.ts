import {
  Inter,
  JetBrains_Mono,
  Roboto_Mono,
  Inconsolata,
  BIZ_UDMincho,
} from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const inconsolata = Inconsolata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inconsolata",
});

export const wotfard = localFont({
  src: "./Wotfard-Regular.otf",
  display: "swap",
  variable: "--font-wotfard",
});

export const bizUDMincho = BIZ_UDMincho({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-biz-ud-mincho",
  weight: "400",
});
