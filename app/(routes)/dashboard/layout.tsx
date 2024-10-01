"use client";

import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import db from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useSidemenu } from "@/context/SidemenuContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const { user } = useUser();
	const router = useRouter();
	const { open, setOpen } = useSidemenu();

	const checkUserBudget = async () => {
		const res = await db
			.select()
			.from(Budgets)
			.where(
				eq(
					Budgets.createdBy,
					user?.primaryEmailAddress?.emailAddress || ""
				)
			);

		if (res.length === 0) {
			router.replace("/dashboard/budgets");
		}
	};

	useEffect(() => {
		user && checkUserBudget();
	}, [user]);

	return (
		<div className="flex">
			<div
				className={`w-64 ${
					open ? "block" : "hidden"
				} fixed bg-background z-50`}
			>
				<SideNav />
			</div>
			<div className="w-full">
				<DashboardHeader />
				{children}
			</div>
		</div>
	);
};

export default DashboardLayout;
