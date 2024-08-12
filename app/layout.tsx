import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/SideBar";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex w-screen h-screen p-2 bg-black">
        <SideBar/>
        {children}
        </body>
    </html>
  );
}
