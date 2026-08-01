"use client";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/data-store/actions/authActions";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const navVariant = {
	open: {
		clipPath: "circle(2000px at calc(100% - 40px) 40px)",
		transition: {
			type: "tween",
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	closed: {
		clipPath: "circle(0px at calc(100% - 40px) 40px)",
		transition: {
			delay: 0.3,
			type: "tween",
			duration: 0.3,
			ease: [0.4, 0, 1, 1],
		},
	},
};

const itemVariants = {
	open: (custom) => ({
		opacity: 1,
		x: 0,
		transition: {
			delay: custom,
			type: "tween",
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
	closed: {
		opacity: 0,
		x: -80,
		transition: {
			type: "tween",
			duration: 0.2,
		},
	},
};

const NavItems = ({ isNavOpen, setIsNavOpen }) => {
	const handleItemClick = () => {
		setIsNavOpen(false);
	};


	return (
		<>
			<motion.div
				className={`fixed z-[45] w-full h-screen flex items-center justify-center overflow-hidden`}
				variants={navVariant}
				animate={isNavOpen ? "open" : "closed"}
				initial={false}>
				<div className="relative opacity-95 flex flex-col items-center space-x-8 min-h-[100vh] bg-gray-700 min-w-[100vw] ">
					<div className="flex flex-col items-center space-y-8 my-auto mx-0 z-50">
						{/* title */}
						<motion.h1
							variants={itemVariants}
							animate={isNavOpen ? "open" : "closed"}
							className="text-6xl font-bold text-white ">
							Menu
						</motion.h1>
						<Link href="/#home">
							<div
								className="text-2xl font-bold text-white"
								onClick={handleItemClick}>
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.1}>
									Home
								</motion.h2>
							</div>
						</Link>
						<Link href="/about">
							<div
								onClick={handleItemClick}
								className="text-2xl font-bold text-white">
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.2}>
									About
								</motion.h2>
							</div>
						</Link>
						<Link href="/projects">
							<div
								onClick={handleItemClick}
								className="text-2xl font-bold text-white">
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.3}>
									Projects
								</motion.h2>
							</div>
						</Link>
						<Link href="/#contact">
							<div
								onClick={handleItemClick}
								className="text-2xl font-bold text-white">
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.4}>
									Contact
								</motion.h2>
							</div>
						</Link>

						<Link href="/login">
							<div
								onClick={handleItemClick}
								className="text-2xl font-bold text-white">
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.4}>
									login
								</motion.h2>
							</div>
						</Link>
					</div>
				</div>
			</motion.div>
		</>
	);
};
//    Thiyaguu update the entire code (below full code )------------->>>>>>>>>>>>>>>>>
const Navbar = () => {
	const navRef = useRef(null);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const router = useRouter();

	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth.user);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	const handleLogout = () => {
		dispatch(logout());
		setIsProfileOpen(false);
		router.push("/login");
	};

	return (
		<>
			<nav
				ref={navRef}
				className={`navbar px-5 md:px-24 w-screen fixed transition-colors ease duration-500 ${isNavOpen
					? "backdrop-filter backdrop-blur-md bg-gray-700 bg-opacity-50"
					: "backdrop-filter backdrop-blur-md"
					} inset-0 bg-opacity-50 flex flex-row justify-between items-center h-16 z-50`}
			>
				{/* Logo */}
				<div className="ml-2 md:ml-0">
					<Link href="/">
						<Image
							src="/logo/logo.png"
							alt="Abimanya Doors"
							width={170}
							height={60}
							priority
						/>
					</Link>
				</div>

				{/* Right Side */}
				<div className="flex flex-row items-center gap-2">

					{/* ================= PROFILE ================= */}
					{user && (
						<div className="relative">

							<button
								type="button"
								onClick={() =>
									setIsProfileOpen(!isProfileOpen)
								}
								className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-md hover:shadow-lg transition "
							>
								{/* Avatar */}
								<div className="w-10 h-10 rounded-full bg-lime-600 text-white flex items-center justify-center font-bold text-lg">
									{user.name?.charAt(0).toUpperCase()}
								</div>

								{/* User Info */}
								{/* <div className="hidden md:block text-left">
									<p className="text-sm font-semibold text-gray-800">
										{user.name}
									</p>

									<p className="text-xs text-gray-500 capitalize">
										{user.role}
									</p>
								</div> */}
							</button>

							{/* ================= DROPDOWN ================= */}

							{isProfileOpen && (
								<div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

									{/* User Info */}
									<div className="px-4 py-4 flex items-center gap-3">

										{/* Avatar */}
										<div className="w-12 h-12 rounded-full bg-lime-600 text-white flex items-center justify-center text-lg font-semibold shrink-0">
											{user.name?.charAt(0).toUpperCase()}
										</div>

										{/* Name + Email */}
										<div className="min-w-0">
											<p className="text-sm font-semibold text-gray-800">
												{user.name}
											</p>

											<p className="text-xs text-gray-500 truncate">
												{user.email}
											</p>

											<span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold text-lime-700 bg-lime-100 rounded-full">
												{user.role?.toUpperCase() || "USER"}
											</span>
										</div>

									</div>

									{/* Divider */}
									<div className="border-t border-gray-100" />

									{/* My Profile */}
									<button
										type="button"
										className="w-full flex items-center gap-4 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
									>
										<svg
											className="w-5 h-5 text-gray-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											strokeWidth="1.8"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 19a6 6 0 00-12 0M9 11a4 4 0 100-8 4 4 0 000 8zm6-3h6m-3-3v6"
											/>
										</svg>

										<span>My Profile</span>
									</button>

									{/* Settings */}
									<button
										type="button"
										className="w-full flex items-center gap-4 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
									>
										<SlidersHorizontal
											size={19}
											strokeWidth={1.8}
											className="text-gray-600"
										/>

										<span>Settings</span>
									</button>

									{/* Divider */}
									<div className="border-t border-gray-100" />

									{/* Logout */}
									<button
										type="button"
										onClick={handleLogout}
										className="w-full flex items-center gap-4 px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition"
									>
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											strokeWidth="1.8"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M10 17l5-5-5-5"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 12H3"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M21 4v16"
											/>
										</svg>

										<span>Logout</span>
									</button>

								</div>
							)}

						</div>
					)}

					{/* ================= BURGER ================= */}
					<button
						type="button"
						aria-label={
							isNavOpen
								? "Close menu"
								: "Open menu"
						}
						className="burger button flex flex-col justify-center items-center space-y-1.5"
						onClick={toggleNav}
					>
						<div
							className={`w-10 h-1 bg-black rounded-full transition-all ease duration-300 ${isNavOpen
								? "rotate-45 bg-white translate-y-[2px]"
								: ""
								}`}
						></div>

						<div
							className={`w-10 h-1 bg-black rounded-full transition-all ease duration-300 ${isNavOpen
								? "-rotate-45 -translate-y-2 bg-white"
								: ""
								}`}
						></div>
					</button>

				</div>
			</nav>

			{/* Navigation Menu */}
			<NavItems
				isNavOpen={isNavOpen}
				setIsNavOpen={setIsNavOpen}
			/>
		</>
	);
};

export default Navbar;