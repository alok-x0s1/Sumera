"use client";

import React from "react";
import { motion } from "framer-motion";
import {
	ChartBar,
	ChartColumnDecreasing,
	ChartLine,
	File,
	MountainSnow,
	UserCogIcon,
} from "lucide-react";

const featuresData = [
	{
		title: "Real-Time Analytics",
		description: "Track your users in real-time with accurate insights.",
		icon: <ChartLine className="text-chart-1 text-5xl" />,
	},
	{
		title: "Advanced Segmentation",
		description: "Segment users based on behavior and demographics.",
		icon: <UserCogIcon className="text-chart-2 text-5xl" />,
	},
	{
		title: "Custom Reports",
		description: "Generate comprehensive reports tailored to your needs.",
		icon: <File className="text-chart-3 text-5xl" />,
	},
	{
		title: "User-Centric Design",
		description: "Design your user experience with accurate insights.",
		icon: <ChartColumnDecreasing className="text-chart-1 text-5xl" />,
	},
	{
		title: "Advanced Design",
		description: "Design your user experience with accurate insights.",
		icon: <MountainSnow className="text-chart-1 text-5xl" />,
	},
];

const Featured = () => (
	<section className="bg-gradient-to-b from-card via-muted/30 to-card py-20">
		<div className="max-w-screen-xl mx-auto px-6">
			<motion.h2
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-4xl font-extrabold text-center text-primary mb-12"
			>
				Key Features
			</motion.h2>

			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3"
			>
				{featuresData.map((feature, idx) => (
					<motion.div
						key={idx}
						variants={{
							hidden: { opacity: 0, y: 50 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.7, delay: idx * 0.2 }}
						whileHover={{ scale: 1.05 }}
						className="relative group p-8 rounded-3xl bg-gradient-to-br from-muted via-muted/50 to-card shadow-lg hover:shadow-xl duration-300"
					>
						<div className="flex justify-center mb-6">
							{feature.icon}
						</div>
						<h3 className="text-2xl font-bold text-center text-primary group-hover:text-chart-1 transition duration-300">
							{feature.title}
						</h3>
						<p className="mt-4 text-lg text-center text-muted-foreground">
							{feature.description}
						</p>

						{/* Decorative Gradient Ring */}
						<div className="absolute -top-8 -left-8 h-32 w-32 bg-gradient-to-tr from-chart-2 to-chart-3 opacity-20 rounded-full blur-xl group-hover:blur-2xl transition duration-500 ease-in-out" />
					</motion.div>
				))}
			</motion.div>
		</div>
	</section>
);

export default Featured;
