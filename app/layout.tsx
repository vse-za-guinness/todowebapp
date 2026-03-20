import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banu Whatever This Is",
  description: "Full-stack deployment tutorial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <TooltipProvider>
        {children}
        </TooltipProvider>
          {process.env.NEXT_PUBLIC_ENV_LABEL && (
            <div style={{
              position: 'fixed', bottom: 12, right: 12, zIndex: 9999,
              background: process.env.NEXT_PUBLIC_ENV_LABEL === 'production' ? '#166534' : '#92400e',
              color: 'white', padding: '4px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 700
            }}>
              {process.env.NEXT_PUBLIC_ENV_LABEL}
            </div>
           )}
        </body>
    </html>
  );
}
