import { Mukta } from "next/font/google";
import "./globals.css";

const inter = Mukta({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Pantrack | Track Pantry ",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
