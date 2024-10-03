"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Twitch } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-primary text-white py-16">
			<div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex flex-col gap-4"
				>
					<h2 className="text-3xl font-extrabold">Sumera</h2>
					<p className="text-sm text-muted-foreground">
						Empowering your business with real-time analytics and
						custom reports.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h3 className="text-xl font-semibold mb-6">Quick Links</h3>
					<nav className="flex flex-col gap-3">
						<Link href="/" className="hover:text-chart-1">
							Home
						</Link>
						<Link href="/about" className="hover:text-chart-1">
							About Us
						</Link>
						<Link href="/features" className="hover:text-chart-1">
							Features
						</Link>
						<Link href="/contact" className="hover:text-chart-1">
							Contact
						</Link>
					</nav>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<h3 className="text-xl font-semibold mb-6">Resources</h3>
					<nav className="flex flex-col gap-3">
						<Link href="/blog" className="hover:text-chart-1">
							Blog
						</Link>
						<Link href="/help" className="hover:text-chart-1">
							Help Center
						</Link>
						<Link href="/pricing" className="hover:text-chart-1">
							Pricing
						</Link>
						<Link href="/terms" className="hover:text-chart-1">
							Terms & Conditions
						</Link>
					</nav>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<h3 className="text-xl font-semibold mb-6">Follow Us</h3>
					<div className="flex gap-4 mb-6">
						<Link href="https://facebook.com" target="_blank">
							<Facebook className="w-8 h-8 p-2 rounded-full bg-white text-primary hover:bg-chart-1 hover:text-white transition duration-300 ease-in-out" />
						</Link>
						<Link href="https://twitter.com" target="_blank">
							<Twitch className="w-8 h-8 p-2 rounded-full bg-white text-primary hover:bg-chart-1 hover:text-white transition duration-300 ease-in-out" />
						</Link>
						<Link href="https://linkedin.com" target="_blank">
							<Linkedin className="w-8 h-8 p-2 rounded-full bg-white text-primary hover:bg-chart-1 hover:text-white transition duration-300 ease-in-out" />
						</Link>
						<Link href="https://github.com" target="_blank">
							<Github className="w-8 h-8 p-2 rounded-full bg-white text-primary hover:bg-chart-1 hover:text-white transition duration-300 ease-in-out" />
						</Link>
					</div>
					<p className="text-sm text-muted-foreground">
						Email: support@sumera.com
					</p>
					<p className="text-sm text-muted-foreground">
						Phone: +1 (123) 456-7890
					</p>
				</motion.div>
			</div>

			<div className="border-t border-white/20 mt-12 pt-8">
				<div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 1 }}
						className="text-sm text-muted-foreground"
					>
						&copy; {new Date().getFullYear()} Sumera. All rights
						reserved.
					</motion.p>
					<motion.nav
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 1.2 }}
						className="flex gap-4 text-sm"
					>
						<Link
							href="/privacy-policy"
							className="hover:text-chart-1"
						>
							Privacy Policy
						</Link>
						<Link
							href="/cookie-policy"
							className="hover:text-chart-1"
						>
							Cookie Policy
						</Link>
						<Link href="/terms" className="hover:text-chart-1">
							Terms of Service
						</Link>
					</motion.nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
