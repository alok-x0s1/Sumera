"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
	const { isSignedIn } = useUser();

	return (
		<motion.header
			className="p-4 flex items-center justify-between bg-background text-foreground shadow-md fixed top-0 left-0 right-0 z-50"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Link href="/" className="text-3xl tracking-tighter font-bold">
				Sumera
			</Link>
			{isSignedIn ? (
				<UserButton />
			) : (
				<Link href="/sign-in">
					<Button className="bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300">
						Get started
					</Button>
				</Link>
			)}
		</motion.header>
	);
};

export default Header;
