

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FullPageWrapper, Section, useFullPage } from "@alvalens/react-fullpage-snap";

// components

import Me from "@/public/image/door.webp";



function ScrollIndicator() {
	const { activeIndex } = useFullPage();
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		if (activeIndex !== 0) setDismissed(true);
	}, [activeIndex]);

// 	return (
// 		<AnimatePresence>
// 			{activeIndex === 0 && !dismissed && (
// 				<motion.div
// 					className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1, transition: { duration: 0.6, delay: 1.2 } }}
// 					exit={{ opacity: 0, transition: { duration: 0.4 } }}>
// 					<span className="text-[10px] uppercase tracking-[4px] text-gray-500 font-medium">
// 						Scroll
// 					</span>
// 					<motion.div
// 						className="w-[1.5px] h-14 bg-gray-500 origin-top"
// 						animate={{
// 							scaleY: [0, 1, 1],
// 							opacity: [0, 1, 0],
// 						}}
// 						transition={{
// 							duration: 2,
// 							repeat: Infinity,
// 							ease: "easeInOut",
// 							times: [0, 0.5, 1],
// 						}}
// 					/>
// 				</motion.div>
// 			)}
// 		</AnimatePresence>
// 	);
 }

const MyPage = () => {
	return (
		<FullPageWrapper>
			                                      {/* For Home page */}
			<Section>
				<div className="mx-auto w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 p-10 overflow-hidden">
					<motion.div
						className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							type: "spring",
						}}>
						
						<motion.h3
							className="uppercase text-4xl mb-3 font-bold text tracking-[.5rem] text-[#79c154]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								type: "spring",
							}}>
							Abimanaya  Doors
						</motion.h3>
						<motion.h1
							className="text-black text-4xl font-mono my-2 md:my-5"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								type: "spring",
							}}>
						 Customize your Door
						</motion.h1>
						<motion.p
							className="title text-md 2xl:text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.4,
								type: "spring",
							}}>
							Hi!This is Abimanya door customize site .you can enjoy to modify & customize to enjoy your oredrs
							Take your alternate customization .
						</motion.p>
					</motion.div>
					<motion.div
						className="hidden md:flex col-span-1 mx-auto justify-center items-center "
						initial={{ x: 100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.7,
							type: "spring",
						}}>
						<div className="rounded-full h-auto w-auto max-w-[26vw] lg:px-12 grayscale hover:grayscale-0 transition-all ease duration-300">
							<Image
								src={Me}
								width={400}
								height={550}
								placeholder="blur"
								alt="Alvalens"
								className="rounded-full w-full h-full object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</Section>

			                                            {/* For about page */}

			<Section>
				<div className="mx-auto w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 p-10 overflow-hidden">
					<motion.div
						className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							type: "spring",
						}}>
						
						<motion.h3
							className="uppercase text-4xl mb-3 font-bold text tracking-[.5rem] text-[#79c154]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								type: "spring",
							}}>
							About page
						</motion.h3>
						<motion.p
							className="title text-md 2xl:text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.4,
								type: "spring",
							}}>
							This is about the abimanya customize section
						</motion.p>
					</motion.div>
					<motion.div
						className="hidden md:flex col-span-1 mx-auto justify-center items-center "
						initial={{ x: 100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.7,
							type: "spring",
						}}>
						<div className="rounded-full h-auto w-auto max-w-[26vw] lg:px-12 grayscale hover:grayscale-0 transition-all ease duration-300">
							<Image
								src={Me}
								width={400}
								height={550}
								placeholder="blur"
								alt="Alvalens"
								className="rounded-full w-full h-full object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</Section>
                                                          {/* For projects page */}

			<Section>
				<div className="mx-auto w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 p-10 overflow-hidden">
					<motion.div
						className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							type: "spring",
						}}>
						
						<motion.h3
							className="uppercase text-4xl mb-3 font-bold text tracking-[.5rem] text-[#79c154]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								type: "spring",
							}}>
							Customize  page
						</motion.h3>
						<motion.p
							className="title text-md 2xl:text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.4,
								type: "spring",
							}}>
							This is about the abimanya customize (project) section
						</motion.p>
					</motion.div>
					<motion.div
						className="hidden md:flex col-span-1 mx-auto justify-center items-center "
						initial={{ x: 100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.7,
							type: "spring",
						}}>
						<div className="rounded-full h-auto w-auto max-w-[26vw] lg:px-12 grayscale hover:grayscale-0 transition-all ease duration-300">
							<Image
								src={Me}
								width={400}
								height={550}
								placeholder="blur"
								alt="Alvalens"
								className="rounded-full w-full h-full object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</Section>
			                                                 {/* For Footer page */}

		    <Section>
				<div className="mx-auto w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 p-10 overflow-hidden">
					<motion.div
						className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							type: "spring",
						}}>
						
						<motion.h3
							className="uppercase text-4xl mb-3 font-bold text tracking-[.5rem] text-[#79c154]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								type: "spring",
							}}>
						     Get In touch
						</motion.h3>
						<motion.p
							className="title text-md 2xl:text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.4,
								type: "spring",
							}}>
							Feel free to contact me
						</motion.p>
						<motion.h2
							className="title text-md 2xl:text-xl mt-4 tracking-wider text-black leading-[1.7rem]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.4,
								type: "spring",
							}}>
							testuser@gmail.com
						</motion.h2>
					</motion.div>
					<motion.div
						className="hidden md:flex col-span-1 mx-auto justify-center items-center "
						initial={{ x: 100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.7,
							type: "spring",
						}}>
						<div className="rounded-full h-auto w-auto max-w-[26vw] lg:px-12 grayscale hover:grayscale-0 transition-all ease duration-300">
							<Image
								src={Me}
								width={400}
								height={550}
								placeholder="blur"
								alt="Alvalens"
								className="rounded-full w-full h-full object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</Section>

			
			<ScrollIndicator />
		</FullPageWrapper>
	);
};

export default MyPage;
