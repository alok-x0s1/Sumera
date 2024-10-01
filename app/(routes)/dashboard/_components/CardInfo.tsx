import React from "react";
import { BudgetType } from "../budgets/_components/BudgetList";
import { PiggyBankIcon, ReceiptIcon, Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface CardInfoProps {
	budgets: BudgetType[] | null;
}

const CardInfo = ({ budgets }: CardInfoProps) => {
	// Skeleton loader to show placeholders while data is loading
	const skeletonLoader = (
		<div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{Array.from({ length: 3 }).map((_, index) => (
				<div
					key={index}
					className="p-7 border border-muted rounded-md bg-card animate-pulse flex justify-between items-center"
				>
					<div>
						<div className="h-5 w-24 bg-muted rounded-md mb-2"></div>
						<div className="h-8 w-36 bg-muted rounded-md"></div>
					</div>
					<div className="h-12 w-12 bg-muted rounded-full"></div>
				</div>
			))}
		</div>
	);

	return (
		<div>
			{budgets ? (
				<motion.div
					className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ staggerChildren: 0.1 }}
				>
					{/* Card 1: Total Budget */}
					<motion.div
						className="p-7 border border-border rounded-md flex justify-between items-center bg-card hover:shadow-lg transition-all duration-300"
						whileHover={{ scale: 1.05 }}
					>
						<div>
							<h2 className="text-sm font-semibold text-chart-1">
								Total Budget
							</h2>
							<h2 className="text-3xl font-bold text-foreground">
								&#8377;{" "}
								{budgets.reduce(
									(acc, budget) => acc + (budget.amount || 0),
									0
								)}
							</h2>
						</div>
						<PiggyBankIcon className="p-3 h-12 w-12 text-white bg-chart-1 rounded-full" />
					</motion.div>

					{/* Card 2: Total Spend */}
					<motion.div
						className="p-7 border border-border rounded-md flex justify-between items-center bg-card hover:shadow-lg transition-all duration-300"
						whileHover={{ scale: 1.05 }}
					>
						<div>
							<h2 className="text-sm font-semibold text-chart-2">
								Total Spend
							</h2>
							<h2 className="text-3xl font-bold text-foreground">
								&#8377;{" "}
								{budgets.reduce(
									(acc, budget) =>
										acc + (budget.totalSpend || 0),
									0
								)}
							</h2>
						</div>
						<ReceiptIcon className="p-3 h-12 w-12 text-white bg-chart-2 rounded-full " />
					</motion.div>

					{/* Card 3: No. of Items */}
					<motion.div
						className="p-7 border border-border rounded-md flex justify-between items-center bg-card hover:shadow-lg transition-all duration-300"
						whileHover={{ scale: 1.05 }}
					>
						<div>
							<h2 className="text-sm font-semibold text-chart-1">
								No. of Items
							</h2>
							<h2 className="text-3xl font-bold text-foreground">
								{budgets.reduce(
									(acc, budget) =>
										acc + (budget.totalItems || 0),
									0
								)}
							</h2>
						</div>
						<Wallet className="p-3 h-12 w-12 text-white bg-chart-1 rounded-full" />
					</motion.div>
				</motion.div>
			) : (
				skeletonLoader
			)}
		</div>
	);
};

export default CardInfo;
