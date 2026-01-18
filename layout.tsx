import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenRead - Personal CV Platform",
  description: "Create your personal CV website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
