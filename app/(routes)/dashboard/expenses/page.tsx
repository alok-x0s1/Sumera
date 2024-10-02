"use client";

import React, { useEffect, useState } from "react";
import { eq, desc } from "drizzle-orm";
import db from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import ExpenseListTable, { ExpenseType } from "./_components/ExpenseListTable";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

const ExpenseDetails = () => {
	const [expenses, setExpenses] = useState<ExpenseType[] | null>(null); // Use null to handle loading state
	const { user } = useUser();

	const getAllExpenses = async () => {
		const res = await db
			.select({
				id: Expenses.id,
				name: Expenses.name,
				amount: Expenses.amount,
				createdAt: Expenses.createdAt,
			})
			.from(Budgets)
			.rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
			.where(
				eq(
					Budgets.createdBy,
					user?.primaryEmailAddress?.emailAddress || ""
				)
			)
			.orderBy(desc(Expenses.id));

		setExpenses(res as unknown as ExpenseType[]);
	};

	useEffect(() => {
		user && getAllExpenses();
	}, [user]);

	const skeletonLoader = (
		<div className="mt-6 space-y-4">
			{Array.from({ length: 3 }).map((_, index) => (
				<div
					key={index}
					className="w-full h-12 bg-muted animate-pulse rounded-md"
				></div>
			))}
		</div>
	);

	return (
		<motion.div
			className="p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<h1 className="text-2xl font-bold text-foreground mb-4">
				My Expenses
			</h1>

			{expenses ? (
				<ExpenseListTable
					expenseList={expenses}
					RefreshData={getAllExpenses}
				/>
			) : (
				skeletonLoader
			)}
		</motion.div>
	);
};

export default ExpenseDetails;
