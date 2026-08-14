"use client";
import {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/data-store/actions/authActions";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";




//    Thiyaguu update the entire code (below full code )------------->>>>>>>>>>>>>>>>>
const Navbar = () => {
	
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const handleLogout = () => {
		dispatch(logout());
		setIsProfileOpen(false);
		router.push("/login");
	};

	return (
		<>
			<nav
			  className="navbar px-5 md:px-8 w-screen fixed backdrop-filter backdrop-blur-md bg-opacity-50 inset-0 flex flex-row justify-between items-center h-16 z-50" 	
			>
				{/* Logo */}
				<div>
					<Link href="/">
						<Image src="/logo/logo.png" alt="Abimanya Doors" width={150} height={60}  priority/>
					</Link>
				</div>

				{/* Right Side */}
				<div className="flex flex-row items-center gap-2">

					{/* ================= PROFILE ================= */}
					{user && (
						<div className="relative">
							<button type="button" onClick={() => setIsProfileOpen(!isProfileOpen)}
								className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-md hover:shadow-lg transition "
							>
								{/* Avatar */}
								<div className="w-10 h-10 rounded-full bg-lime-600 text-white flex items-center justify-center font-bold text-lg">
									{user.name?.charAt(0).toUpperCase()}
								</div>
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
										className="w-full flex items-center gap-4 px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition">
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
				</div>
			</nav>
		</>
	);
};
export default Navbar;