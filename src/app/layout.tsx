import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rev - Premium TikTok Transcription",
  description: "Transcribe any TikTok, YouTube, or Instagram video into text quickly and accurately using AI.",
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
