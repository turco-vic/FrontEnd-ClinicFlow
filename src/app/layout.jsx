import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const inter = Inter({ 
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
});

export const metadata = {
    title: "ClinicFlow",
    description: "",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="pt-BR">
                <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
