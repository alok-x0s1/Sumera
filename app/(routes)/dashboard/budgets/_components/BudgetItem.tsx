import React from "react";
import Link from "next/link";
import { BudgetType } from "./BudgetList";

const BudgetItem = ({ budget }: { budget: BudgetType }) => {
	const calculatePercentage = () => {
		if (budget.totalSpend && budget.amount > 0) {
			const percentage = (budget.totalSpend / budget.amount) * 100;
			return Math.min(percentage, 100).toFixed(2);
		}
		return "0";
	};

	return (
		<Link href={`/dashboard/expenses/${budget.id}`} passHref>
			<article className="border border-slate-200 rounded-md p-5 hover:shadow-lg hover:border-slate-300 cursor-pointer transition duration-200 h-fit w-full bg-card mb-4">
				<div className="flex justify-between gap-2 items-center">
					<div className="flex items-center gap-3 w-full">
						<div className="bg-slate-100 shadow-sm rounded-full p-3 border border-slate-200 text-foreground">
							{budget.icon}
						</div>
						<div>
							<h2 className="text-lg font-bold text-foreground">
								{budget.name}
							</h2>
							<p className="text-sm text-chart-3">
								{budget.totalItems} items
							</p>
						</div>
					</div>
					<h2 className="text-2xl font-bold text-chart-1 flex items-center gap-1">
						<span>&#8377;</span> {budget.amount.toLocaleString()}
					</h2>
				</div>

				<div className="mt-6">
					<div className="flex justify-between items-center mb-3 text-sm">
						<span className="text-chart-3">
							&#8377;{" "}
							{budget.totalSpend
								? budget.totalSpend.toLocaleString()
								: "0"}{" "}
							spent
						</span>
						<span className="text-chart-2">
							&#8377;{" "}
							{(
								budget.amount - (budget.totalSpend || 0)
							).toLocaleString()}{" "}
							remaining
						</span>
					</div>
				</div>

				<div className="w-full bg-slate-300 h-2 rounded-full overflow-hidden">
					<div
						className="h-full bg-chart-1 rounded-full transition-all"
						style={{ width: `${calculatePercentage()}%` }}
					></div>
				</div>
			</article>
		</Link>
	);
};

export default BudgetItem;
