"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import db from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const AddExpense = ({
	budgetId,
	refreshExpenses,
}: {
	budgetId: number;
	refreshExpenses: () => void;
}) => {
	const [expenseName, setExpenseName] = useState("");
	const [expenseAmount, setExpenseAmount] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const addExpense = async () => {
		setIsLoading(true);
		const res = await db
			.insert(Expenses)
			.values({
				name: expenseName,
				amount: Number(expenseAmount),
				budgetId: budgetId,
			})
			.returning({
				insertedId: Expenses.id,
			});

		setExpenseName("");
		setExpenseAmount("");
		setIsLoading(false);
		if (res) {
			toast.success("Expense added successfully");
			refreshExpenses();
		} else {
			toast.error("Failed to add expense");
		}
	};

	return (
		<div className="p-4 rounded-md border border-slate-200">
			<h2 className="text-2xl font-bold">Add Expense</h2>

			<div className="mt-2">
				<h2 className="text-base font-medium text-slate-700">
					Expense Name
				</h2>
				<Input
					placeholder="e.g. Bedroom Light"
					value={expenseName}
					onChange={(e) => setExpenseName(e.target.value)}
					className="border border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md p-2"
				/>
			</div>

			<div className="mt-2">
				<h2 className="text-base font-medium text-slate-700">
					Expense Amount
				</h2>
				<Input
					placeholder="e.g. ₹ 100"
					value={expenseAmount}
					type="number"
					onChange={(e) => setExpenseAmount(e.target.value)}
					className="border border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md p-2"
				/>
			</div>

			<Button
				className="mt-4"
				disabled={!expenseName || !expenseAmount || isLoading}
				onClick={() => addExpense()}
			>
				{isLoading ? (
					<Loader2 className="w-4 h-4 mr-2 animate-spin" />
				) : (
					"Add Expense"
				)}
			</Button>
		</div>
	);
};

export default AddExpense;
