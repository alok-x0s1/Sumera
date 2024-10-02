"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { BudgetType } from "../../budgets/_components/BudgetList";
import db from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { Budgets } from "@/utils/schema";

const EditBudget = ({
	budget,
	refreshBudgets,
}: {
	budget: BudgetType | null;
	refreshBudgets: () => void;
}) => {
	const [open, setOpen] = useState(false);
	const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
	const [emojiIcon, setEmojiIcon] = useState(budget?.icon);
	const [budgetName, setBudgetName] = useState(budget?.name);
	const [budgetAmount, setBudgetAmount] = useState(budget?.amount);

	const handleUpdateBudget = async () => {
		const res = await db
			.update(Budgets)
			.set({
				icon: emojiIcon,
				name: budgetName,
				amount: budgetAmount,
			})
			.where(eq(Budgets.id, budget?.id as number))
			.returning();

		if (res) {
			refreshBudgets();
			toast("Budget updated successfully.");
			setOpen(false); // Close the dialog after successful update
		}
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setOpen(true)} 
					>
						<Button className="flex items-center gap-2">
							<PenBox /> Edit
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
								Update Budget
							</DialogTitle>
							<DialogDescription>
								<div className="mt-5 space-y-4">
									<div>
										<Button
											variant="outline"
											className="text-lg border-2 border-slate-300"
											onClick={() =>
												setEmojiPickerOpen(
													!emojiPickerOpen
												)
											}
										>
											{emojiIcon}
										</Button>
										<div
											className={`absolute mt-4 z-20 ${
												emojiPickerOpen
													? "block"
													: "hidden"
											}`}
										>
											<EmojiPicker
												onEmojiClick={(emojiData) => {
													setEmojiIcon(
														emojiData.emoji
													);
													setEmojiPickerOpen(false);
												}}
											/>
										</div>
									</div>

									{/* Budget Name Input */}
									<div>
										<h2 className="text-base font-medium text-slate-700">
											Budget Name
										</h2>
										<Input
											placeholder="e.g. Groceries | Rent | Bills"
											value={budgetName}
											onChange={(e) =>
												setBudgetName(e.target.value)
											}
											className="border border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md p-2"
										/>
									</div>

									{/* Budget Amount Input */}
									<div>
										<h2 className="text-base font-medium text-slate-700">
											Budget Amount
										</h2>
										<Input
											type="number"
											placeholder="e.g. ₹ 100"
											value={budgetAmount}
											onChange={(e) =>
												setBudgetAmount(
													Number(e.target.value)
												)
											}
											className="border border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md p-2"
										/>
									</div>
								</div>
							</DialogDescription>
						</DialogHeader>

						<DialogFooter className="sm:justify-start">
							<Button
								className="mt-4 bg-slate-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-slate-600 transition duration-300 ease-in-out"
								type="submit"
								disabled={!budgetName || !budgetAmount}
								onClick={handleUpdateBudget}
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

export default EditBudget;
