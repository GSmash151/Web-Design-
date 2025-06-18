import type { Metadata } from "next";
// Importing Source Sans 3 font from Google Fonts
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";

// Configure the Source Sans 3 font with variable and subsets
const fontSans = FontSans({
  // Use variable font for better performance
  variable: "--font-sans",
  subsets: ["latin"],
  // Specify the font weights to be used
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});


export const metadata: Metadata = {
  title: "Sommaire - AI-Powered Summarization",
  description: "Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with out advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Preconnect to Google Fonts for better performance */}
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
