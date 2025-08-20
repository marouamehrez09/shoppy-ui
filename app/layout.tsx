// "use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Container, CssBaseline } from "@mui/material";
import Header from "./header/header";
import Providers from "./providers";
import logout from "./auth/logout";
import authenticated from "./auth/actions/authenticated";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isAuthenticated = await authenticated();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <Header logout={logout} />
          <Container className={isAuthenticated ? 'mt-10' : ""}>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
