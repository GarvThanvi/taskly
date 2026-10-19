import Link from "next/link";
import "./globals.css";

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
          <nav className="mx-auto flex max-w-3xl items-center gap-4 p-4">
            <Link href="/">Taskly</Link>
            <Link href="/tasks">Tasks</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl p-4">{children}</main>
      </body>
    </html>
  );
}
