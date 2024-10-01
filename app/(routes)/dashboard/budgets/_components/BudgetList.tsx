"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import db from "@/utils/dbConfig";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

export interface BudgetType {
	id: number;
	name: string;
	amount: number;
	icon: string;
	createdBy: string;
	createdAt: Date;
	updatedAt: Date;
	totalSpend?: number;
	totalItems?: number;
}

const BudgetList = () => {
	const { user } = useUser();
	const [budgets, setBudgets] = useState<BudgetType[] | null>(null);
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
	};

	useEffect(() => {
		if (user) getBudgets();
	}, [user]);

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<CreateBudget refreshBudgets={() => getBudgets()} />

				{budgets && budgets.length > 0
					? budgets.map((budget) => (
							<BudgetItem key={budget.id} budget={budget} />
					  ))
					: [1, 2, 3, 4].map((i, index) => (
							<div
								key={index}
								className="bg-slate-200 p-4 rounded-md h-36 animate-pulse"
							></div>
					  ))}
			</div>
		</div>
	);
};

export default BudgetList;
