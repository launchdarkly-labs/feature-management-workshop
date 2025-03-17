"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { useSignup } from "@/components/signup-context"
const services = [
  "Home Mortgage",
  "Checking Accounts",
  "Savings Accounts",
  "Auto Loans",
  "Personal Loans",
  "Wire Transfers",
  "Commercial Lending",
  "Insurance",
]

export default function ServicesPage() {
  const router = useRouter()
  const { userData, toggleService } = useSignup()
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (userData.selectedServices.length === 0) {
      setError("Please select at least one service")
      return
    }

    // In a real app, you would submit the data to your backend here
    console.log("Form submitted with data:", userData)

    // Navigate to a success page or dashboard
    router.push("/success")
  }

  const isSelected = (service: string) => {
    return userData.selectedServices.includes(service)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white p-8 shadow-xl">
        {/* Close button */}
        <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        {/* Progress indicator */}
        <div className="mb-10 flex items-center justify-center">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">1</div>
            <div className="w-16 h-1 bg-blue-600"></div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">2</div>
            <div className="w-16 h-1 bg-blue-600"></div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">3</div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">What services can we help you with?</h1>
          <p className="text-sm text-gray-600">Select all that apply</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`flex h-20 items-center justify-center rounded-lg border p-4 text-center transition-colors ${
                  isSelected(service)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                }`}
              >
                {service}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center">
            <button
              type="submit"
              className="w-full max-w-xs rounded-full bg-blue-500 py-3 text-center font-medium text-white transition-colors hover:bg-blue-600"
            >
              Complete Setup
            </button>
            <Link href="/personal-details" className="mt-4 text-sm text-gray-500 hover:text-gray-700">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

