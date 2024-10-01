import React from "react";
import { BudgetType } from "../budgets/_components/BudgetList";
import {
	Bar,
	BarChart as RechartsBarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface BarChartProps {
	budgets: BudgetType[];
}

const BarChart = ({ budgets }: BarChartProps) => {
	return (
		<div className="border border-border rounded-md p-6 bg-card shadow-sm">
			<h2 className="text-xl font-semibold text-foreground mb-4">
				Spending Activity
			</h2>
			<ResponsiveContainer width="100%" height={350}>
				<RechartsBarChart data={budgets}>
					<XAxis dataKey="name" stroke="#c4c4c4" />
					<YAxis stroke="#c4c4c4" />
					<Tooltip
						contentStyle={{
							backgroundColor: "#333",
							borderRadius: "8px",
							border: "none",
						}}
						labelStyle={{ color: "#fff" }}
						itemStyle={{ color: "#ddd" }}
					/>
					<Legend />
					<Bar
						dataKey="totalSpend"
						stackId="a"
						fill="#8884d8"
						radius={[10, 10, 0, 0]}
					/>
					<Bar
						dataKey="amount"
						stackId="a"
						fill="#ffc658"
						radius={[10, 10, 0, 0]}
					/>
				</RechartsBarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default BarChart;
