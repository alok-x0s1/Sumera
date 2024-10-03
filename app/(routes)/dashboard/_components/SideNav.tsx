"use client";

import { UserButton } from "@clerk/nextjs";
import {
	DollarSignIcon,
	LayoutGridIcon,
	ReceiptText,
	ShieldCheckIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { useSidemenu } from "@/context/SidemenuContext";

const SideNav = () => {
	const { setOpen } = useSidemenu();
	const menuList = [
		{
			id: 1,
			name: "Dashboard",
			icon: <LayoutGridIcon className="w-5 h-5" />,
			href: "/dashboard",
		},
		{
			id: 2,
			name: "Budgets",
			icon: <DollarSignIcon className="w-5 h-5" />,
			href: "/dashboard/budgets",
		},
		{
			id: 3,
			name: "Expenses",
			icon: <ReceiptText className="w-5 h-5" />,
			href: "/dashboard/expenses",
		},
		{
			id: 4,
			name: "Upgrade",
			icon: <ShieldCheckIcon className="w-5 h-5" />,
			href: "/dashboard/upgrades",
		},
	];
	const pathname = usePathname();

	return (
		<div className="flex flex-col w-64 h-screen shadow-xl pt-6">
			<Link href="/" onClick={() => setOpen(false)}>
				<h1 className="text-3xl font-extrabold tracking-tight text-primary px-6">
					Sumera
				</h1>
			</Link>

			<div className="flex flex-col mt-10">
				{menuList.map((item) => (
					<Link
						key={item.id}
						href={item.href}
						className={`group flex items-center gap-4 px-4 py-4 transition-all duration-300 border-t border-b border-transparent ${
							pathname === item.href
								? "bg-gray-200 text-primary shadow-md"
								: "hover:bg-gray-200 hover:border-gray-300"
						}`}
						onClick={() => setOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.3, delay: 0.1 * item.id }}
							className={`w-5 h-5 group-hover:text-chart-1 ${
								pathname === item.href ? "text-chart-1" : ""
							}`}
						>
							{item.icon}
						</motion.div>

						{/* Menu Item Text */}
						<motion.h2
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{
								duration: 0.3,
								delay: 0.15 * item.id,
							}}
							className="text-lg font-medium"
						>
							{item.name}
						</motion.h2>
					</Link>
				))}
			</div>

			{/* Profile Section */}
			<div className="mt-auto">
				<div className="flex items-center justify-start gap-4 bg-gray-200 p-4 rounded-lg">
					<motion.div
						initial={{ rotate: -15, opacity: 0 }}
						animate={{ rotate: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<UserButton />
					</motion.div>
					<motion.h2
						initial={{ x: -20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-lg font-medium text-primary"
					>
						Profile
					</motion.h2>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
