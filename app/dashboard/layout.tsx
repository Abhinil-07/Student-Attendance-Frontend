import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Providers } from "@/providers";
import { CalendarIcon, LogOutIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Provider } from "@radix-ui/react-tooltip";
const inter = Inter({ subsets: ["latin"] });
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
