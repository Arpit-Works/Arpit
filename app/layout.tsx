import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arpit Vishwakarma — Backend Engineer",
  description: "Backend-focused full-stack engineer portfolio.",
};

export const viewport: Viewport = {
  themeColor: "#0D1117",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
