import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

const openSans = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
  weight: ["100", "300", "400", "500", "700", "900"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={openSans.className}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
