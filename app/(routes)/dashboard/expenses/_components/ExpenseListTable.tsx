"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";
import db from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import EditExpense from "./EditExpense";

export interface ExpenseType {
	id: number;
	name: string;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
	budgetId: number;
}

const ExpenseListTable = ({
	expenseList,
	RefreshData,
}: {
	expenseList: ExpenseType[];
	RefreshData: () => void;
}) => {
	const deleteExpense = async (id: number) => {
		const res = await db
			.delete(Expenses)
			.where(eq(Expenses.id, id))
			.returning();

		if (res) {
			toast.success("Expense deleted successfully.");
			RefreshData();
		}
	};

	return (
		<motion.div
			className="mt-8 rounded-xl border border-border bg-card shadow-lg overflow-hidden"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-muted">
					<thead className="bg-muted/50">
						<tr>
							<th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
								Name
							</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
								Amount
							</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
								Created At
							</th>
							<th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
								Actions
							</th>
						</tr>
					</thead>

					{/* Table Body */}
					<tbody className="divide-y divide-border">
						{expenseList &&
							expenseList.map((expense, index) => (
								<motion.tr
									key={expense.id}
									className="hover:bg-accent/50 transition-colors duration-200"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										delay: index * 0.05,
										duration: 0.4,
									}}
								>
									<td className="px-6 py-4 text-sm text-foreground/90 whitespace-nowrap">
										{expense.name}
									</td>
									<td className="px-6 py-4 text-sm text-foreground/90 whitespace-nowrap">
										&#8377;{" "}
										{expense.amount.toLocaleString()}
									</td>
									<td className="px-6 py-4 text-sm text-foreground/70 whitespace-nowrap">
										{expense.createdAt
											? expense.createdAt.toLocaleDateString()
											: "N/A"}
									</td>
									<td className="px-6 py-4 flex justify-center gap-2 whitespace-nowrap">
										<EditExpense
											expense={expense}
											refreshExpenses={RefreshData}
										/>
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												deleteExpense(expense.id)
											}
											className="text-red-600 hover:text-red-700 flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30"
										>
											<Trash size={16} /> Delete
										</Button>
									</td>
								</motion.tr>
							))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default ExpenseListTable;
