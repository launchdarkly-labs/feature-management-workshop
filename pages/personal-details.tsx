"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import WrapperMain from "@/components/ui/WrapperMain";

import { useSignup } from "@/components/SignUpProvider";

export default function PersonalDetailsPage() {
	const router = useRouter();
	const { userData, updateUserData } = useSignup();
	//TODO: also add livelogs context
	const [formData, setFormData] = useState({
		firstName: userData.firstName || "Jane",
		lastName: userData.lastName || "Wilson",
		dob: userData.dob || "2/28/1978",
		ssn: userData.ssn || "***-**-****",
		phone: userData.phone || "220-415-9634",
		address: userData.address || "390 Fort St",
		apt: userData.apt || "245",
		zip: userData.zip || "94572",
	});

	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.firstName || !formData.lastName || !formData.phone) {
			setError("Please fill in all required fields");
			return;
		}

		updateUserData(formData);
		router.push("/services");
	};

	return (
		<WrapperMain className="flex flex-col items-center justify-center py-4">
			{/* Progress indicator */}
			<div className="mb-10 flex items-center justify-center">
				<div className="flex items-center">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
						1
					</div>
					<div className="w-16 h-1 bg-blue-600"></div>
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
						2
					</div>
					<div className="w-16 h-1 bg-gray-200"></div>
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500">
						3
					</div>
				</div>
			</div>

			{/* Heading */}
			<div className="mb-8 text-center">
				<h1 className="mb-2 text-2xl font-bold text-gray-800">
					Let's set up the rest of your details
				</h1>
				<p className="text-sm text-gray-600">
					You can update this information in your Account Portal
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-4">
				{error && (
					<div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
						{error}
					</div>
				)}

				<div className="grid gap-4 md:grid-cols-2">
					{/* Email */}
					<div className="relative">
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Email
						</label>
						<div className="relative">
							<input
								type="email"
								value={userData.email}
								readOnly
								className="w-full rounded-md border border-gray-300 bg-gray-50 p-3 pr-10 focus:border-blue-500 focus:outline-none"
							/>
							<div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
								<div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
									<Check className="h-3 w-3" />
								</div>
							</div>
						</div>
					</div>

					{/* Password */}
					<div className="relative">
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Password
						</label>
						<div className="relative">
							<input
								type="password"
								value="****************"
								readOnly
								className="w-full rounded-md border border-gray-300 bg-gray-50 p-3 pr-10 focus:border-blue-500 focus:outline-none"
							/>
							<div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
								<div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
									<Check className="h-3 w-3" />
								</div>
							</div>
						</div>
					</div>

					{/* First Name */}
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
						/>
					</div>

					{/* Last Name */}
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
						/>
					</div>

					{/* DOB */}
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							DOB
						</label>
						<input
							type="text"
							name="dob"
							value={formData.dob}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
						/>
					</div>

					{/* SSN */}
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							SSN
						</label>
						<input
							type="text"
							name="ssn"
							value={formData.ssn}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
						/>
					</div>

					{/* Phone */}
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Phone
						</label>
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
						/>
					</div>

					{/* Address */}
					<div className="md:col-span-2">
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Address
						</label>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
						/>
					</div>

					{/* Apt */}
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Apt
						</label>
						<input
							type="text"
							name="apt"
							value={formData.apt}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
						/>
					</div>

					{/* Zip */}
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Zip
						</label>
						<input
							type="text"
							name="zip"
							value={formData.zip}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className="mt-8 flex flex-col items-center">
					<button
						type="submit"
						className="w-full max-w-xs rounded-full bg-blue-500 py-3 text-center font-medium text-white transition-colors hover:bg-blue-600"
					>
						Confirm details
					</button>
					<Link
						href="/signup"
						className="mt-4 text-sm text-gray-500 hover:text-gray-700"
					>
						Back
					</Link>
				</div>
			</form>
		</WrapperMain>
	);
}
