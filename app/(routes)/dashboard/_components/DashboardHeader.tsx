"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidemenu } from "@/context/SidemenuContext";

const DashboardHeader = () => {
	const { open, setOpen } = useSidemenu();

	return (
		<div className="p-5 shadow-sm border-b w-full flex justify-between items-center">
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setOpen(!open)}
				>
					<Menu size={20} />
				</Button>
				<h1 className="text-2xl font-bold">Dashboard</h1>
			</div>
			<div className="flex items-center gap-2">
				<UserButton />
			</div>
		</div>
	);
};

export default DashboardHeader;
