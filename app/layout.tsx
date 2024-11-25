import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
                        <div className="sticky top-0 z-50">
                            <Navbar />
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            {children}
                        </div>
                    </div>
                </body>
            </html>
        </SessionProvider>
    );
}