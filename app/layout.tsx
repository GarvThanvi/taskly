import { Suspense } from "react";
import "./globals.css";
import Navbar from "./navbar";
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
        <header className="border-b">
          <Suspense>
            <Navbar></Navbar>
          </Suspense>
        </header>
        <main className="mx-auto max-w-3xl p-4">{children}</main>
      </body>
    </html>
  );
}
