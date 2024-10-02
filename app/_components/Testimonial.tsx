"use client";

import { motion } from "framer-motion";
import { UserIcon } from "lucide-react";

const testimonialsData = [
	{
		name: "John Doe",
		review: "This tool has completely transformed the way we understand our customers.",
		icon: <UserIcon className="w-5 h-5" />,
		position: "Product Manager",
	},
	{
		name: "Jane Smith",
		review: "Easy to use and provides amazing insights.",
		icon: <UserIcon className="w-5 h-5" />,
		position: "Marketing Specialist",
	},
	{
		name: "Robert Brown",
		review: "Highly recommended! It helped boost our user engagement significantly.",
		icon: <UserIcon className="w-5 h-5" />,
		position: "CEO, TechFirm",
	},
	{
		name: "Emily White",
		review: "Fantastic customer support and intuitive features. Love using it!",
		icon: <UserIcon className="w-5 h-5" />,
		position: "UX Designer",
	},
];

const Testimonials = () => (
	<section className="py-20">
		<div className="max-w-screen-xl mx-auto px-6">
			<motion.h2
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-4xl font-extrabold text-center text-primary mb-12"
			>
				What Our Users Say
			</motion.h2>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
			>
				{testimonialsData.map((testimonial, idx) => (
					<motion.div
						key={idx}
						variants={{
							hidden: { opacity: 0, y: 50 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.7, delay: idx * 0.2 }}
						whileHover={{ scale: 1.05 }}
						className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out relative h-72"
					>
						<div className="flex flex-col items-center text-center gap-1">
							<div className="relative mb-4">
								{testimonial.icon}
								<div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-chart-2/40 to-chart-3/20 blur-lg -z-10" />
							</div>
							<h3 className="text-xl font-semibold text-chart-1">
								{testimonial.name}
							</h3>
							<p className="mt-1 text-sm text-chart-2 italic">
								{testimonial.position}
							</p>
							<p className="mt-4 text-xl text-muted-foreground">
								&ldquo;{testimonial.review}&rdquo;
							</p>
						</div>
						<div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tr from-chart-2 to-chart-1 opacity-10 rounded-full blur-3xl transform translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition duration-500" />
					</motion.div>
				))}
			</motion.div>
		</div>
	</section>
);

export default Testimonials;
