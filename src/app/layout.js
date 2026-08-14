import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Muhammad Abdullah — Full Stack AI Developer",
  description:
    "Full Stack AI Developer building systems that turn raw sensor data into real-time decisions. Shipping AI features at Seamry Solutions. Previously built an accident-detection system with 92% inference accuracy.",
  keywords: [
    "AI Developer",
    "Full Stack Developer",
    "Machine Learning",
    "TensorFlow",
    "Computer Vision",
    "Next.js",
    "React",
    "Python",
    "Lahore",
  ],
  authors: [{ name: "Muhammad Abdullah" }],
  openGraph: {
    title: "Muhammad Abdullah — Full Stack AI Developer",
    description:
      "Building systems that turn raw sensor data into real-time decisions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Muhammad Abdullah — Full Stack AI Developer",
    description:
      "Building systems that turn raw sensor data into real-time decisions.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
