"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NotFound = () => {
	return (
		<motion.div
			className="flex flex-col items-center justify-center h-screen bg-muted text-primary px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<motion.h1
				className="text-9xl font-extrabold mb-4"
				initial={{ y: -50 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				404
			</motion.h1>
			<motion.p
				className="text-2xl font-semibold text-center mb-4"
				initial={{ y: 20 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				Oops! Page Not Found
			</motion.p>
			<motion.p
				className="text-lg text-muted-foreground text-center mb-8"
				initial={{ y: 20 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}
			>
				The page you are looking for might have been removed or is
				temporarily unavailable.
			</motion.p>
			<Link
				href="/"
				className="mt-4 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-chart-1 rounded-md shadow-md hover:bg-chart-1/80 transition duration-300 ease-in-out"
			>
				Go Back Home
			</Link>
		</motion.div>
	);
};

export default NotFound;
