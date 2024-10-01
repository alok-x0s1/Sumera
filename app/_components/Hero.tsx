"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

const Hero = () => {
	const { isSignedIn } = useUser();
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
			className="flex items-center flex-col p-8"
		>
			<div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-[80vh] lg:items-center">
				<div className="mx-auto max-w-6xl text-center">
					<motion.h1
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.7, ease: "easeOut" }}
						className="text-4xl font-bold sm:text-6xl text-primary"
					>
						Take Control of Your Finances.
						<strong className="font-bold text-chart-1 sm:block">
							{" "}
							Track Expenses. Set Budgets. Save Smarter.
						</strong>
					</motion.h1>

					<motion.p
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="mt-4 text-lg sm:text-xl text-primary"
					>
						Our personal finance app helps you keep track of your
						spending, manage budgets, and achieve your financial
						goals effortlessly. Get insights that help you save more
						and spend less.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.9, ease: "easeOut" }}
						className="mt-8 flex flex-wrap justify-center gap-4"
					>
						<Link
							className="block w-full rounded bg-chart-1 px-12 py-3 text-sm font-medium text-white shadow-lg hover:bg-chart-1/75 focus:outline-none focus:ring active:bg-chart-1 sm:w-auto transition duration-300 ease-in-out"
							href="/sign-in"
						>
							Get Started
						</Link>

						{!isSignedIn ? (
							<Link
								className="block w-full rounded px-12 py-3 text-sm font-medium text-chart-1 border-2 border-chart-1 shadow-lg hover:bg-chart-1 hover:text-white focus:outline-none focus:ring active:bg-chart-1 sm:w-auto transition duration-300 ease-in-out"
								href="#"
							>
								Learn More
							</Link>
						) : (
							<Link
								className="block w-full rounded px-12 py-3 text-sm font-medium text-chart-1 border-2 border-chart-1 shadow-lg hover:bg-chart-1 hover:text-white focus:outline-none focus:ring active:bg-chart-1 sm:w-auto transition duration-300 ease-in-out"
								href="/dashboard"
							>
								Dashboard
							</Link>
						)}
					</motion.div>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut" }}
			>
				<Image
					src="/dashboard.png"
					alt="Finance dashboard image"
					width={1000}
					height={500}
					className="rounded-xl border-2 shadow-lg transition transform hover:scale-105 duration-300 ease-in-out"
				/>
			</motion.div>
		</motion.section>
	);
};

export default Hero;
