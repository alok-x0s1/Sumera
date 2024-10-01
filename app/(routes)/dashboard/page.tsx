"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import CardInfo from "./_components/CardInfo";
import db from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { motion } from "framer-motion";
import BarChart from "./_components/BarChart";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable, {
	ExpenseType,
} from "./expenses/_components/ExpenseListTable";
import { BudgetType } from "./budgets/_components/BudgetList";

const Page = () => {
	const { user } = useUser();
	const [budgets, setBudgets] = useState<BudgetType[] | null>(null);
	const [expenses, setExpenses] = useState<ExpenseType[] | null>(null);


	const getBudgets = async () => {
		const res = await db
			.select({
				...getTableColumns(Budgets),
				totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
				totalItems: sql`count(${Expenses.id})`.mapWith(Number),
			})
			.from(Budgets)
			.where(
				eq(
					Budgets.createdBy,
					user?.primaryEmailAddress?.emailAddress || ""
				)
			)
			.leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
			.groupBy(Budgets.id);

		setBudgets(res as BudgetType[]);
		getAllExpenses();
	};

	// Fetch expenses
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
		if (user) getBudgets();
	}, [user]);

	// Skeleton loader for budgets and expenses
	const SkeletonLoader = ({ rows = 3 }: { rows?: number }) => (
		<div className="space-y-4">
			{Array.from({ length: rows }).map((_, idx) => (
				<div
					key={idx}
					className="h-12 w-full bg-muted animate-pulse rounded-md"
				></div>
			))}
		</div>
	);

	return (
		<motion.div
			className="mt-5 px-4 pb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<h1 className="text-3xl font-bold text-foreground mb-2">
				Welcome, {user?.fullName} 🤘
			</h1>
			<p className="text-sm text-muted-foreground mb-6">
				You can manage your budgets and expenses here.
			</p>

			{/* Budget Summary Section */}
			<div className="mb-6">
				{budgets ? (
					<CardInfo budgets={budgets} />
				) : (
					<SkeletonLoader rows={1} />
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Chart & Expenses Section */}
				<div className="lg:col-span-2">
					{/* Bar Chart */}
					<div className="mb-8">
						{budgets ? (
							<BarChart budgets={budgets} />
						) : (
							<SkeletonLoader rows={1} />
						)}
					</div>

					{/* Latest Expenses Section */}
					<div>
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Latest Expenses
						</h2>
						{expenses ? (
							<ExpenseListTable
								expenseList={expenses}
								RefreshData={getBudgets}
							/>
						) : (
							<SkeletonLoader rows={3} />
						)}
					</div>
				</div>

				<div className="md:col-span-1">
					<h2 className="text-2xl font-bold text-foreground mb-4">
						Latest Budgets
					</h2>
					<div className="space-y-4">
						{budgets ? (
							budgets.map((budget) => (
								<BudgetItem key={budget.id} budget={budget} />
							))
						) : (
							<SkeletonLoader rows={3} />
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Page;
