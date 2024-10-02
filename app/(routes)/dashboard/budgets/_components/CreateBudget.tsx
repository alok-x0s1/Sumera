"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import db from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CreateBudget = ({ refreshBudgets }: { refreshBudgets: () => void }) => {
	const [emojiIcon, setEmojiIcon] = useState<string>("🤔");
	const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
	const [budgetName, setBudgetName] = useState<string>("");
	const [budgetAmount, setBudgetAmount] = useState<string>("");

	const { user } = useUser();

	const handleCreateBudget = async () => {
		const res = await db
			.insert(Budgets)
			.values({
				name: budgetName,
				amount: parseInt(budgetAmount),
				icon: emojiIcon,
				createdBy: user?.primaryEmailAddress?.emailAddress || "",
			})
			.returning({ insertId: Budgets.id });

		if (res.length > 0) {
			refreshBudgets();
			toast.success("Budget created successfully");
		} else {
			toast.error("Failed to create budget");
		}
	};

	return (
		<div className="w-full">
			<Dialog>
				<DialogTrigger asChild className="w-full">
					<motion.div
						className="bg-slate-200 p-10 rounded-lg items-center flex flex-col border-2 border-dashed border-slate-400 text-slate-800 hover:shadow-lg cursor-pointer w-full"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<h2 className="text-5xl font-bold">+</h2>
						<h2 className="text-xl font-medium">Create Budget</h2>
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
								Create New Budget
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

									<div>
										<h2 className="text-base font-medium text-slate-700">
											Budget Amount
										</h2>
										<Input
											type="number"
											placeholder="e.g. ₹ 100"
											value={budgetAmount}
											onChange={(e) =>
												setBudgetAmount(e.target.value)
											}
											className="border border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md p-2"
										/>
									</div>
								</div>
							</DialogDescription>
						</DialogHeader>

						<DialogFooter className="sm:justify-start">
							<DialogClose asChild>
								<Button
									className="mt-4 bg-slate-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-slate-600 transition duration-300 ease-in-out"
									type="submit"
									disabled={!budgetName || !budgetAmount}
									onClick={handleCreateBudget}
								>
									Create Budget
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</motion.div>
			</Dialog>
		</div>
	);
};

export default CreateBudget;
