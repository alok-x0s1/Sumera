import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import SidemenuProvider from "@/context/SidemenuContext";

export const metadata: Metadata = {
	title: "Sumo | 🦑",
	description:
		"Sumo is a personal finance app that helps you track your expenses and budgets.",
};
 
const outfit = Outfit({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${outfit.className} antialiased`}>
					<SidemenuProvider>
						<Toaster />
						{children}
					</SidemenuProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
