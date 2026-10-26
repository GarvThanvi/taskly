import { Suspense } from "react";
import "./globals.css";
import Navbar from "./navbar";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import ToggleCreate from "@/components/toggle-create-form";
export const metadata = {
  title: "Taskly",
  description: "A small task manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Toaster></Toaster>
        <header className="border-b">
          <Suspense>
            <Navbar></Navbar>
          </Suspense>
          <ToggleCreate></ToggleCreate>
        </header>
        <Providers>
          <main className="mx-auto max-w-3xl p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
