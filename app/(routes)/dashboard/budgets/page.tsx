import React from "react";
import BudgetList from "./_components/BudgetList";

const Budget = () => {
	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold mb-7">Budgets</h1>
			<BudgetList />
		</div>
	);
};

export default Budget;
