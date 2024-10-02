"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PricingTable = () => {
	const [isAnnual, setIsAnnual] = useState(true);

	return (
		<div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
			<div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
				<div className="relative flex w-full p-2 rounded-full bg-gray-200 border border-gray-300 shadow-sm shadow-gray-300">
					<span className="absolute inset-0 m-1 pointer-events-none">
						<motion.span
							className="absolute inset-0 w-1/2 bg-chart-1 rounded-full shadow-sm shadow-indigo-950/10"
							animate={{ x: isAnnual ? 0 : "100%" }}
							transition={{ duration: 0.15 }}
						/>
					</span>
					<button
						className={`relative flex-1 text-sm font-medium h-8 rounded-full transition-colors duration-150 ease-in-out ${
							isAnnual ? "text-white" : ""
						}`}
						onClick={() => setIsAnnual(true)}
						aria-pressed={isAnnual}
					>
						Yearly{" "}
						<span
							className={`${
								isAnnual ? "text-chart-3" : "text-gray-500"
							}`}
						>
							-20%
						</span>
					</button>
					<button
						className={`relative flex-1 text-sm font-medium h-8 rounded-full transition-colors duration-150 ease-in-out ${
							!isAnnual ? "text-white" : "text-slate-500"
						}`}
						onClick={() => setIsAnnual(false)}
						aria-pressed={!isAnnual}
					>
						Monthly
					</button>
				</div>
			</div>

			<div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
				{["Essential", "Perform", "Enterprise"].map((plan, index) => {
					const prices = [29, 49, 79];
					return (
						<motion.div
							key={plan}
							className="h-full"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
								<div className="mb-5">
									<div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">
										{plan}
									</div>
									<div className="inline-flex items-baseline mb-2">
										<span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">
											$
										</span>
										<span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">
											{isAnnual
												? prices[index]
												: prices[index] + 6}
										</span>
										<span className="text-slate-500 font-medium">
											/mo
										</span>
									</div>
									<div className="text-sm text-slate-500 mb-5">
										There are many variations available, but
										the majority have suffered.
									</div>
									<a
										className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-chart-1 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-chart-2 transition-colors duration-300"
										href="#0"
									>
										Purchase Plan
									</a>
								</div>
								<div className="text-slate-900 dark:text-slate-200 font-medium mb-3">
									Includes:
								</div>
								<ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
									<li className="flex items-center">
										<svg
											className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
											viewBox="0 0 12 12"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
										</svg>
										<span>Unlimited placeholder texts</span>
									</li>
									<li className="flex items-center">
										<svg
											className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
											viewBox="0 0 12 12"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
										</svg>
										<span>Consectetur adipiscing elit</span>
									</li>
									<li className="flex items-center">
										<svg
											className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
											viewBox="0 0 12 12"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
										</svg>
										<span>
											Excepteur sint occaecat cupidatat
										</span>
									</li>
									<li className="flex items-center">
										<svg
											className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
											viewBox="0 0 12 12"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
										</svg>
										<span>
											Officia deserunt mollit anim
										</span>
									</li>
								</ul>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default PricingTable;
