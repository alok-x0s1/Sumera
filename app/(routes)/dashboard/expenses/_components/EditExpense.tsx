import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import { motion } from "framer-motion";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
	Dialog,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import db from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { ExpenseType } from "./ExpenseListTable";

const EditExpense = ({
	expense,
	refreshExpenses,
}: {
	expense: ExpenseType | null;
	refreshExpenses: () => void;
}) => {
	const [open, setOpen] = useState(false);
	const [expenseName, setExpenseName] = useState(expense?.name);
	const [expenseAmount, setExpenseAmount] = useState(expense?.amount);

	const handleUpdateExpense = async () => {
		const res = await db
			.update(Expenses)
			.set({ name: expenseName, amount: expenseAmount })
			.where(eq(Expenses.id, expense?.id as number))
			.returning();

		if (res) {
			refreshExpenses();
			toast("Expense updated successfully.");
			setOpen(false);
		}
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<motion.div
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						onClick={() => setOpen(true)}
					>
						<Button
							className="flex items-center gap-2 bg-slate-500/20 hover:bg-slate-500/30"
							size="sm"
							variant="ghost"
						>
							<PenBox size={16} /> Edit
						</Button>
					</motion.div>
				</DialogTrigger>

				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{ duration: 0.3 }}
				>
					<DialogContent className="bg-slate-50 shadow-md rounded-xl border border-slate-200 p-6">
						<DialogHeader>
							<DialogTitle className="text-xl font-semibold text-slate-900">
								Update Expense
							</DialogTitle>
							<DialogDescription>
								<div>
									<h2 className="text-base font-medium text-slate-700">
										Expense Name
									</h2>
									<Input
										placeholder="e.g. Groceries | Rent | Bills"
										value={expenseName}
										onChange={(e) =>
											setExpenseName(e.target.value)
										}
										className="border border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md p-2"
									/>
								</div>

								<div>
									<h2 className="text-base font-medium text-slate-700">
										Expense Amount
									</h2>
									<Input
										type="number"
										placeholder="e.g. ₹ 100"
										value={expenseAmount}
										onChange={(e) =>
											setExpenseAmount(
												Number(e.target.value)
											)
										}
										className="border border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md p-2"
									/>
								</div>
							</DialogDescription>
						</DialogHeader>

						<DialogFooter className="sm:justify-start">
							<Button
								className="mt-4 bg-slate-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-slate-600 transition duration-300 ease-in-out"
								type="submit"
								disabled={!expenseName || !expenseAmount}
								onClick={handleUpdateExpense}
							>
								Update
							</Button>
						</DialogFooter>
					</DialogContent>
				</motion.div>
			</Dialog>
		</div>
	);
};

export default EditExpense;
