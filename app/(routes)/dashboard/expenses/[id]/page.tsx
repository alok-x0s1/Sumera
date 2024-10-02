"use client";

import React, { useEffect, useState } from "react";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import db from "@/utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";
import { BudgetType } from "../../budgets/_components/BudgetList";

interface Expense {
	id: number;
	name: string;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
	budgetId: number;
}

const ExpenseDetails = ({ params }: { params: { id: string } }) => {
	const { user } = useUser();
	const [budget, setBudget] = useState<BudgetType | null>(null);
	const [expenseList, setExpenseList] = useState<Expense[] | null>(null);
	const router = useRouter();

	const getExpensesInfo = async () => {
		const res = await db
			.select({
				...getTableColumns(Budgets),
				totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
				totalItems: sql`count(${Expenses.id})`.mapWith(Number),
			})
			.from(Budgets)
			.leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
			.where(
				and(
					eq(
						Budgets.createdBy,
						user?.primaryEmailAddress?.emailAddress || ""
					),
					eq(Budgets.id, Number(params.id))
				)
			)
			.groupBy(Budgets.id);

		setBudget(res[0] as BudgetType);
		getExpenseList();
	};

	const getExpenseList = async () => {
		const res = await db
			.select()
			.from(Expenses)
			.where(eq(Expenses.budgetId, Number(params.id)))
			.orderBy(desc(Expenses.id));

		setExpenseList(res as Expense[]);
	};

	useEffect(() => {
		if (user) getExpensesInfo();
	}, [user]);

	const deleteBudget = async (id: number) => {
		const deleteExpenses = await db
			.delete(Expenses)
			.where(eq(Expenses.budgetId, id))
			.returning();

		if (deleteExpenses) {
			const res = await db
				.delete(Budgets)
				.where(eq(Budgets.id, id))
				.returning();
			if (res) {
				toast("Budget deleted successfully.");
				router.push("/dashboard/budgets");
			}
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold flex items-center gap-2 justify-between">
				My Expenses
				<div className="flex items-center gap-2">
					{budget && (
						<EditBudget
							budget={budget}
							refreshBudgets={() => getExpensesInfo()}
						/>
					)}

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="destructive"
								className="flex items-center gap-2"
							>
								<Trash /> Delete
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete your budget and all
									associated expenses.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() =>
										deleteBudget(Number(params.id))
									}
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
				{budget ? (
					<BudgetItem budget={budget} />
				) : (
					<div className="bg-slate-200 p-4 rounded-md h-36 animate-pulse"></div>
				)}

				<AddExpense
					budgetId={Number(params.id)}
					refreshExpenses={() => getExpensesInfo()}
				/>
			</div>

			<div className="mt-6">
				<h2 className="text-xl font-bold">Latest Expenses</h2>
				<ExpenseListTable
					expenseList={expenseList as Expense[]}
					RefreshData={() => getExpensesInfo()}
				/>
			</div>
		</div>
	);
};

export default ExpenseDetails;
